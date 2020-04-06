const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const uri = 'mongodb+srv://Aluno:SxR9PzDD9eDHfsFN@cluster0-x9how.mongodb.net/test?retryWrites=true&w=majority';

const produtoRoutes = require('./src/routes/produtos');

mongoose.connect(
   uri,
   {
      useNewUrlParser: true,
      useUnifiedTopology: true
   });

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use((req, res, next) => {
   res.header("Access-Controll-Allow-Origin", "*");
   res.header(
      "Access-Controll-Allow-Headers",
      "Origin, X-Requested-With, Cotent-Type, Accept, Authorization"
   )
   if (req.method == "OPTIONS") {
      req.header("Access-Controll-Allow-Methods", "PUT, POST, PATH, GET, DELETE")
      return res.status(200).json({});
   }
   next();
})

app.use('/produtos', produtoRoutes)

app.use((req, res, next) => {
   const error = new Error('Not found');
   error.status = 404;

   next(error);
});

app.use((error, req, res, next) => {
   res.status(error.status || 500);
   res.json({
      error: {
         message: error.message
      }
   })
});


module.exports = app;