import asyncHandler from '../middleware/asyncHandler.js'
import Product from '../models/productModel.js'

// GET /api/products
const getProducts = asyncHandler( async (req, res) => {
    const productsPerPage = 8;

    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword ? { 
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } 
    : {};

    const count = await Product.countDocuments({...keyword});

    const products = await Product.find({...keyword}).limit(productsPerPage).skip(productsPerPage * (page - 1));
    res.json({
        products,
        page,
        pages: Math.ceil(count / productsPerPage),
    });
});

// GET /api/products/:id
const getProductById = asyncHandler( async (req, res) => {
    const product = await Product.findById(req.params.id);

    if(product){
       return res.json(product);
    } else {
        res.status(404);
        throw new Error('Resource not found');
    }
});

// POST /api/products
const createProduct = asyncHandler( async (req, res) => {
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description',
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});


// PUT /api/products/:id
const updateProduct = asyncHandler( async (req, res) => {
    const { name, price, image, brand, category, countInStock, description } = req.body;
    const product = await Product.findById(req.params.id);

    if(product){
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Resource not found');
    }
});


// DELETE /api/products/:id
const deleteProduct = asyncHandler( async (req, res) => {
    const product = await Product.findById(req.params.id);

    if(product){
        await Product.deleteOne({_id: product._id});
        res.status(200).json({message: 'Product deleted'});
    } else {
        res.status(404);
        throw new Error('Resource not found');
    }
});

// Create a new review
// POST /api/products/:id/review
// Private
const createReview = asyncHandler( async (req, res) => {
    const {rating, comment} = req.body;
    const product = await Product.findById(req.params.id);

    if(product){
        const alreadyReviewed = product.reviews.find((review) => review.user.toString() === req.user._id.toString());

        if(alreadyReviewed){
            res.status(400);
            throw new Error('Product already reviewed');
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        };

        product.reviews.push(review);

        product.numReviews = product.reviews.length;

        product.rating = product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length;

        await product.save();
        res.status(201).json({message: 'Review added'});
    } else {
        res.status(404);
        throw new Error('Resource not found');
    }
});


// Get top rated products
// GET /api/products/top
const getTopProducts = asyncHandler( async (req, res) => {
    const products = await Product.find({}).sort({rating: -1}).limit(3);
    res.status(200).json(products);
});

export { getProducts, getProductById, createProduct, updateProduct, deleteProduct, createReview, getTopProducts }