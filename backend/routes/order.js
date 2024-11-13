const express = require('express');
const { createOrder, getAllOrders, getOrderById, updateOrderStatus, deleteOrder, getSellerAnalytics, getSellerProducts } = require('../controllers/orderController');
const router = express.Router();

// Create a new order
router.post('/create', createOrder);

// Get all orders
router.get('/', getAllOrders);

// Get a specific order by ID
router.get('/:id', getOrderById);

// Update an order's status
router.put('/:id/status', updateOrderStatus);

// Delete an order
router.delete('/:id', deleteOrder);

router.get('/analytics/:sellerId', getSellerAnalytics);

router.get('/products/seller/:sellerId', getSellerProducts);



module.exports = router;
