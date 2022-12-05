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

async function getBrands() {
    const db = await collection();
    const data = await db.distinct('brand')
    return data;
}

async function getCategories() {
    const db = await collection();
    const data = await db.distinct('category')
    return data;
}

async function getProduct(id) {
    const db = await collection();
    const data = await db.findOne({ _id: new ObjectId(id) })
    return data;
}


async function addProduct(product){
    const db = await collection();
    const result = await db.insertOne(product)
    return product;
}

async function updateProduct(id, product){
    const db = await collection();
    delete product._id; // You can not change the _id. So it can not be part of the changes that you send to the database.
    const result = await db.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: product },
        { returnDocument: 'after' })
    return result.value;
}

async function deleteProduct(id){
    const db = await collection();
    const result = await db.deleteOne({ _id: new ObjectId(id) })
    return result;
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
    getBrands,
    getCategories,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct,
    seed,
};