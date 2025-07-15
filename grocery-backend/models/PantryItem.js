const mongoose = require('mongoose');

const PantryItemSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200
    },
    category: {
        type: String,
        default: 'Other',
        enum: ['Produce', 'Dairy', 'Meat', 'Beverage', 'Grains', 'Spices', 'Other']
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    unit: {
        type: String,
        enum: ['pcs', 'kg', 'g', 'L', 'ml', 'oz', 'cup', 'tbsp', 'tsp'],
        default: 'pcs'
    },
    expiryDate: {
        type: Date,
        index: true
    },
    addedDate: {
        type: Date,
        default: Date.now
    },
    barcode: {
        type: String,
        trim: true,
        sparse: true,
        index: true
    }
});

// Index to quickly get soon-expiring items
PantryItemSchema.index({ userId: 1, expiryDate: 1 });

module.exports = mongoose.model('PantryItem', PantryItemSchema);
