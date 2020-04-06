const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Produto = require('../models/produtos');


//Read all collection
router.get('/', (req, res, next) => {
   const id = req.params.produtoId;
   Produto.find()
      .exec()
      .then(doc => {
         res.status(200).json(doc);
      })
      .catch(err => {
         res.status(500).json({
            error: err
         });
      });
});

//Create
router.post('/', (req, res, next) => {
   const produto = new Produto({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      price: req.body.price
   });
   produto.save()
      .then(result => {
         res.status(201).json({
            message: 'Product has been created!',
            produtoCriado: produto
         })
      })
      .catch(err => {
         res.status(500).json({
            error: err
         })
      });
});

//Read
router.get('/:produtoId', (req, res, next) => {
   const id = req.params.produtoId;
   Produto.findById(id)
      .exec()
      .then(doc => {
         res.status(200).json(doc);
      })
      .catch(err => {
         res.status(500).json({
            error: err
         });
      });
});

//Update
router.put('/:atualizaProdutoId', (req, res, next) => {
   const id = req.params.produtoId;
   Produto.updateOne(id, {
      $set: {
         name: req.body.name,
         price: req.body.price
      }
   })
      .then(result => {
         res.status(201).json({
            message: "Product has been updated!"
         });
      })
      .catch(err => {
         res.status(500).json({
            error: err
         });
      });
});

//Delete
router.delete('/:deleteProdutoId', (req, res, next) => {
   const id = req.params.produtoId;
   Produto.deleteOne(id)
      .exec()
      .then(result => {
         console.log(result);
         res.status(200).json({
            message: 'Product has been deleted!'
         })
      })
      .catch(err => {
         res.status(500).json({
            error: err
         });
      });
});

module.exports = router;