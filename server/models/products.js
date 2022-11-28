const data = require('../data/products.json');
const { connect } = require('./mongo');

async function collection(){
    const client = await connect();
    return client.db('chopiphy').collection('products');
}

async function getProducts() {
    const db = await collection();
    const data = await db.find().toArray()
    return data;
}

async function getProduct(id) {
    const db = await collection();
    const data = await db.findOne({ _id: id })
    return data;
}

module.exports = {
    collection,
    getProducts,
    getProduct
};