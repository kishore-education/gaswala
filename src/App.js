import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Products from './Products';
import Order from './Order'; // Ensure this path is correct
import Accessories from './Accessories';
import NewConnection from './NewConnection';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/signin" />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/products" element={<Products />} />
          <Route path="/order" element={<Order />} /> {/* Ensure this path is correct */}
          <Route path="/accessories" element={<Accessories />} />
          <Route path="/newconnection" element={<NewConnection />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
