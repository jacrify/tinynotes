import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box
} from '@mui/material';
import { deleteSnippet } from '../services/snippetService';

const SnippetCard = ({ snippet, onDelete }) => {
  const navigate = useNavigate();
  
  const handleView = () => {
    navigate(`/snippet/${snippet._id}`);
  };
  
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this snippet?')) {
      const result = await deleteSnippet(snippet._id);
      
      if (result.success) {
        onDelete(snippet._id);
      } else {
        alert(result.error);
      }
    }
  };
  
  const handleCopyLink = () => {
    const url = `${window.location.origin}/public/snippets/${snippet._id}`;
    navigator.clipboard.writeText(url);
    alert('Public link copied to clipboard!');
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h6" component="div">
            {snippet.title}
          </Typography>
          <Chip 
            label={snippet.isPublic ? 'Public' : 'Private'} 
            color={snippet.isPublic ? 'success' : 'default'} 
            size="small" 
          />
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ 
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {snippet.content}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          Created: {new Date(snippet.createdAt).toLocaleString()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleView}>View</Button>
        <Button size="small" color="error" onClick={handleDelete}>Delete</Button>
        {snippet.isPublic && (
          <Button size="small" color="secondary" onClick={handleCopyLink}>
            Copy Public Link
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default SnippetCard;
