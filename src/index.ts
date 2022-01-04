import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.listen(process.env.APP_PORT, () => console.log(`Listening on port ${process.env.APP_PORT}`))
