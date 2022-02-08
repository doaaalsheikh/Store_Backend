import supertest from 'supertest'
import app from '../../server'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { Users } from '../../db/models/user'
import { User } from '../../types/types'

// create a request object
const request = supertest(app)

describe('Test Users Endpoints', () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJteVVzZXIiOnsiaWQiOjExLCJmaXJzdF9uYW1lIjoiZm5hbWUxIiwibGFzdF9uYW1lIjoibG5hbWUxIiwidXNlcm5hbWUiOiJmaXJzdFVzZXIiLCJwYXNzd29yZCI6IiQyYiQxMCRWOTQ4Q2NTejY4UUI2NDRnWjdOdUJlSHowOTVORnFvLjhPNktrbmdrcXVYQW5EZnB2cWhNUyJ9LCJpYXQiOjE2NDE2MDQ4NzN9.RLureeERQFQ_O1TEPIhifAQSXoVrrjBCUT69slZqgHA'
    const myUsers = new Users
    const myUser: User = {
        first_name: 'fname1',
        last_name: 'lname1',
        username: 'firstUser',
        password: 'firstpassword'
    }
    afterAll(async () => {
        // delete created raws after all test of user ends
        await myUsers.deleteUser(myUser.id as unknown as number)
    })
    it('should add new user', async () => {
        const response = await request.post('/users/').send(myUser).set('Authorization', 'Bearer ' + token);
        const userData = jwt.verify(response.body, process.env.TOKEN_SECRET as string) as JwtPayload // get decoded data from response (token)
        myUser.id = (userData.myUser as unknown as User).id
        expect(response.status).toBe(200)
    })

    it('should get list of users', async () => {
        const response = await request.get('/users/').send(myUser).set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200)
    })

    it(`should get details of user with specific id `, async () => {
        const response = await request.get(`/users/${myUser.id}`).send(myUser).set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200)
    })


})
