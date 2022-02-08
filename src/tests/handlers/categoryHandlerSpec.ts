import supertest from 'supertest'
import app from '../../server'
import express from 'express'
import { Category } from '../../types/types'
import { Categories } from '../../db/models/category'

// create a request object
const request = supertest(app)

describe('Test Categories Endpoints', () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJteVVzZXIiOnsiaWQiOjExLCJmaXJzdF9uYW1lIjoiZm5hbWUxIiwibGFzdF9uYW1lIjoibG5hbWUxIiwidXNlcm5hbWUiOiJmaXJzdFVzZXIiLCJwYXNzd29yZCI6IiQyYiQxMCRWOTQ4Q2NTejY4UUI2NDRnWjdOdUJlSHowOTVORnFvLjhPNktrbmdrcXVYQW5EZnB2cWhNUyJ9LCJpYXQiOjE2NDE2MDQ4NzN9.RLureeERQFQ_O1TEPIhifAQSXoVrrjBCUT69slZqgHA'
    const myCategories = new Categories
    const myCategory: Category = {
        category_name: 'category1'
    }
    afterAll(async () => {
        // delete created raws after all test of category ends
        await myCategories.deleteCategory(myCategory.id as unknown as number)
    })
    it('should add new category', async () => {
        const response = await request.post('/categories').send(myCategory).set('Authorization', 'Bearer ' + token);
        myCategory.id = response.body.id
        expect(response.status).toBe(200)
    })
})
