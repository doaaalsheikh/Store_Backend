import express, { Application, Request, Response } from 'express'
import dotenv from 'dotenv'
import { ordersRoute } from './handlers/orderHandler'
import { productsRoute } from './handlers/productHandler'
import { usersRoute } from './handlers/userHandler'
import { dashboardRoutes } from './handlers/dashboardHandler'
import { categoriesRoute } from './handlers/categoryHandler'

dotenv.config()

const PORT = process.env.PORT
// create an instance server
const app: Application = express()

app.use(express.json())

// add routing for / path
app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'Hello World'
  })
})

// calling handler for routes
ordersRoute(app)
productsRoute(app)
usersRoute(app)
dashboardRoutes(app)
categoriesRoute(app)

// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at prot:${PORT}`)
})

export default app
