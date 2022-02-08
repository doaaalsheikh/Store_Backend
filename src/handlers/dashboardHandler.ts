import express, { Request, Response } from 'express'
import { Dashboard } from '../services/dashboard'

const myDashboard = new Dashboard()

// calling currentOrderByUser method from services dashboard
// to view currnet order details by user id
const currentOrderByUser = async (req: Request, res: Response) => {
  try {
    const myCurrentOrderByUser = await myDashboard.getOrdersByUser(req.params.id as unknown as number, 'active')
    res.json(myCurrentOrderByUser[0])
  } catch (error) {
    res.status(400)
    res.json(error)
  }
}

// calling completedOrdersByUser method from services dashboard
// to view completed order details by user id
const completedOrdersByUser = async (req: Request, res: Response) => {
  try {
    const myCompletedOrdersByUser = await myDashboard.getOrdersByUser(req.params.id as unknown as number, 'completed')
    res.json(myCompletedOrdersByUser)
  } catch (error) {
    res.status(400)
    res.json(error)
  }
}

// calling productsByCategory method from services dashboard
// to view products By Category id
const productsByCategory = async (req: Request, res: Response) => {
  try {
    const myProductsByCategory = await myDashboard.productsByCategory(req.params.id as unknown as number)
    res.json(myProductsByCategory)
  } catch (error) {
    res.status(400)
    res.json(error)
  }
}

// creating route for services dashboard using an instance of app to be used in server 
export const dashboardRoutes = (app: express.Application) => {
  app.get('/current-order-by-user/:id', currentOrderByUser)
  app.get('/completed-orders-by-user/:id', completedOrdersByUser)
  app.get('/products-by-category/:id', productsByCategory)
}
