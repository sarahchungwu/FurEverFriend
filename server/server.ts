import express from 'express'
import { join } from 'node:path'

import usersRoutes from './routes/users'
import dogsRoutes from './routes/dogs'
import messagesRoutes from './routes/messages'

const server = express()

server.use(express.json())
server.use(express.static(join(__dirname, 'public')))

server.use('/api/v1/users', usersRoutes)
server.use('/api/v1/dogs', dogsRoutes)
server.use('/api/v1/messages', messagesRoutes)

if (process.env.NODE_ENV === 'production') {
  server.get('*', (_, res) => {
    res.sendFile(join(__dirname, '../dist', 'index.html'))
  })
}

export default server
