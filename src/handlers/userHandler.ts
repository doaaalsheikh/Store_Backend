import express, { Request, Response } from 'express'
import { Users } from '../db/models/user'
import { User } from '../types/types'
import { verifyAuthToken, tokenSign } from '../security/validate'

const myUsers = new Users()

// calling index method from model
export const selectAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await myUsers.selectAllUsers()
        res.json(users)
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

// calling show method from model
export const selectUserByID = async (req: Request, res: Response) => {
    try {
        const user = await myUsers.selectUserByID(req.params.id as unknown as number)
        res.json(user)
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

// calling create method from model
export const addUser = async (req: Request, res: Response) => {
    const user: User = {
        username: req.body.username,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: req.body.password
    }
    try {
        const newUser = await myUsers.addUser(user)
        // Signing a token for the user creted recently
        const token = tokenSign(newUser)
        res.json(token)

        //return token
    } catch (error) {
        res.status(400)
        res.json(error)
    }

}
export const login = async (req: Request, res: Response) => {
    try {
        const auth = myUsers.authenticate(req.body.username, req.body.password)
        if (auth != undefined) {
            res.status(200)
            res.json({
                username: req.body.username,
                login: 'succeeded'
            })
        }
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}
// creating index route by passing index method to an instance of app
export const usersRoute = (app: express.Application) => {
    app.get('/users/', verifyAuthToken, selectAllUsers)      // creatnig route for index method using token verification
    app.get('/users/:id', verifyAuthToken, selectUserByID)    // creatnig route for show method using token verification
    app.post('/users/', verifyAuthToken, addUser)    // creatnig route for create method using token verification
    app.post('/users/first-user', addUser)           // creatnig route for create a user without tokenVerification
}
