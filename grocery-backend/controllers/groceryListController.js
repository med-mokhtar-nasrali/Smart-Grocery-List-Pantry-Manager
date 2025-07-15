const GroceryList = require('../models/GroceryList');

// Get all grocery lists for user
const getGroceryLists = async (req, res) => {
    try {
        const lists = await GroceryList.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json(lists);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Create/generate new grocery list
const createGroceryList = async (req, res) => {
    try {
        const { items } = req.body; // Expect items: [{ name, quantity, unit }]

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: 'Items array is required' });
        }

        const newList = new GroceryList({
            userId: req.user.id,
            items,
        });

        await newList.save();
        res.status(201).json(newList);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update grocery list (e.g. mark as completed or update items)
const updateGroceryList = async (req, res) => {
    try {
        const listId = req.params.id;
        const updates = req.body;

        const list = await GroceryList.findOneAndUpdate(
            { _id: listId, userId: req.user.id },
            updates,
            { new: true }
        );

        if (!list) return res.status(404).json({ message: 'Grocery list not found' });

        res.json(list);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete grocery list
const deleteGroceryList = async (req, res) => {
    try {
        const listId = req.params.id;

        const list = await GroceryList.findOneAndDelete({ _id: listId, userId: req.user.id });

        if (!list) return res.status(404).json({ message: 'Grocery list not found' });

        res.json({ message: 'Grocery list deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    getGroceryLists,
    createGroceryList,
    updateGroceryList,
    deleteGroceryList,
};
