import express, { Request, Response } from 'express'
import { Categories } from '../db/models/category'
import { Category } from '../types/types'
import { verifyAuthToken } from '../security/validate'

const myCategory = new Categories()

// calling create method from model
const addCategory = async (req: Request, res: Response) => {
    const newCategory: Category = {
        category_name: req.body.category_name
    }
    try {
        const category = await myCategory.addCategory(newCategory)
        res.json(category)
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

// creating route for categories using an instance of app to be used in server 
export const categoriesRoute = (app: express.Application) => {
    app.post('/categories/', verifyAuthToken, addCategory)    // creatnig route for create method
}
