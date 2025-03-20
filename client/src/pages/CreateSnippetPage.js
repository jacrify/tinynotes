import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  Paper,
  Box,
  Alert
} from '@mui/material';
import { createSnippet } from '../services/snippetService';

const CreateSnippetPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title || !content) {
      setError('Please fill in all required fields');
      return;
    }
    
    setLoading(true);
    setError('');
    
    const result = await createSnippet({
      title,
      content,
      isPublic
    });
    
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Create New Snippet
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        
        <TextField
          label="Content"
          fullWidth
          margin="normal"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          multiline
          rows={8}
        />
        
        <FormControlLabel
          control={
            <Switch
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              color="primary"
            />
          }
          label="Make this snippet public"
          sx={{ my: 2, display: 'block' }}
        />
        
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="outlined"
            onClick={() => navigate('/')}
          >
            Cancel
          </Button>
          
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            Create Snippet
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default CreateSnippetPage;
