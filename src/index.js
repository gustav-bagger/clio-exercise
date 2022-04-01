const express = require('express')
const router = require('./router.js')
const mongoose = require('mongoose')

const createRoot = require('./utils/createRoot')

const PORT = 3000

async function startServer() {
    const app = express()

    //this will parse the body of requests
    app.use(express.json())

    await mongoose.connect('mongodb://127.0.0.1:27017/clio-exercise-db')
    await createRoot()
    
    app.use(router)


    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
}

startServer()