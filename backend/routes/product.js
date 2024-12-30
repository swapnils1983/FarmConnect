const express = require('express');
const { getProductsByCategory, createProduct, getAllProducts, getProductById, updateProduct, deleteProduct, getAllProductsBySeller } = require('../controllers/productController');
const router = express.Router();
const upload = require('../middlewares/cloudanaryConfig');
const authUser = require('../middlewares/authUser');

router.post('/create',authUser,upload.single('image'),createProduct);

router.get('/get/:id',getProductById);
router.get('/getall/seller',authUser,getAllProductsBySeller);
router.get('/getall/:category',getProductsByCategory);

router.get('/getall',getAllProducts);
router.put('/update/:id',updateProduct);
router.delete('/delete/:id',deleteProduct);



module.exports = router;
