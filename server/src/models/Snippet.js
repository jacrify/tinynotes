const mongoose = require('mongoose');

const snippetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    trim: true
  },
  isPublic: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

// Index for faster queries
snippetSchema.index({ userId: 1 });
snippetSchema.index({ isPublic: 1 });

module.exports = mongoose.model('Snippet', snippetSchema);
