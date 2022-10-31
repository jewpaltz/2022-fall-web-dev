const express = require('express')
const app = express()

const productsController = require('./controllers/products');

const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

app
.get('/', (req, res) => {
    res.status(200).send('Happy Sweet New Year');
})
.use('/api/v1/products', productsController)



app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
