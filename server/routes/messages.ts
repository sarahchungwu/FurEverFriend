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
    res.status(500).json({ message: 'Unable to get the data from database' })
  }
})

//GET messages by id  api/v1/messages/:id
router.get('/:id', validateAccessToken, async (req, res) => {
  const auth0Id = req.auth?.payload.sub
  const messageId = Number(req.params.id)

  if (!auth0Id) {
    res.status(400).json({ message: 'Please provide an id' })
    return
  }

  try {
    const user = await db.getMessageById(messageId, auth0Id)
    res.status(200).json(user)
  } catch (error) {
    logError(error)
    res
      .status(500)
      .json({ message: 'Unable to get the message from the database' })
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
      senderId: auth0Id,
      isRead: false,
      sentAt: new Date().toISOString(),
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

//Delete Message

router.delete('/:id', validateAccessToken, async (req, res) => {
  const auth0Id = req.auth?.payload.sub
  const messageId = Number(req.params.id)

  if (!auth0Id) {
    res.status(400).json({ message: 'Please provide an id' })
    return
  }

  try {
    await db.deleteMessage(messageId, auth0Id)
    res.sendStatus(200)
    return
  } catch (error) {
    logError(error)
    res.status(500).json({ message: 'Unable to delete the data' })
  }
})

//update Massage as is_read to be true
router.patch('/:id', validateAccessToken, async (req, res) => {
  const form = req.body
  const messageId = Number(req.params.id)
  const auth0Id = req.auth?.payload.sub

  if (!auth0Id) {
    res.status(400).json({ message: 'Please provide an auth0_id' })
    return
  }

  if (!form || typeof form.isRead !== 'boolean') {
    res
      .status(400)
      .json({ message: 'Please provide a form with an isRead property' })
    return
  }

  try {
    await db.updateNewMessage(messageId, auth0Id, form.isRead)
    res.sendStatus(201)
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Unable to update message in database' })
  }
})

export default router
