const express = require('express')
const app = express()
const dbConnect = require('./dbConnect')
const userRoute = require('./routes/user')
const transactionRoute = require('./routes/transaction')
const dotenv = require('dotenv').config();
const path = require('path');
const cors  = require("cors")

const port = process.env.PORT || 8000;

app.use(express.json())
app.use(cors())
app.use('/users',userRoute)
app.use('/transactions',transactionRoute)

if (process.env.NODE_ENV !== 'production') {
    app.use('/', express.static('client/build'));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client/build/index.html'));
    });
  }

app.listen(port,() => {
    console.log(`server running on port ${port}`);
})