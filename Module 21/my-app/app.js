const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/Product');
const DATABASE = 'mongodb+srv://sefayetalam14:betaray200114@cluster0.1ghb5.mongodb.net/Product_db';

const app = express();


app.use(express.json()); 

// Database Connect
mongoose.connect(DATABASE,{autoIndex:true}).then(()=>{
    console.log("MongoDB connected");
}).catch(()=>{
    console.log("MongoDB disconnected");
})


// Create a product
app.post('/product', async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        console.error("Error creating product:", error); 
        res.status(500).json({ message: 'Error creating product' });
    }
});

// Get a product by ID
app.get('/product/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(product);
    } catch (error) {
        console.error("Error retrieving product:", error); // Log the error
        res.status(500).json({ message: 'Error retrieving product' });
    }
});

// Update a product by ID
app.put('/product/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error("Error updating product:", error); // Log the error
        res.status(500).json({ message: 'Error updating product' });
    }
});


// Delete a product by ID
app.delete('/product/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error });
    }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
