import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardActions, Button, CircularProgress, Box } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Order.css'; // Import the CSS file

function Order() {
  const location = useLocation();
  const navigate = useNavigate();
  const userData = location.state?.userData;
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    if (!userData) {
      navigate('/signin'); // Redirect to sign-in if userData is not available
    } else {
      const fetchBookings = async () => {
        try {
          const response = await axios.get(`https://vercel-fastapi-rouge.vercel.app/bookings/${userData.username}`);
          setBookings(response.data);
          setLoading(false); // Set loading to false after bookings are fetched
        } catch (error) {
          console.error('Error fetching bookings:', error);
          setLoading(false); // Set loading to false even if there's an error
        }
      };
      fetchBookings();
    }
  }, [userData, navigate]);

  if (!userData) {
    return null; // Render nothing if userData is not available
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        My Orders
      </Typography>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {bookings.map((booking) => (
            <Grid item xs={12} sm={6} md={4} key={booking.id}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6">Product: {booking.GasTheySelected}</Typography>
                  <Typography variant="body1">Address: {booking.address}</Typography>
                  <Typography variant="body1">Mobile Number: {booking.mobile_number}</Typography>
                  <Typography variant="body1">Alternate Mobile Number: {booking.alternate_mobile_number}</Typography>
                  <Typography variant="body1">Date and Time: {booking.booking_datetime}</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary" onClick={() => navigate('/products', { state: { userData } })}>
                    Back to Products
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default Order;
