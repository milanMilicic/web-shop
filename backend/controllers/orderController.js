import asyncHandler from '../middleware/asyncHandler.js'
import Order from '../models/orderModel.js'

// POST /api/orders
// Private
const addOrderItems = asyncHandler( async (req, res) => {
    res.send('add order items');
});

// GET /api/orders/myorders
// Private
const getMyOrders = asyncHandler( async (req, res) => {
    res.send('get my orders');
});

// GET /api/orders/:id
// Private/Admin
const getOrderById = asyncHandler( async (req, res) => {
    res.send('get order by id');
});


// Update order to paid
// PUT /api/orders/:id/pay
// Private
const updateOrderToPaid = asyncHandler( async (req, res) => {
    res.send('update order to paid');
});


// Update order to delivered
// PUT /api/orders/:id/deliver
// Private/Admin
const updateOrderToDelivered = asyncHandler( async (req, res) => {
    res.send('update order to delivered');
});


// GET /api/orders/
// Private/Admin
const getOrders = asyncHandler( async (req, res) => {
    res.send('get all orders');
});

export { addOrderItems, getMyOrders, getOrderById, updateOrderToPaid, updateOrderToDelivered, getOrders};