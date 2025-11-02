import React, { useState, useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { setToken, generateToken, getUser, isAuthenticated } from '../utils/auth';
import { Container, Box,TextField, Button, Typography, Link, InputAdornment, IconButton,Paper} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { toast } from 'react-toastify';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) navigate('/dashboard');     // Redirect if token is present to dashboard
  }, [navigate]);

  async function handleSubmit(e) {
    e.preventDefault();

    const stored = getUser();
    if (!stored) {
      toast.error("No user found, please sign up.");  // checking user available or not in local storage
      return;
    }

    if (stored.email !== email || stored.password !== password) {
      toast.error("User not found.");                // matching data from loakl storage to input data
      return;
    }

    const token = generateToken();
    setToken(token);                       // generating token 
    toast.success("Login successful");
    navigate('/dashboard');
  }

  return (
    <Container maxWidth="xs" sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      backgroundColor: '#e0f7fa' // Light cyan background
    }}>
      <Paper elevation={3} sx={{ padding: 3, borderRadius: 2, backgroundColor: '#f5f5f5' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography component="h1" variant="h5" align="center" color="primary">Sign In</Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 2 }}>
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              type="email"
              variant="outlined"
              sx={{ bgcolor: '#ffffff' }}
            />
            <TextField
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              sx={{ bgcolor: '#ffffff' }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      onClick={() => setShowPassword((s) => !s)}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <Button type="submit" variant="contained" fullWidth sx={{ bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' } }}>Login</Button>
          </Box>

          <Box sx={{ mt: 1, textAlign: 'center' }}>
            <Link component={RouterLink} to="/signup">Don't have an account? Sign up</Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}