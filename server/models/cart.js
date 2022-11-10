
// CartItem: { id: 1, quantity: 2, productId: 1, userId: 'mp@np.edu' }
const list = [];

;
const add = (productId, userId, quantity) => {
    let cartItem = list.find((cartItem) => cartItem.userId === userId && cartItem.productId === productId);
    if (cartItem) {
        cartItem.quantity += +quantity;
    } else {
        list.push({ id: list.length + 1, quantity: +quantity, productId, userId });
    }
    return cartItem;
};

const get = (userId) => {
    return list.filter((cartItem) => cartItem.userId === userId);
    };

const remove = (userId, productId) => {
  const index = list.findIndex((cartItem) => cartItem.userId === userId && cartItem.productId === productId);
  if (index !== -1) {
    list.splice(index, 1);
  }
  return index;
}

module.exports = { add, get, remove }