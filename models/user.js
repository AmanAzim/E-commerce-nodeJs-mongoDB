const mongoDB = require('mongodb');
const getDB = require('../util/database').getDB;

class  User {
    constructor(username, email, cart, userId) {
        this.username = username;
        this.email = email;
        this.cart = cart;
        this.userId = userId;
    }

    save() {
        const db = getDB();
        return db.collection('users').insertOne(this);
    }

    addToCart(product) {
        const db = getDB();

        //const cartProduct = this.cart.items.findIndex( cartProduct => cartProduct._id ===product._id );
        //if ( cartProduct ) {

        //}

        const updatedCart = {
            items: [
                {
                    productId: new mongoDB.ObjectID(product._id),
                    quentity: 1
                }
            ]
        };
        return db.collection('users').updateOne(
                { _id: new mongoDB.ObjectID(this.userId) },
                { $set: { cart: updatedCart }, //just update the cart
            });
    }

    static findUserById(id) {
        const db = getDB();
        //return db.collection('users').find({ _id: new mongoDB.ObjectID(id) }).next(); //alternative
        return db.collection('users').findOne({_id: new mongoDB.ObjectID(id)});
    }
}

module.exports = User;