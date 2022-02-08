import supertest from 'supertest'
import jwt from 'jsonwebtoken'
import app from '../server'
import { verifyAuthToken } from '../security/validate'

// create a request object
const request = supertest(app)

describe('Test Main endpoint response', () => {
    it('test hello world endpoint', async () => {
        const response = await request.get('/')
        expect(response.status).toBe(200)
    })
})