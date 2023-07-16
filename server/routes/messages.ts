import { Router } from 'express'
import { addMessageDraftSchema } from '../../models/messages'
import { validateAccessToken } from '../auth0'
import * as db from '../db/messages'
import { logError } from '../logger'

const router = Router()

//GET All the messages
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

//POST messages api/v1/messages
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
    const userResult = addMessageDraftSchema.safeParse(form)

    if (!userResult.success) {
      res.status(400).json({ message: 'Please provide a valid form' })
      return
    }

    const newMessage = {
      ...userResult.data,
      sender_id: auth0Id,
      is_read: false,
      sent_at: new Date(),
    }

    await db.addNewMessage(newMessage)
    res.sendStatus(201)
  } catch (e) {
    console.error(e)
    res
      .status(500)
      .json({ message: 'Unable to insert new message to database' })
  }
})

export default router
