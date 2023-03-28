const express = require('express')
const cors = require('cors')
require('dotenv').config()
require("./auth/passport")

const app = express()

var corOptions = {
    origin: '*'
}

app.use(cors(corOptions))

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

const archiveRoute = require('./routes/archiveRoute')
const companyRoute = require('./routes/companyRoute')
const contractRoute = require('./routes/contractRoute')
const employeeRoute = require('./routes/employeeRoute')
const userRoute = require('./routes/userRoute')

app.use('/archive',(archiveRoute))
app.use('/company',(companyRoute))
app.use('/contract',(contractRoute))
app.use('/employee',(employeeRoute))
app.use('/user',(userRoute))

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})