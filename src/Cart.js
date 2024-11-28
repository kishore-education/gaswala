import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Card, CardContent, CardMedia, Grid, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Cart() {
  const [cartProducts, setCartProducts] = useState([]);
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('userData'));

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartProducts(storedCart);
  }, []);

  const handleRemoveFromCart = (productId) => {
    const updatedCart = cartProducts.filter(product => product.id !== productId);
    setCartProducts(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleBooking = async (product) => {
    if (!userData) {
      alert('User data is not available. Please sign in again.');
      navigate('/signin');
      return;
    }

    const bookingData = {
      username: userData.username,
      name: userData.name,
      mobile_number: userData.mobile_number,
      address: userData.address,
      gas_name: userData.gas_name,
      alternate_mobile_number: userData.alternate_mobile_number,
      GasTheySelected: product.name,
      booking_datetime: new Date().toLocaleString(), // Capture local date and time
      geolocation: null
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        bookingData.geolocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        try {
          console.log("Booking data being sent:", bookingData); // Log the booking data
          const response = await axios.post('https://vercel-fastapi-rouge.vercel.app/book', bookingData);
          alert(response.data.message);
          navigate('/order', { state: { userData } }); // Navigate to order page
        } catch (error) {
          console.error('Error creating booking:', error);
          alert('Error creating booking');
        }
      }, (error) => {
        console.error('Error getting geolocation:', error);
        alert('Error getting geolocation');
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="cart">
      <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => navigate('/products')}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Cart
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Typography variant="h4" gutterBottom>
          My Cart
        </Typography>
        {cartProducts.length === 0 ? (
          <Typography variant="h6">Your cart is empty</Typography>
        ) : (
          <Grid container spacing={3}>
            {cartProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={product.image}
                    alt={product.name}
                  />
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ₹{product.price}
                    </Typography>
                    <Button variant="contained" color="secondary" onClick={() => handleRemoveFromCart(product.id)}>
                      Remove
                    </Button>
                    <Button variant="contained" color="primary" onClick={() => handleBooking(product)} style={{ marginTop: '10px' }}>
                      Book Now
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
        <Button variant="contained" color="primary" onClick={() => navigate('/products')} style={{ marginTop: '20px' }}>
          Back to Products
        </Button>
      </Container>
    </div>
  );
}

export default Cart;