// Write your tests here
const request = require('supertest')
const server = require('./server')
const db = require('../data/dbConfig')
const Model = require('./auth/auth-model')
const Helper = require('../data/dbHelper')
const dbConfig = require('../data/dbConfig')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})

// beforeEach(async () => {
//   await db('users').truncate()
// })

test('sanity', () => {
  expect(true).toBeTruthy()
})

describe("/api/auth", () => {
  describe('/register', () => {
    let newUser = {
        username: 'fasdfsdfsdf',
        password: '1234'
      }
    test('registering a new user returns a user', async () => {
      const res = await request(server).post('/api/auth/register').send(newUser)
      console.log(res.body)
      expect(res.body.username).toEqual('fasdfsdfsdf')
    })
  })
})
