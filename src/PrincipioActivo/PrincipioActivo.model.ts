import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/db/dbConnection'

interface PrincipioActivoAtributes {
  id: number
  type: string
  name: string
  description: string
  drugbankId: string
  generalReferences: string
  synthesisReferences: string
  indication: string
  pharmacology: string
  mechanismOfAction: string
  toxicity: string
  biotransformation: string
  absorption: string
  halfLife: string
  proteinBinding: string
  routeOfElimination: string
  volumeOfDistribution: string
  clearance: string
  salts: string
  listId: number
}

export class PrincipioActivo extends Model<PrincipioActivoAtributes> {
  public readonly id!: number
  public type!: string
  public name!: string
  public description!: string
  public drugbankId!: string
  public generalReferences!: string
  public synthesisReferences!: string
  public indication!: string
  public pharmacology!: string
  public mechanismOfAction!: string
  public toxicity!: string
  public biotransformation!: string
  public absorption!: string
  public halfLife!: string
  public proteinBinding!: string
  public routeOfElimination!: string
  public volumeOfDistribution!: string
  public clearance!: string
  public salts!: string
  public listId!: number
}

PrincipioActivo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    drugbankId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    generalReferences: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    synthesisReferences: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    indication: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pharmacology: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mechanismOfAction: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    toxicity: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    biotransformation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    absorption: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    halfLife: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    proteinBinding: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    routeOfElimination: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    volumeOfDistribution: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    clearance: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    salts: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    listId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'PrincipioActivo', timestamps: false, tableName: 'PrincipioActivo' }
)
