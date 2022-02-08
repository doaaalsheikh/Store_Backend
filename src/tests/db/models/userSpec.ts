import { Users } from '../../../db/models/user'
import { User } from '../../../types/types'

const myUsers = new Users()

describe('User Model', () => {
  const user: User = {
    first_name: 'fname1',
    last_name: 'lname1',
    username: 'firstUser',
    password: 'firstpassword'
  }
  describe('Methods of User model should be defined', () => {
    //test for selectAllUsers method existence
    it('Should have selectAllUsers method', () => {
      expect(myUsers.selectAllUsers).toBeDefined()
    })
    //test for addUser method existence
    it('should have addUser method', () => {
      expect(myUsers.addUser).toBeDefined()
    })
    //test for selectUserByID method existence
    it('should have selectUserByID method', () => {
      expect(myUsers.selectUserByID).toBeDefined()
    })
  })
  describe('Test methods performance', () => {
    //test for selectAllUsers method performance
    it('selectAllUsers method should return a list of users', async () => {
      const result = await myUsers.selectAllUsers()
      expect(result).toEqual([])
    })

    //test for addUser method performance
    it('addUser method should add a new user', async () => {
      const result = await myUsers.addUser(user)
      user.id = result.id
      user.password = result.password
      expect(result).toEqual(user)
      await myUsers.deleteUser(user.id as unknown as number)
    })

    //test for selectUserByID method performance
    it('selectUserByID method should return the correct user', async () => {
      const tempUser = await myUsers.addUser(user)
      user.id = tempUser.id
      user.password = tempUser.password
      const result = await myUsers.selectUserByID(user.id as unknown as number)
      expect(result).toEqual(user)
      await myUsers.deleteUser(user.id as unknown as number)
    })
  })
})
