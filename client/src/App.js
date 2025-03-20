import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Container } from '@mui/material';
import { useAuth } from './contexts/AuthContext';

// Components
import Header from './components/Header';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CreateSnippetPage from './pages/CreateSnippetPage';
import ViewSnippetPage from './pages/ViewSnippetPage';
import PublicSnippetPage from './pages/PublicSnippetPage';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

function App() {
  return (
    <>
      <Header />
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route 
            path="/new" 
            element={
              <ProtectedRoute>
                <CreateSnippetPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/snippet/:id" 
            element={
              <ProtectedRoute>
                <ViewSnippetPage />
              </ProtectedRoute>
            } 
          />
          <Route path="/public/snippets/:id" element={<PublicSnippetPage />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
