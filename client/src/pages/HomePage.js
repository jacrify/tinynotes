import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Button,
  Box,
  Paper,
  CircularProgress,
  Alert
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { getAllSnippets } from '../services/snippetService';
import SnippetCard from '../components/SnippetCard';

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSnippets = async () => {
      if (isAuthenticated) {
        setLoading(true);
        const result = await getAllSnippets();
        
        if (result.success) {
          setSnippets(result.data);
          setError(null);
        } else {
          setError(result.error);
        }
        
        setLoading(false);
      }
    };
    
    fetchSnippets();
  }, [isAuthenticated]);

  const handleDeleteSnippet = (id) => {
    setSnippets(snippets.filter(snippet => snippet._id !== id));
  };

  if (!isAuthenticated) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Welcome to TinyNotes
        </Typography>
        <Typography variant="body1" paragraph>
          A minimal text-sharing application where you can create, view, and manage text snippets.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/login')}
          sx={{ mt: 2 }}
        >
          Login to Get Started
        </Button>
      </Paper>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">
          Your Snippets
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/new')}
        >
          Create New Snippet
        </Button>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      ) : snippets.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="body1" paragraph>
            You don't have any snippets yet.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/new')}
          >
            Create Your First Snippet
          </Button>
        </Paper>
      ) : (
        snippets.map(snippet => (
          <SnippetCard
            key={snippet._id}
            snippet={snippet}
            onDelete={handleDeleteSnippet}
          />
        ))
      )}
    </Box>
  );
};

export default HomePage;
