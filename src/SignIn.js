import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Grid, Select, MenuItem, InputLabel, FormControl, CircularProgress, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

function SignIn() {
  const [formData, setFormData] = useState({
    mobile_number: '',
    gas_name: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      navigate('/products', { state: { userData: JSON.parse(user) } });
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading to true when form is submitted
    try {
      const response = await axios.post('https://vercel-fastapi-rouge.vercel.app/signin', formData);
      setMessage(response.data.message);
      if (response.data.message === "Sign in successful") {
        const userData = {
          username: response.data.user_data.username,
          name: response.data.user_data.name,
          mobile_number: response.data.user_data.mobile_number,
          address: response.data.user_data.address,
          gas_name: response.data.user_data.gas_name,
          alternate_mobile_number: response.data.user_data.alternate_mobile_number
        };
        localStorage.setItem('user', JSON.stringify(userData)); // Save user data to localStorage
        navigate('/products', { state: { userData } });
      }
    } catch (error) {
      setMessage('Error: ' + error.response.data.detail);
    } finally {
      setLoading(false); // Set loading to false after the request is complete
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ padding: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Welcome to GAS WALA
        </Typography>
        <Typography variant="body1" paragraph>
        गैस की सभी जरूरतों के लिए आपका एकमात्र समाधान। आसानी से गैस सिलेंडर बुक करें, अपने ऑर्डर प्रबंधित करें, और गैस से संबंधित एक्सेसरीज़ की विस्तृत श्रृंखला का अन्वेषण करें। चाहे आपको नया कनेक्शन चाहिए या रिफिल ऑर्डर करना हो, GAS WALA इसे सरल और सुविधाजनक बनाता है।        </Typography>
      </Box>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Sign In
        </Typography>
        {message && <Typography color="error">{message}</Typography>}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Mobile Number"
                name="mobile_number"
                value={formData.mobile_number}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Gas Name</InputLabel>
                <Select
                  name="gas_name"
                  value={formData.gas_name}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="TOTAL 12KG">TOTAL 12KG</MenuItem>
                  <MenuItem value="TOTAL 17KG">TOTAL 17KG</MenuItem>
                  <MenuItem value="SUPER 12KG">SUPER 12KG</MenuItem>
                  <MenuItem value="SUPER 17KG">SUPER 17KG</MenuItem>
                  <MenuItem value="INDIAN 5KG">INDIAN 5KG</MenuItem>
                  <MenuItem value="INDIAN 19KG">INDIAN 19KG</MenuItem>
                  <MenuItem value="BHARATH 5KG">BHARATH 5KG</MenuItem>
                  <MenuItem value="BHARATH 19KG">BHARATH 19KG</MenuItem>
                  <MenuItem value="HP 5KG">HP 5KG</MenuItem>
                  <MenuItem value="HP 19KG">HP 19KG</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Box position="relative">
                <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
                  Sign In
                </Button>
                {loading && (
                  <CircularProgress
                    size={24}
                    sx={{
                      color: 'primary.main',
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      marginTop: '-12px',
                      marginLeft: '-12px',
                    }}
                  />
                )}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography align="center">
                Don't have an account? <Link to="/signup">Sign Up</Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}

export default SignIn;
