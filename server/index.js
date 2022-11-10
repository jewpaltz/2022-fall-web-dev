const express = require('express')
const app = express()

const productsController = require('./controllers/products');
const cartController = require('./controllers/cart');

const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();

})

app.use('/', express.static('./client/dist'));

app
.get('/', (req, res) => {
    res.status(200).send('Happy Sweet New Year');
})
.get('/error', (req, res) => {
    sss.PORT();
})
.use('/api/v1/products', productsController)
.use('/api/v1/cart', cartController)

app.get('*', (req, res) => {
    
    res.sendFile('index.html', {root: './client/dist'});
})

app.use((err, req, res, next) => {
    console.log(err);
    res.status( err.httpCode ?? 500).send({
        message: err.message ?? 'Something went wrong',
        status: err.httpCode ?? 500
    });

})

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
