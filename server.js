const express = require('express')
const cors = require('cors');
const dotenv = require('dotenv');
const portfolioRoutes =require("./routes/portfolioRoute");
const path  = require('path');
dotenv.config()

//rest object
const app = express()

//middleware
app.use(cors())
app.use(express.json())

//static 

app.use(express.static(path.join(__dirname,'./client/build')))
//routes
app.use('/api/v1/portfolio',portfolioRoutes);
app.get('*',function(req,res){
    res.sendFile(path.join(__dirname,'./client/build/index.html'))
})

//port

const PORT = process.env.PORT ||8080
app.listen(PORT,()=>{
    console.log(`Server is Running on PORT ${PORT}`)
})
