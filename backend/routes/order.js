const express = require('express');
const { createOrder, getAllOrders, getOrderById, updateOrderStatus, deleteOrder, getSellerAnalytics, getSellerProducts } = require('../controllers/orderController');
const authenticateBuyer = require('../controllers/authenticateBuyer ');
const Order = require('../models/orderSchema');
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

// Get all orders for a buyer
router.get('/buyer/orders', authenticateBuyer, async (req, res) => {
    try {
      const buyerId = req.user.id;
      const orders = await Order.find({ userId: buyerId }).populate('productId sellerId');
      res.status(200).json(orders);
    } catch (error) {
        console.log(error)
      res.status(500).json({ error: error.message });
    }
  });
  

module.exports = router;
