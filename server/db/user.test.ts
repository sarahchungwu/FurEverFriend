import { describe, it, expect, beforeAll, beforeEach } from 'vitest'
import db from './connection'
import { getUserById } from './users'

beforeAll(async () => {
  await db.migrate.latest()
})

beforeEach(async () => {
  await db.seed.run()
})

describe('getUserById', () => {
  it('should return user details', async () => {
    const userData = await getUserById('google-oauth2|110655168501149628622')
    expect(userData).toHaveProperty('auth0_id')
    expect(userData).toHaveProperty('username')
    expect(userData).toHaveProperty('email')
    expect(userData).toHaveProperty('pronouns')
    expect(userData).toHaveProperty('bio')
  })
})
