const express = require('express');
const products = require('../models/products');

const app = express.Router();

app
    .get('/', (req, res, next) => {
        products.getProducts()
        .then(x=> res.status(200).send(x))
        .catch(next);
    })
    .get('/brands', (req, res, next) => {
        products.getBrands()
        .then(x=> res.status(200).send(x))
        .catch(next);
    })
    .get('/categories', (req, res, next) => {
        products.getCategories()
        .then(x=> res.status(200).send(x))
        .catch(next);
    })
    .get('/:id', (req, res, next) => {

        products.getProduct(req.params.id)
        .then(product=> {
            if (product) {
                res.status(200).send(product);
            } else {
                res.status(404).send('Product not found');
            }            
        })
        .catch(next);
        
    })
    .post('/', (req, res, next) => {
        products.addProduct(req.body)
        .then(x=> res.status(200).send(x))
        .catch(next);
    })
    .patch('/:id', (req, res, next) => {
        products.updateProduct(req.params.id, req.body)
        .then(x=> res.status(200).send(x))
        .catch(next);
    })
    .delete('/:id', (req, res, next) => {
        products.deleteProduct(req.params.id)
        .then(x=> res.status(200).send(x))
        .catch(next);
    })
    .post('/seed', (req, res, next) => {
        products.seed()
        .then(x=> res.status(200).send(x))
        .catch(next);
    })
;


module.exports = app;