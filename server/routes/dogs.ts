import { Router } from 'express'
import * as db from '../db/dogs'
import { validateAccessToken } from '../auth0'
import { logError } from '../logger'
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

export default router
