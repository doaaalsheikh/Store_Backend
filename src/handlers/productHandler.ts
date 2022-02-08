import express, { Request, Response } from 'express'
import { Products } from '../db/models/product'
import { Product } from '../types/types'
import { verifyAuthToken } from '../security/validate'

// creating object from Products class of accessdata layer
const myProducts = new Products()

// calling index method from model
// to view all products
const selectAllProducts = async (_req: Request, res: Response) => {
    const products = await myProducts.selectAllProducts()
    res.json(products)
}

// calling show method from model 
// to veiw specified product by id
const selectProductByID = async (req: Request, res: Response) => {
    const product = await myProducts.selectProductByID(req.params.id as unknown as number)
    res.json(product)
}

// calling create method from model
// to add new product to database
const addProduct = async (req: Request, res: Response) => {
    try {
        const myProduct: Product = {
            product_name: req.body.product_name as string,
            product_price: req.body.product_price as unknown as number,
            category_id: req.body.category_id as unknown as number
        }
        const product = await myProducts.addProduct(myProduct)
        res.json(product)
    } catch (error) {
        if ((error as Error).message == `Could not add product "${req.body.product_name}", Error error: insert or update on table "products" violates foreign key constraint "products_category_id_fkey"`) {
            res.status(400).json({
                "error": "Invalid category Id"
            })
        }
        else {
            res.status(400).json({
                "error": (error as Error).message
            })
        }

    }

}

// creating route for products using an instance of app to be used in server 
export const productsRoute = (app: express.Application) => {
    app.get('/products', selectAllProducts)                     // creating route for index
    app.get('/products/:id', selectProductByID)                  // creating route for show
    app.post('/products', verifyAuthToken, addProduct)  // creatnig route for create using token verification
}
