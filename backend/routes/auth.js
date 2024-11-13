const express = require('express');
const { sellerRegister, sellerLogin, userRegister, userLogin } = require('../controllers/authController');
const router = express.Router();

router.post('/seller/register',sellerRegister);
router.post('/seller/login',sellerLogin);
router.post('/user/register',userRegister);
router.post('/user/login',userLogin);


module.exports = router;