import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/db/dbConnection'

export interface TranslationAttributes {
  id?: number
  PrincipioActivoId: number
  language?: string
  indication?: string
  observations?: string
}

export class Translation extends Model<TranslationAttributes> {
  public id!: number
  public PrincipioActivoId!: number
  public language!: string
  public indication!: string
  public observations!: string
}

Translation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    PrincipioActivoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    language: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    indication: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    observations: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { sequelize, modelName: 'Translation', timestamps: false, tableName: 'Translations' }
)
