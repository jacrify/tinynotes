import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Typography,
  Paper,
  Box,
  Button,
  Chip,
  CircularProgress,
  Alert
} from '@mui/material';
import { getSnippet, deleteSnippet } from '../services/snippetService';

const ViewSnippetPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [snippet, setSnippet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSnippet = async () => {
      setLoading(true);
      const result = await getSnippet(id);
      
      if (result.success) {
        setSnippet(result.data);
        setError(null);
      } else {
        setError(result.error);
      }
      
      setLoading(false);
    };
    
    fetchSnippet();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this snippet?')) {
      const result = await deleteSnippet(id);
      
      if (result.success) {
        navigate('/');
      } else {
        setError(result.error);
      }
    }
  };
  
  const handleCopyLink = () => {
    const url = `${window.location.origin}/public/snippets/${id}`;
    navigator.clipboard.writeText(url);
    alert('Public link copied to clipboard!');
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" my={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  if (!snippet) {
    return (
      <Alert severity="info">
        Snippet not found or you don't have permission to view it.
      </Alert>
    );
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">
          {snippet.title}
        </Typography>
        <Chip 
          label={snippet.isPublic ? 'Public' : 'Private'} 
          color={snippet.isPublic ? 'success' : 'default'} 
        />
      </Box>
      
      <Paper 
        variant="outlined" 
        sx={{ 
          p: 2, 
          mb: 3, 
          whiteSpace: 'pre-wrap',
          minHeight: '200px'
        }}
      >
        <Typography variant="body1">
          {snippet.content}
        </Typography>
      </Paper>
      
      <Typography variant="caption" color="text.secondary" display="block" mb={3}>
        Created: {new Date(snippet.createdAt).toLocaleString()}
      </Typography>
      
      <Box display="flex" justifyContent="space-between">
        <Button
          variant="outlined"
          onClick={() => navigate('/')}
        >
          Back to Snippets
        </Button>
        
        <Box>
          {snippet.isPublic && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleCopyLink}
              sx={{ mr: 2 }}
            >
              Copy Public Link
            </Button>
          )}
          
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
          >
            Delete Snippet
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default ViewSnippetPage;
