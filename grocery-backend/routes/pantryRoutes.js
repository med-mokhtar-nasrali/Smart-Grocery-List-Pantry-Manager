const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
    getPantryItems,
    addPantryItem,
    updatePantryItem,
    deletePantryItem
} = require('../controllers/pantryController');

router.use(auth); // Protect all routes

router.get('/', getPantryItems);
router.post('/', addPantryItem);
router.put('/:id', updatePantryItem);
router.delete('/:id', deletePantryItem);

module.exports = router;
