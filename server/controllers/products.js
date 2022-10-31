const express = require('express');
const products = require('../models/products');

const app = express.Router();

app
    .get('/', (req, res) => {
        res.status(200).send(products.getProducts());
    })
    .get('/:id', (req, res) => {

        const product = products.getProduct(+req.params.id);
        if (product) {
            res.status(200).send(product);
        } else {
            res.status(404).send('Product not found');
        }
    });


module.exports = app;