import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

// Get all snippets for the logged-in user
export const getAllSnippets = async () => {
  try {
    const response = await axios.get(`${API_URL}/snippets`);
    return { success: true, data: response.data.snippets };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || 'Failed to fetch snippets'
    };
  }
};

// Get a specific snippet (checks authorization)
export const getSnippet = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/snippets/${id}`);
    return { success: true, data: response.data.snippet };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || 'Failed to fetch snippet'
    };
  }
};

// Create a new snippet
export const createSnippet = async (snippetData) => {
  try {
    const response = await axios.post(`${API_URL}/snippets`, snippetData);
    return { success: true, data: response.data.snippet };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || 'Failed to create snippet'
    };
  }
};

// Delete a snippet (checks ownership)
export const deleteSnippet = async (id) => {
  try {
    await axios.delete(`${API_URL}/snippets/${id}`);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || 'Failed to delete snippet'
    };
  }
};

// Get a public snippet by ID (no authentication required)
export const getPublicSnippet = async (id) => {
  try {
    const response = await axios.get(`${API_URL.replace('/api', '/public')}/snippets/${id}`);
    return { success: true, data: response.data.snippet };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || 'Failed to fetch public snippet'
    };
  }
};
