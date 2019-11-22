const mongoDB = require('mongodb');
const Product = require('../models/product');

exports.getAddProducts = (req, res, next) => {
    res.render('admin/edit-product', {
        docTitle: 'Add products',
        path: '/add-product',
        editing: false,
    });
};

exports.postAddProducts = (req, res, next) => {
    const title = req.body.title;
    const imgUrl = req.body.imgUrl;
    const price = req.body.price;
    const description = req.body.description;
    const id = null;
    const userId = req.user._id;

    const newProduct = new Product(id, userId, title, imgUrl, price, description);
    newProduct.save()
        .then( result => {
            res.redirect('/admin/products-list');
        }).catch(err => {
            console.log(err);
        });
};

exports.getAdminProductsList = (req, res, next) => {
     Product.fetchAll()
        .then( products => {
            res.render('admin/products-list', {
                products: products,
                docTitle: 'Admin products list',
                path: 'admin/products-list'
            });
        })
        .catch(err => console.log(err));
};

exports.getEditProducts = (req, res, next) => {
     const editMode = req.query.edit;
     if ( !editMode ) {
        return res.redirect('/');
     }
     Product.findById(req.params.productId)
        .then( product => {
            if ( !product ) {
                return res.redirect('/admin/products-list');
            }
            res.render('admin/edit-product', {
                docTitle: 'Edit product',
                path: 'admin/edit-product',
                editing: editMode,
                product: product,
            });
        })
        .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
    const productId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImgUrl = req.body.imgUrl;
    const updatedDescription = req.body.description;
    const updatedUserId = req.user._id;

     const updatedProduct = new Product(productId, updatedUserId, updatedTitle, updatedImgUrl, updatedPrice, updatedDescription);
     updatedProduct.save()
         .then( result => {
            res.redirect('/admin/products-list');
         }).catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
    const productId = req.body.productId;
    Product.deleteById(productId).then(() => {
        res.redirect('/admin/products-list');
    }).catch(err => console.log(err));
};