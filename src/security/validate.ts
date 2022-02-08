import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../types/types'

// method to verify token 
export const verifyAuthToken = (req: Request, res: Response, next: () => void) => {
  try {
    const authorizationHeader = req.headers.authorization as string
    const token = authorizationHeader.split(' ')[1]
    jwt.verify(token, process.env.TOKEN_SECRET as string)
    next()
  } catch (error) {
    res.status(401)
    res.json('Access denied, invalid token')
  }
}

//method to sign new token for user
export const tokenSign = (user: User): string => {
  const token = jwt.sign({ myUser: user }, process.env.TOKEN_SECRET as string)
  return token
}

