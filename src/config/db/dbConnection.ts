import { Sequelize } from 'sequelize'
import * as dotenv from 'dotenv'

dotenv.config()

export const sequelize: Sequelize = new Sequelize('drugbankDb', 'root', '123456789', {
  host: 'localhost\\SQLEXPRESS',
  dialect: 'mssql',
  port: 1433, // Puerto por defecto de SQL Server Express
  dialectOptions: {
    options: {
      encrypt: false, // para que no de error de certificado
      trustServerCertificate: true, // Si estás usando un servidor SQL autogenerado
    },
  },
  logging: false, // Para deshabilitar el logging de consultas (opcional)
})

export const startDb = async () => {
  try {
    await sequelize.sync()
    console.log('Base de datos sincronizada')
  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error)
  }
}
