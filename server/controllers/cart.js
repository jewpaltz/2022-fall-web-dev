const express = require('express');
const { get, add, update } = require('../models/cart');

const app = express.Router();


app.get('/:userId', (req, res, next) => {
    get(req.params.userId)
    .then(x=> res.status(200).send(x))
    .catch(next);
});

app.post('/:userId', (req, res, next) => {
    add(req.params.userId, req.body.productId, +req.body.quantity)
    .then(x=> res.status(201).send(x))
    .catch(next);
});

app.patch('/:userId/:productId/:quantity', (req, res, next) => {
    update(req.params.userId, req.params.productId, +req.params.quantity)
    .then(x=> res.status(200).send(x))
    .catch(next);
});

module.exports = app;