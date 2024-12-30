const Product = require('../models/productSchema'); 

const createProduct = async (req, res) => {
  try {
    console.log(req.body)
    const product = new Product({
      ...req.body,
      image: req.file.path,
      sellerId: req.user.id
    });
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const products = await Product.find(filter).populate('sellerId', 'name email');
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductsByCategory = async (req, res) => {
    try {
        const products = await Product.find({ category: req.params.category }).populate('sellerId', 'name email');
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('sellerId', 'name email');
    if (!product) {
      console.log("Product not found")
      return res.status(404).json({ message: 'Product not found' });
    }
    console.log(product)
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      console.log("Product not found")
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllProductsBySeller = async (req, res) => {
    try {
        const products = await Product.find({ sellerId: req.user.id }).populate('sellerId', 'name email');
        console.log(products)
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    createProduct,
    getAllProducts,
    getProductsByCategory,
    getProductById,
    updateProduct,
    deleteProduct,
    getAllProductsBySeller,

    };