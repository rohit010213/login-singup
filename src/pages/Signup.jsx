import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Container, Box, TextField, Button, Typography, Link, InputAdornment, IconButton, Paper } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { setUser } from '../utils/auth';
import { toast } from 'react-toastify';

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.includes("@") || !email.includes(".")) {
      toast.error("Email is invalid");        // email validation
      return;
    }

   // username validation start

    if (username.length < 3 || username.length > 8) {
      toast.error("Username must be 3–8 characters");
      return;
    }

    for (let ch of username) {
      const code = ch.charCodeAt(0);
      const isLetter = (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
      const isNumber = code >= 48 && code <= 57;
      if (!isLetter && !isNumber) {
        toast.error("Username must be alphanumeric only");
        return;
      }
    }

// password validation start

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    let hasUpper = false;
    let hasLower = false;
    let hasNumber = false;
    let hasSpecial = false;

    for (let ch of password) {
      const code = ch.charCodeAt(0);
      if (code >= 65 && code <= 90) hasUpper = true;
      else if (code >= 97 && code <= 122) hasLower = true;
      else if (code >= 48 && code <= 57) hasNumber = true;
      else hasSpecial = true;
    }

    if (!hasUpper) return toast.error("Password must include an uppercase letter");
    if (!hasLower) return toast.error("Password must include a lowercase letter");
    if (!hasNumber) return toast.error("Password must include a number");
    if (!hasSpecial) return toast.error("Password must include a special character");

    // checking password and confirm password  both match or not

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return null;
    }

    const user = { username, email, password };
    setUser(user);              // setting user data in local storage
    toast.success('Signup successful');
    navigate('/login');
  }

  return (
    <Container maxWidth="xs" sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      backgroundColor: '#e0f7fa' // Light cyan background
    }}>
        
      <Paper elevation={3} sx={{ padding: 3, borderRadius: 2, backgroundColor: '#f5f5f5', width: '100%' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography component="h1" variant="h5" align="center" color="primary">Create Account</Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 2 }}>
            <TextField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              fullWidth
              variant="outlined"
              sx={{ bgcolor: '#ffffff' }}
            />
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
            <TextField
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            <Button type="submit" variant="contained" fullWidth sx={{ bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' } }}>Sign Up</Button>
          </Box>

          <Box sx={{ mt: 1, textAlign: 'center' }}>
            <Link component={RouterLink} to="/login">Already have an account? Sign in</Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}