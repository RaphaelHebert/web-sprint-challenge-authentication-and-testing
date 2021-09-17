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

beforeEach(async () => {
  await db('users').truncate()
})

test('sanity', () => {
  expect(true).toBeTruthy()
})

describe("/api/auth", () => {
  let newUser = {
    username: 'ffsdf',
    password: '1234'
  }
  describe('/register', () => {
    
    test('new User is registered in the db', async () => {
      const res = await request(server).post('/api/auth/register').send(newUser)
      const user = await db('users').where({id: 1}).first()
      expect(user.username).toEqual('ffsdf')
    }),
    test('new User have properties username, id, password', async () => {
      const res = await request(server).post('/api/auth/register').send(newUser)
      const user = await db('users').where({id: 1}).first()
      expect(user).toHaveProperty('username')
      expect(user).toHaveProperty('id')
      expect(user).toHaveProperty('password')
    })
  }),
  describe('/login', () => {
    test('login with correct username and password returns a token', async () => {
      await request(server).post('/api/auth/register').send(newUser)
      const loggedIn = await request(server).post('/api/auth/login').send(newUser)
      expect(loggedIn.body).toHaveProperty('token')
    }),
    test('login with incorrect username', async () => {
      await request(server).post('/api/auth/register').send(newUser)
      const loggedIn = await request(server).post('/api/auth/login').send({username: 'anotherIntruder', password:1234})
      expect(loggedIn.body).toEqual({"message": "invalid credentials"})
    }),
    test('login with incorrect password', async () => {
      await request(server).post('/api/auth/register').send(newUser)
      const loggedIn = await request(server).post('/api/auth/login').send({username: 'ffsdf', password:'dfsdfsadf'})
      expect(loggedIn.body).toEqual({"message": "invalid credentials"})
    })
  })
})

describe("/api/jokes", () => {
  let newUser = {
    username: 'ffsdf',
    password: '1234'
  }
  let jokes = [
    {
      "id": "0189hNRf2g",
      "joke": "I'm tired of following my dreams. I'm just going to ask them where they are going and meet up with them later."
    },
    {
      "id": "08EQZ8EQukb",
      "joke": "Did you hear about the guy whose whole left side was cut off? He's all right now."
    },
    {
      "id": "08xHQCdx5Ed",
      "joke": "Why didn’t the skeleton cross the road? Because he had no guts."
    },
  ]
  test('logged in user can receive the jokes', async () => {
    await request(server).post('/api/auth/register').send(newUser)
    const loggedIn = await request(server).post('/api/auth/login').send(newUser)
    const joke = await request(server).get('/api/jokes').set('Authorization', loggedIn.body.token)
    expect(jokes).toContain(joke)
  })
})
