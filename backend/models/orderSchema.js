const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "products",
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "users"
      },
      orderQty: {
        type: Number,
        required: true,
      },
      status: {
        type: String,
        enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
        default: "Pending",
      },
      sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "users",
      },
      totalPrice: {
        type: Number,
        required: true,
      },      
      date: {
        type: Date,
        default: Date.now,
      },
})

module.exports = mongoose.model('Order', orderSchema);