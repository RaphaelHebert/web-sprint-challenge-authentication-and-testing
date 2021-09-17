const Helper = require('./dbHelper')
const db = require('./dbConfig')

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
  })
  
  beforeEach(async () => {
    await db('users').truncate()
  })

describe('Helper functions', () => {
    test('findAll return a list of users', async () => {
        const listOfUser = await Helper.findAll()
        expect(listOfUser).toBeInstanceOf(Array)
    })
})