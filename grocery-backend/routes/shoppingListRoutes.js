const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
    getShoppingItems,
    addShoppingItem,
    updateShoppingItem,
    deleteShoppingItem,
} = require('../controllers/shoppingListController');

router.use(auth); // Protect all shopping list routes

router.get('/', getShoppingItems);
router.post('/', addShoppingItem);
router.put('/:id', updateShoppingItem);
router.delete('/:id', deleteShoppingItem);

module.exports = router;
