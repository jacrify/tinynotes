const Snippet = require('../models/Snippet');
const { snippetSchema } = require('../utils/validation');

// Get all snippets for the logged-in user
const getAllSnippets = async (req, res) => {
  const snippets = await Snippet.find({ userId: req.user.userId })
    .sort({ createdAt: -1 });

  res.status(200).json({ snippets });
};

// Get a specific snippet (checks authorization)
const getSnippet = async (req, res) => {
  const snippet = await Snippet.findById(req.params.id);
  
  if (!snippet) {
    return res.status(404).json({ error: 'Snippet not found' });
  }

  // Check if the user is authorized to view this snippet
  if (!snippet.isPublic && snippet.userId.toString() !== req.user.userId) {
    return res.status(403).json({ error: 'Not authorized to view this snippet' });
  }

  res.status(200).json({ snippet });
};

// Create a new snippet
const createSnippet = async (req, res) => {
  // Validate request body
  const { error, value } = snippetSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // Create snippet
  const snippet = await Snippet.create({
    userId: req.user.userId,
    title: value.title,
    content: value.content,
    isPublic: value.isPublic
  });

  res.status(201).json({
    message: 'Snippet created successfully',
    snippet
  });
};

// Delete a snippet (checks ownership)
const deleteSnippet = async (req, res) => {
  const snippet = await Snippet.findById(req.params.id);
  
  if (!snippet) {
    return res.status(404).json({ error: 'Snippet not found' });
  }

  // Check if the user is the owner of the snippet
  if (snippet.userId.toString() !== req.user.userId) {
    return res.status(403).json({ error: 'Not authorized to delete this snippet' });
  }

  await Snippet.findByIdAndDelete(req.params.id);

  res.status(200).json({ message: 'Snippet deleted successfully' });
};

// Get a public snippet by ID (no authentication required)
const getPublicSnippet = async (req, res) => {
  const snippet = await Snippet.findById(req.params.id);
  
  if (!snippet || !snippet.isPublic) {
    return res.status(404).json({ error: 'Snippet not found or not public' });
  }

  res.status(200).json({ snippet });
};

module.exports = {
  getAllSnippets,
  getSnippet,
  createSnippet,
  deleteSnippet,
  getPublicSnippet
};
