import { Router } from 'express'
import { validateAccessToken } from '../auth0'
import * as db from '../db/messages'
import { logError } from '../logger'

const router = Router()

router.get('/', validateAccessToken, async (req, res) => {
  const auth0Id = req.auth?.payload.sub

  if (!auth0Id) {
    res.status(400).json({ message: 'Please provide an id' })
    return
  }

  try {
    const user = await db.getAllMessages(auth0Id)
    res.status(200).json(user)
  } catch (error) {
    logError(error)
    res.status(500).json({ message: 'Unable to ge the data from database' })
  }
})

export default router
