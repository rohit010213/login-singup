import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearToken, getToken, isAuthenticated } from '../utils/auth';
import {AppBar, Toolbar,Typography,Button,  Container, Grid,Card, CardContent} from '@mui/material';
import { toast } from 'react-toastify';

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
    }
  }, [navigate]);

  function handleLogout() {
    clearToken();
    toast.info("Logged out successfully");
    navigate('/login');
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Thank You Page</Typography>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h5" align="center">Thank You For Login</Typography>
                <Typography sx={{ mt: 2 }} variant="body1" align="center">
                  Your token: <code>{getToken() || 'no-token'}</code>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}