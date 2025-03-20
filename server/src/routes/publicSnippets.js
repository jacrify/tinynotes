const express = require('express');
const { getPublicSnippet } = require('../controllers/snippetController');

const router = express.Router();

// Get a public snippet by ID (no authentication required)
router.get('/:id', getPublicSnippet);

module.exports = router;
