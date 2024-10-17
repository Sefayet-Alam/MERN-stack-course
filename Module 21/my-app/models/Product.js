const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    title: { type: String, required: true },
    short_des: { type: String },
    price: { type: Number },
    discount: { type: Number },
    image: { type: String },
    stock: { type: String },
    star: { type: String },
    remark: { type: String },
}, {
    versionKey: false,
    timestamps: true,
});

const Product = mongoose.model('Product', DataSchema);
module.exports = Product;
