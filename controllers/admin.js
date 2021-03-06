const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    });
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    Product.create({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description
    })
        .then(result=>{
        console.log('Create product');
        res.redirect('/admin/products');
    })
        .catch(err=> console.log(err));
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then(product => {
        if (!product) {
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        });
    })
        .catch(err=>console.log(err));

};
exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatePrice = req.body.price;
    const updateImageUrl = req.body.imageUrl;
    const updateDesc = req.body.description;
    Product.findById(prodId)
        .then(product => {
            product.title = updatedTitle;
            product.price = updatePrice;
            product.description = updateDesc;
            product.imageUrl = updateImageUrl;
            return product.save();
        })
        .then(result=>{
            console.log('UPDATE PRODUCT!')
            res.redirect('/admin/products');
        })
        .catch(err=> console.log(err));

};

exports.getProducts = (req, res, next) => {
    Product.findAll()
        .then(products => {
            res.render('admin/products', {
                prods: products,
                pageTitle: 'Admin Products',
                path: '/admin/products'
            });
    })
        .catch(err=>console.log(err));
};
exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findAll({where: {prodId}})
        .then(products => {
            console.log(prodId);
                return products[0].destroy();
            })
        .then(result => {
            console.log('PRODUCT DESTROYED');
            res.redirect('/admin/products');
            })
        .catch(err => console.log(err));
};