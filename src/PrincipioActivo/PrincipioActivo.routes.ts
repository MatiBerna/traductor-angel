import { Router } from 'express'
import { translatePrincipioActivo } from './PrincipioActivo.controller'
import { checkSchema } from 'express-validator'

export const PrincipioActivoRouter = Router()

PrincipioActivoRouter.post(
  '/',
  checkSchema({
    // type: {
    //   trim: true,
    //   isBoolean: { errorMessage: 'type must be a boolean' },
    //   optional: true,
    // },
    // name: {
    //   trim: true,
    //   isBoolean: { errorMessage: 'name must be a boolean' },
    //   optional: true,
    // },
    // description: {
    //   trim: true,
    //   isBoolean: { errorMessage: 'description must be a boolean' },
    //   optional: true,
    // },
    // generalReferences: { trim: true, isBoolean: { errorMessage: 'generalReferences must be a boolean' }, optional: true },
    // synthesisReferences: { trim: true, isBoolean: { errorMessage: 'synthesisReferences must be a boolean' }, optional: true },
    indication: {
      trim: true,
      isBoolean: { errorMessage: 'indication must be a boolean' },
      notEmpty: { errorMessage: 'indication is required' },
    },
    // pharmacology: { trim: true, isBoolean: { errorMessage: 'pharmacology must be a boolean' }, optional: true },
    // mechanismOfAction: { trim: true, isBoolean: { errorMessage: 'mechanismOfaction must be a boolean' }, optional: true },
    // toxicity: { trim: true, isBoolean: { errorMessage: 'toxicity must be a boolean' }, optional: true },
    // biotransformation: { trim: true, isBoolean: { errorMessage: 'biotransformation must be a boolean' }, optional: true },
    // absorption: { trim: true, isBoolean: { errorMessage: 'absorption must be a boolean' }, optional: true },
    // halfLife: { trim: true, isBoolean: { errorMessage: 'halfLife must be a boolean' }, optional: true },
    // proteinBinding: { trim: true, isBoolean: { errorMessage: 'proteinBinding must be a boolean' }, optional: true },
    // routeOfElimination: { trim: true, isBoolean: { errorMessage: 'routeOfElimination must be a boolean' }, optional: true },
    // volumeOfDistribution: { trim: true, isBoolean: { errorMessage: 'volumeOfDistribution must be a boolean' }, optional: true },
    // clearance: { trim: true, isBoolean: { errorMessage: 'clearance must be a boolean' }, optional: true },
    // salts: { trim: true, isBoolean: { errorMessage: 'salts must be a boolean' }, optional: true },
  }),
  translatePrincipioActivo
)
