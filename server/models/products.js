const data = require('../data/products.json');
const { connect } = require('./mongo');
const { ObjectId } = require('mongodb');

const COLLECTION_NAME = 'products';

async function collection(){
    const client = await connect();
    return client.db('chopiphy').collection(COLLECTION_NAME);
}

async function getProducts() {
    const db = await collection();
    const data = await db.find().toArray()
    return { total: data.length, limit: data.length, products: data };
}

async function getProduct(id) {
    const db = await collection();
    const data = await db.findOne({ _id: new ObjectId(id) })
    return data;
}


async function seed(){
    const db = await collection();
    db.insertMany(data.products);
    return 'success';
}

module.exports = {
    COLLECTION_NAME,
    collection,
    getProducts,
    getProduct,
    seed,
};