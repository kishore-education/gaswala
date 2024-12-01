
import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography } from '@mui/material';

const AlterPrice = () => {
  const [productId, setProductId] = useState('');
  const [newPrice, setNewPrice] = useState('');

  const handleAlterPrice = async () => {
    try {
      await axios.put(`https://vercel-fastapi-rouge.vercel.app/products/${productId}`, { price: newPrice });
      alert('Price updated successfully!');
    } catch (error) {
      console.error('Error updating price:', error);
      alert('Error updating price. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm"></Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Alter Product Price
      </Typography>
      <TextField
        label="Product ID"