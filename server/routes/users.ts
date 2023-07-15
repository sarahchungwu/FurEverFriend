import { Router } from 'express'
import * as db from '../db/users'
import { validateAccessToken } from '../auth0'
import { logError } from '../logger'
import { userDraftSchema, userEditSchema } from '../../models/user'
const router = Router()

// GET /api/v1/users/
router.get('/', validateAccessToken, async (req, res) => {
  const auth0Id = req.auth?.payload.sub

  if (!auth0Id) {
    res.status(400).json({ message: 'Please provide an id' })
    return
  }

  try {
    const user = await db.getUserById(auth0Id)
    res.status(200).json(user)
  } catch (error) {
    logError(error)
    res.status(500).json({ message: 'Unable to insert new user to database' })
  }
})

// POST /api/v1/users
router.post('/', validateAccessToken, async (req, res) => {
  const form = req.body
  const auth0Id = req.auth?.payload.sub

  if (!auth0Id) {
    res.status(400).json({ message: 'Please provide an auth0_id' })
    return
  }

  if (!form) {
    res.status(400).json({ message: 'Please provide a form' })
    return
  }

  try {
    const userResult = userDraftSchema.safeParse(form)

    if (!userResult.success) {
      res.status(400).json({ message: 'Please provide a valid form' })
      return
    }

    //add the user
    const newUser = { ...userResult.data, auth0Id: auth0Id }

    await db.upsertProfile(newUser)
    res.sendStatus(201)
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Unable to insert new user to database' })
  }
})

//update user

router.patch('/', validateAccessToken, async (req, res) => {
  const form = req.body
  const auth0Id = req.auth?.payload.sub

  if (!auth0Id) {
    res.status(400).json({ message: 'Please provide an auth0_id' })
    return
  }

  if (!form) {
    res.status(400).json({ message: 'Please provide a form' })
    return
  }

  try {
    const userResult = userEditSchema.safeParse(form)
    if (!userResult.success) {
      res.status(400).json({ message: 'Please provide a valid form' })
      return
    }

    await db.updateProfile(form, auth0Id)
    res.sendStatus(201)
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Unable to insert new user to database' })
  }
})

export default router
