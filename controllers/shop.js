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


exports.postCart = (req, res, next) => {
    const productId = req.body.productId;
    Product.findById(productId)
        .then( product => {
            return req.user.addToCart(product);
        })
        .then( result => result )
        .catch(err => console.log(err));
    res.redirect('/products-list');
};

exports.getCart = (req, res, next) => {
    Cart.getCart((cart) => {
        Product.fetchAll(products => {
            const cartProductsInfo = [];
            if ( cart.length !== 0 ) {
               for (product of products) {
               const cartProduct = cart.products.find( cartProduct => cartProduct.id === product.id );
                   if ( cartProduct ) {
                       cartProductsInfo.push({ product: product, quentity: cartProduct.quentity });
                   }
               }
            }

            res.render('shop/cart', {
                docTitle: 'Your Cart',
                path: '/cart',
                cartProductsInfo: cartProductsInfo,
            });
        });
    });
};

exports.postDeleteCartItem = (req, res, next) => {
    const productId = req.body.productId;
    Product.findById(productId, (product) => {
        Cart.deleteProductFromCart(productId, product.price);
    });
    res.redirect('/cart');
};

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        docTitle: 'Orders',
        path: '/orders',
    });
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        docTitle: 'Checkout',
        path: '/checkout'
    });
};