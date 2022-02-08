import express, { Request, Response } from 'express'
import { Orders } from '../db/models/order'
import { OrderProducts } from '../db/models/orderProduct'
import { Order, OrderProduct } from '../types/types'
import { verifyAuthToken } from '../security/validate'

// creating object from Orders class of accessdata layer
const myOrders = new Orders()
const myOrderProducts = new OrderProducts()

// to add new order to database
const addOrder = async (req: Request, res: Response) => {
    try {
        const myOrder: Order = {
            user_id: req.body.user_id as unknown as number,
            order_status: req.body.order_status
        }
        const order = await myOrders.addOrder(myOrder)
        res.json(order)
    } catch (error) {
        if ((error as Error).message == `Could not add new order, Error error: insert or update on table "orders" violates foreign key constraint "orders_user_id_fkey"`) {
            res.status(400).json({
                "error": "Invalid user Id"
            })
        }
        else {
            res.status(400).json({
                "error": (error as Error).message
            })
        }
    }
}
// calling addOrderProduct method from model
// to add new orderProduct to database
const addOrderProduct = async (req: Request, res: Response) => {
    try {
        const myOrderProduct: OrderProduct = {
            order_id: req.body.order_id as unknown as number,
            product_id: req.body.product_id as unknown as number,
            product_quantity: req.body.product_quantity as unknown as number
        }
        const orderProduct = await myOrderProducts.addOrderProduct(myOrderProduct)
        res.json(orderProduct)
    }
    catch (error) {
        if ((error as Error).message == `Could not add new orderProduct, Error error: insert or update on table "order_products" violates foreign key constraint "order_products_order_id_fkey"`) {
            res.status(400).json({
                "error": "Invalid order Id"
            })
        }
        else if ((error as Error).message == `Could not add new orderProduct, Error error: insert or update on table "order_products" violates foreign key constraint ""order_products_product_id_fkey"`) {
            res.status(400).json({
                "error": "Invalid product Id"
            })
        } else {
            res.status(400).json({
                "error": (error as Error).message
            })
        }
    }

}

// creating route for orders using an instance of app to be used in server 
export const ordersRoute = (app: express.Application) => {
    app.post('/orders/', verifyAuthToken, addOrder)      // creating route for addOrderProduct method
    app.post('/orders/OrderDetails', verifyAuthToken, addOrderProduct)      // creating route for addOrderProduct method
}
