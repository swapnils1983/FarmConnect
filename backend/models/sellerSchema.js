const mongoose = require('mongoose');
const sellerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    contact: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    brandName: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    role:{
        type:String,
        default:"seller"
    }
})


sellerSchema.index({ email: 1 });


module.exports = mongoose.model('sellers',sellerSchema);