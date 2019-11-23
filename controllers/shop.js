const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getDisplayProducts = (req, res, next) => {
    Product.fetchAll()
        .then( products => {
            res.render('shop/products-list', {
                products: products,
                docTitle: 'All Products',
                path: '/products-list',
            });// to render templates// send the data to the pug file
        })
        .catch(err => console.log(err));
};

exports.getProductDetail = (req, res, next) => {
    const productId = req.params.productId; //Same name we have to extract that we have assigned in the route/shop => /products/:productId
    Product.findById(productId)
        .then( product => {
            res.render('shop/product-details', {
                docTitle: product.title,
                product: product,
                path: '/products-list',
            });
        })
        .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
    Product.fetchAll()
        .then( products => {
           res.render('shop/index', {
                products: products,
                docTitle: 'Index',
                path: '/index',
            });
        })
        .catch(err => console.log(err));

};

exports.getCart = (req, res, next) => {
    req.user.getCart()
        .then( products => {
            res.render('shop/cart', {
                docTitle: 'Your Cart',
                path: '/cart',
                cartProductsInfo: products,
            });
        })
        .catch( err => console.log(err));
};

exports.postCart = (req, res, next) => {
    const productId = req.body.productId;
    Product.findById(productId)
        .then( product => {
            req.user.addToCart(product);
            res.redirect('/cart');
        })
        .catch(err => console.log(err));

};

exports.postDeleteCartProduct = (req, res, next) => {
    const productId = req.body.productId;
    req.user.deleteItemFromCart(productId)
        .then( res => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
};

exports.postOrder = (req, res, next) => {
   req.user.addOrder().then( result => {
       res.redirect('/cart')
   }).catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
    req.user.getOrders()
        .then( orders => {
            res.render('shop/orders', {
                docTitle: 'Orders',
                path: '/orders',
                orders: orders,
            });
        })
        .catch(err => console.log(err));
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        docTitle: 'Checkout',
        path: '/checkout'
    });
};