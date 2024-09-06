import express from 'express'
import cors from 'cors'
import { PrincipioActivoRouter } from './PrincipioActivo/PrincipioActivo.routes'
import { startDb } from './config/db/dbConnection'

const app = express()
const PORT = 3000

app.use(express.json())
app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  })
)

app.get('/', (req, res) => {
  return res.send('Hello World!')
})

app.use('/api/PrincipioActivo', PrincipioActivoRouter)

app.use((_, res) => {
  return res.status(404).send({ mesage: 'Resourse not found' })
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
  startDb()
})
