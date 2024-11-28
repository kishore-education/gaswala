import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Button, CircularProgress } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useLocation, useNavigate } from 'react-router-dom';
import anime from 'animejs/lib/anime.es.js';
import './Products.css';

function Accessories() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const userData = location.state?.userData || JSON.parse(localStorage.getItem('userData'));

  const fetchProducts = async () => {
    setLoading(true); // Set loading to true before fetching products
    try {
      const response = await axios.get('https://vercel-fastapi-rouge.vercel.app/accessories');
      setProducts(response.data);
      setLoading(false); // Set loading to false after products are fetched
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false); // Set loading to false even if there's an error
    }
  };

  useEffect(() => {
    if (!userData) {
      navigate('/signin'); // Redirect to sign-in if userData is not available
    } else {
      console.log("User data:", userData); // Log the user data
      fetchProducts();
    }
  }, [userData, navigate, fetchProducts]); // Include fetchProducts in the dependency array

  const handleBooking = async (product) => {
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

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigateToOrders = () => {
    navigate('/order', { state: { userData } });
    handleMenuClose();
  };

  const handleNavigateToProducts = () => {
    navigate('/products', { state: { userData } });
    handleMenuClose();
  };

  const handleNavigateToNewConnection = () => {
    navigate('/newconnection', { state: { userData } });
    handleMenuClose();
  };

  useEffect(() => {
    const buttons = document.querySelectorAll('.bottom-navbar button:not(.float)');
    // Remove the unused container variable
    let y = 0;
    let moveY = 0;
    let open = false;
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    setTimeout(function () {
      window.scrollTo(0, 1);
    }, 0);
    window.addEventListener('touchstart', (evt) => {
      const area = window.innerHeight - evt.touches[0].clientY;
      y = area;
      console.log(y);
    });
    window.addEventListener('touchend', (evt) => {
      y = 0;
      console.log(moveY);
      if (moveY > (window.innerHeight / 4)) {
        anime({
          targets: '.container',
          translateY: `-${window.innerHeight / 2}px`,
          duration: 600,
        });
        open = true;
      } else {
        anime({
          targets: '.container',
          translateY: `0px`,
          duration: 600,
          easing: 'easeOutExpo'
        });
        open = false;
      }
    });
    window.addEventListener('touchmove', (evt) => {
      moveY = (window.innerHeight - y) - evt.touches[0].clientY;
      console.log(y);
      if (!open) {
        anime({
          targets: '.container',
          translateY: `${moveY <= window.innerHeight / 2 ? moveY > 0 ? -moveY : 0 : -window.innerHeight / 2}px`,
          duration: 200,
        });
      } else if (open) {
        moveY = moveY + window.innerHeight / 2;
        anime({
          targets: '.container',
          translateY: `${moveY <= window.innerHeight / 2 ? moveY > 0 ? -moveY : 0 : -window.innerHeight / 2}px`,
          duration: 200,
        });
      }
    });
    buttons.forEach((item) => {
      item.addEventListener('click', (evt) => {
        const x = evt.target.offsetLeft;
        buttons.forEach((btn) => { btn.classList.remove('active'); });
        evt.target.classList.add('active');
        anime({
          targets: '.effect',
          left: `${x}px`,
          duration: 600,
        });
      });
    });
  }, []);

  if (!userData) {
    return null; // Render nothing if userData is not available
  }

  return (
    <div className="products">
      <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuOpen}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Accessories
          </Typography>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleNavigateToOrders}>My Orders</MenuItem>
        <MenuItem onClick={handleNavigateToProducts}>Products</MenuItem>
        <MenuItem onClick={handleNavigateToNewConnection}>New Connection</MenuItem>
      </Menu>
      {loading ? (
        <div className="loading-container">
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className="button-container">
            <button className="modern-button" onClick={handleNavigateToProducts}>Products</button>
            <button className="modern-button" onClick={handleNavigateToNewConnection}>New Connection</button>
          </div>
          <Typography variant="h4" gutterBottom>
            Accessories
          </Typography>
          {products.map((product) => (
            <div className="product" key={product.id}>
              <img src={product.image} alt={product.name} />
              <h1>{product.name}</h1>
              <div className="price">₹{product.price}</div>
              <Button variant="contained" className="booking-button" onClick={() => handleBooking(product)}>
                Book Now
              </Button>
            </div>
          ))}
        </>
      )}
      <footer className="footer">
        <p>POWERED BY KISHORE STORES <a href="tel:9894073441">MOBILE NUMBER: 9894073441</a></p>
      </footer>
    </div>
  );
}

export default Accessories;
