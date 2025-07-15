const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
    getGroceryLists,
    createGroceryList,
    updateGroceryList,
    deleteGroceryList,
} = require('../controllers/groceryListController');

router.use(auth); // Protect all routes

router.get('/', getGroceryLists);
router.post('/', createGroceryList);
router.put('/:id', updateGroceryList);
router.delete('/:id', deleteGroceryList);

module.exports = router;
