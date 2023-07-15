import { Router } from 'express'
import * as db from '../db/dogs'
import { validateAccessToken } from '../auth0'
import { logError } from '../logger'
import { dogsDraftSchema } from '../../models/dog'
const router = Router()

// GET /api/v1/dogs/
router.get('/', validateAccessToken, async (req, res) => {
  const auth0Id = req.auth?.payload.sub

  if (!auth0Id) {
    res.status(400).json({ message: 'Please provide an id' })
    return
  }

  try {
    const user = await db.getDogByUser(auth0Id)
    res.status(200).json(user)
  } catch (error) {
    logError(error)
    res.status(500).json({ message: 'Unable to insert new user to database' })
  }
})

// GET /api/v1/dogs/:id
router.get('/:id', validateAccessToken, async (req, res) => {
  const auth0Id = req.auth?.payload.sub
  const dogId = Number(req.params.id)

  if (!auth0Id) {
    res.status(400).json({ message: 'Please provide an id' })
    return
  }

  try {
    const user = await db.getDogById(dogId, auth0Id)
    res.status(200).json(user)
  } catch (error) {
    logError(error)
    res.status(500).json({ message: 'Unable to insert new user to database' })
  }
})

//POST add new dog /api/v1/dogs
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
    const userResult = dogsDraftSchema.safeParse(form)

    if (!userResult.success) {
      res.status(400).json({ message: 'Please provide a valid form' })
      return
    }

    const newDog = { ...userResult.data, userId: auth0Id }

    await db.addNewDog(newDog)
    res.sendStatus(201)
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Unable to insert new user to database' })
  }
})

// PATCH /api/v1/dogs/:id
router.patch('/:id', validateAccessToken, async (req, res) => {
  const form = req.body
  const dogId = Number(req.params.id)
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
    const userResult = dogsDraftSchema.safeParse(form)
    if (!userResult.success) {
      res.status(400).json({ message: 'Please provide a valid form' })
      return
    }

    await db.updateDogProfile(form, dogId)
    res.sendStatus(201)
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Unable to insert new user to database' })
  }
})

export default router
