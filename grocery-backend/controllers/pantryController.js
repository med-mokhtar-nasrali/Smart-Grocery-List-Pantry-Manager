const PantryItem = require('../models/PantryItem');

// Get all pantry items for user
const getPantryItems = async (req, res) => {
    try {
        const items = await PantryItem.find({ userId: req.user.id }).sort({ expiryDate: 1 });
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Add new pantry item
const addPantryItem = async (req, res) => {
    try {
        const { name, category, quantity, unit, expiryDate, barcode } = req.body;

        const newItem = new PantryItem({
            userId: req.user.id,
            name,
            category,
            quantity,
            unit,
            expiryDate,
            barcode
        });

        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update pantry item
const updatePantryItem = async (req, res) => {
    try {
        const itemId = req.params.id;
        const updates = req.body;

        const item = await PantryItem.findOneAndUpdate(
            { _id: itemId, userId: req.user.id },
            updates,
            { new: true }
        );

        if (!item) return res.status(404).json({ message: 'Item not found' });

        res.json(item);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete pantry item
const deletePantryItem = async (req, res) => {
    try {
        const itemId = req.params.id;

        const item = await PantryItem.findOneAndDelete({ _id: itemId, userId: req.user.id });

        if (!item) return res.status(404).json({ message: 'Item not found' });

        res.json({ message: 'Item deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    getPantryItems,
    addPantryItem,
    updatePantryItem,
    deletePantryItem
};
