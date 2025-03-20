import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Typography,
  Paper,
  Box,
  Button,
  CircularProgress,
  Alert
} from '@mui/material';
import { getPublicSnippet } from '../services/snippetService';

const PublicSnippetPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [snippet, setSnippet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSnippet = async () => {
      setLoading(true);
      const result = await getPublicSnippet(id);
      
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
        Snippet not found or it may have been deleted.
      </Alert>
    );
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Box mb={3}>
        <Typography variant="h4" gutterBottom>
          {snippet.title}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Shared publicly on {new Date(snippet.createdAt).toLocaleString()}
        </Typography>
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
      
      <Box display="flex" justifyContent="space-between">
        <Button
          variant="outlined"
          onClick={() => navigate('/')}
        >
          Go to Home
        </Button>
      </Box>
    </Paper>
  );
};

export default PublicSnippetPage;
