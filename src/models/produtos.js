const mongoose = require('mongoose');

const produtoSchema = mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
   name: String,
   price: Number
});

module.exports = mongoose.model('Produto', produtoSchema);