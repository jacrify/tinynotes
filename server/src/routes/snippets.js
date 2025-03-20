const express = require('express');
const {
  getAllSnippets,
  getSnippet,
  createSnippet,
  deleteSnippet
} = require('../controllers/snippetController');

const router = express.Router();

// Get all snippets for the logged-in user
router.get('/', getAllSnippets);

// Get a specific snippet (checks authorization)
router.get('/:id', getSnippet);

// Create a new snippet
router.post('/', createSnippet);

// Delete a snippet (checks ownership)
router.delete('/:id', deleteSnippet);

module.exports = router;
