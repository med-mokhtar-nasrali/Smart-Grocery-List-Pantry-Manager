const mongoose = require('mongoose');

const GroceryListSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    items: [
        {
            name: { type: String, required: true, trim: true },
            quantity: { type: Number, required: true, min: 1 },
            unit: { type: String, required: true }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
        index: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending',
        index: true
    }
});

// For quick access to latest shopping lists
GroceryListSchema.index({ userId: 1, status: 1, createdAt: -1 });

module.exports = mongoose.model('GroceryList', GroceryListSchema);
