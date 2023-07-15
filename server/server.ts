import express from 'express'
import { join } from 'node:path'

import usersRoutes from './routes/users'

const server = express()

server.use(express.json())
server.use(express.static(join(__dirname, 'public')))

server.use('/api/v1/users', usersRoutes)

if (process.env.NODE_ENV === 'production') {
  server.get('*', (_, res) => {
    res.sendFile(join(__dirname, '../dist', 'index.html'))
  })
}

export default server
