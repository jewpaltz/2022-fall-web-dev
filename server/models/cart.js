const { getProduct } = require('./products');
// CartItem: { id: 1, quantity: 2, productId: 1, userId: 'mp@np.edu' }
const list = [];

const { connect } = require('./mongo');

const COLLECTION_NAME = 'cart';

async function collection(){
    const client = await connect();
    return client.db('chopiphy').collection(COLLECTION_NAME);
}

const get = async (userId) => {
    const db = await collection();
    const data = await db.find({ userId }).toArray();
    return await Promise.all( data
        .map(async (cartItem) => ({
            ...cartItem, 
            product: await getProduct(cartItem.productId)
        })));
};

/**
 * 
 * @param {string} userId 
 * @param {string} productId 
 * @param {number} quantity 
 * @returns 
 */
const add = async (userId, productId, quantity) => {
    const db = await collection();
    let cartItem = await db.findOne({ userId, productId})
    //let cartItem = list.find((cartItem) => cartItem.userId === userId && cartItem.productId === productId);
    if (cartItem) {
        cartItem.quantity += quantity;
        db.updateOne({ userId, productId }, { $set: cartItem })
    } else {
        cartItem = { id: list.length + 1, quantity, productId, userId };
        //list.push(cartItem);
        await db.insertOne(cartItem)
    }
    return { ...cartItem, product: await getProduct(productId) };
};


/**
 * 
 * @param {string} userId 
 * @param {string} productId 
 * @param {number} quantity 
 * @returns 
 */
const update = async (userId, productId, quantity) => {
    const db = await collection();
     console.log(userId, productId, quantity);
    if(quantity === 0) {
       db.deleteOne({ userId, productId})
        //list.splice(index, 1);
        return "null";
    } else {
        let cartItem = await db.findOne({ userId, productId})
        cartItem.quantity = quantity;
        db.updateOne({ userId, productId }, { $set: cartItem })
        //list[index].quantity = quantity;
        return { ...cartItem, product: await getProduct(productId) };
    }
}

module.exports = { add, get, update }