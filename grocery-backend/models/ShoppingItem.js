const mongoose = require('mongoose');

const ShoppingItemSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: { type: String, required: true, trim: true },
    quantity: { type: Number, default: 1 },
    unit: { type: String, default: '' }, // e.g. pcs, kg, etc.
    category: { type: String, default: 'Other' },
    bought: { type: Boolean, default: false }, // to mark if item is bought
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ShoppingItem', ShoppingItemSchema);
