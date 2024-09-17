import { Request, Response } from 'express'
import { PrincipioActivo } from './PrincipioActivo.model'
import { translate } from 'bing-translate-api'
import { Result, validationResult } from 'express-validator'
import { Translation, TranslationAttributes } from '../Translation/Translation.model'
import { DatabaseError } from 'sequelize'
import { splitLongString } from '../Helpers/splitLongString'

export async function translatePrincipioActivo(req: Request, res: Response) {
  const result: Result = validationResult(req)
  const errors = result.array()

  if (!result.isEmpty()) {
    return res.status(400).json({ errors: errors })
  }

  let offset = 0
  let limit = 10

  //#region querys request

  const {
    type,
    name,
    description,
    generalReferences,
    synthesisReferences,
    indication,
    pharmacology,
    mechanismOfAction,
    toxicity,
    biotransformation,
    absorption,
    halfLife,
    proteinBinding,
    routeOfElimination,
    volumeOfDistribution,
    clearance,
    salts,
  } = req.query

  //array de atributos requeridos
  const attributes = ['id']

  // if (type) {
  //   attributes.push('type')
  // }

  // if (name) {
  //   attributes.push('name')
  // }

  // if (description) {
  //   attributes.push('description')
  // }

  // if (generalReferences) {
  //   attributes.push('generalReferences')
  // }

  // if (synthesisReferences) {
  //   attributes.push('synthesisReferences')
  // }

  if (indication) {
    attributes.push('indication')
  }

  // if (pharmacology) {
  //   attributes.push('pharmacology')
  // }

  if (mechanismOfAction) {
    attributes.push('mechanismOfAction')
  }

  // if (toxicity) {
  //   attributes.push('toxicity')
  // }

  if (biotransformation) {
    attributes.push('biotransformation')
  }

  // if (absorption) {
  //   attributes.push('absorption')
  // }

  if (halfLife) {
    attributes.push('halfLife')
  }

  // if (proteinBinding) {
  //   attributes.push('proteinBinding')
  // }

  if (routeOfElimination) {
    attributes.push('routeOfElimination')
  }

  // if (volumeOfDistribution) {
  //   attributes.push('volumeOfDistribution')
  // }

  // if (clearance) {
  //   attributes.push('clearance')
  // }

  // if (salts) {
  //   attributes.push('salts')
  // }

  //#endregion

  let firstTranslations: TranslationAttributes[] = []
  let PrincipioActivos: PrincipioActivo[]
  let Translations: TranslationAttributes[]

  try {
    do {
      PrincipioActivos = []
      Translations = []
      //obtengo los principios activos
      if (attributes.length > 1) {
        PrincipioActivos = await PrincipioActivo.findAll({ attributes, limit, offset })
      } else {
        return res.status(400).send({ message: 'No attributes provided' })
      }
      console.log('Partición: ', offset)
      //aca comienza lo jodido, traducir los atributos, por separado

      //Este es un for que recorre los atributos del array de atributos
      for (const atribute of attributes) {
        // SALTEAR EL CAMPO ID
        if (atribute !== 'id') {
          //obtengo los valores del atributo correspondiente al array, del array de principios activos con una función map super inentedible
          const attributeValues = PrincipioActivos.map((principioActivo) => {
            const attributeValue = principioActivo[atribute as keyof typeof principioActivo]
            return attributeValue
          }) as string[]

          //aca se traducen los valores del atributo, Promise all es una función que ejecuta todas las promesas al mismo tiempo
          const translatedAttributeValues = await Promise.all(
            //aca se recorre el array de valores del atributo y se traducen
            attributeValues.map(async (value) => {
              try {
                //console.log('Tamaño: ', value.length)
                if (value.length > 1000) {
                  const splitValues = splitLongString(value, 1000)
                  const translatedParts = await Promise.all(
                    splitValues.map(async (part) => {
                      const result = await translate(part, 'en', 'es')
                      return result?.translation
                    })
                  )
                  return translatedParts.join(' ')
                } else {
                  const result = await translate(value, 'en', 'es')
                  return result?.translation
                }
              } catch (error) {
                console.log(error)
                throw new Error('Error translating attribute values')
              }
            })
          )

          //aca se setean los valores traducidos a un arreglo de traducciones de principios activos
          //TODO: esto esta bien pero si se necesitan varias traducciones se deberá acomodar para que no cree traducciones duplicadas

          translatedAttributeValues.forEach(async (translatedValue, index) => {
            //reviso que no este duplicado
            const duplicatedTranslation = await Translation.findOne({
              where: {
                PrincipioActivoId: PrincipioActivos[index].id,
                language: 'es',
                observations: 'Translated from Bing API',
              },
            })

            if (duplicatedTranslation) {
              //si esta duplicado lo actualizo
              await duplicatedTranslation.update({ [atribute as keyof TranslationAttributes]: translatedValue || '' })
            } else {
              //si no esta duplicado lo creo
              const translation: any = {
                PrincipioActivoId: PrincipioActivos[index].id,
                language: 'es',
                observations: 'Translated from Bing API',
              }
              translation[atribute as keyof TranslationAttributes] = translatedValue || ''
              await Translation.create(translation)
            }
            //Translations.push(translation as TranslationAttributes)
          })

          //aca se guardan las traducciones en la base de datos
          //await Translation.bulkCreate(Translations, { validate: true })
        }
      }
      offset += limit
    } while (PrincipioActivos.length === limit)
  } catch (error) {
    console.error('Error al guardar las traducciones:', error)
    console.error('Detalles del error:', (error as DatabaseError).parent?.message || (error as Error).message)
    return res.status(500).send({ message: error })
  }

  return res.send(firstTranslations)
}
