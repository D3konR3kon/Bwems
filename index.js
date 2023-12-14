const express = require('express')
const routes = require('./app/routes/emp.routes')
const app = express()
const PORT = 3001
const db = require('./app/config/db')
const cors = require('cors')

app.use(cors())
app.use(express.json())


app.use('/api', routes)

app.listen(PORT,()=>{
    console.log('Server is running @ Port:', PORT)
})



