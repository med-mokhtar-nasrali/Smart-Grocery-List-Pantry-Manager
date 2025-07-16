const ShoppingItem = require('../models/ShoppingItem');

// Get all shopping list items for user
const getShoppingItems = async (req, res) => {
    try {
        const items = await ShoppingItem.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Add new shopping list item
const addShoppingItem = async (req, res) => {
    try {
        const { name, quantity, unit, category } = req.body;
        const newItem = new ShoppingItem({
            userId: req.user.id,
            name,
            quantity,
            unit,
            category,
        });
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update shopping list item
const updateShoppingItem = async (req, res) => {
    try {
        const itemId = req.params.id;
        const updates = req.body;

        const item = await ShoppingItem.findOneAndUpdate(
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

// Delete shopping list item
const deleteShoppingItem = async (req, res) => {
    try {
        const itemId = req.params.id;

        const item = await ShoppingItem.findOneAndDelete({ _id: itemId, userId: req.user.id });

        if (!item) return res.status(404).json({ message: 'Item not found' });

        res.json({ message: 'Item deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    getShoppingItems,
    addShoppingItem,
    updateShoppingItem,
    deleteShoppingItem,
};
