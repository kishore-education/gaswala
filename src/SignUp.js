import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Grid, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { Link } from 'react-router-dom';

function SignUp() {
    const [formData, setFormData] = useState({
        username: '',
        name: '',
        mobile_number: '',
        address: '',
        gas_name: '',
        alternate_mobile_number: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('https://vercel-fastapi-rouge.vercel.app/signup', formData);
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Error: ' + error.response.data.detail);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Sign Up
            </Typography>
            {message && <Typography color="error">{message}</Typography>}
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            label="Username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
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
                        <TextField
                            label="Address"
                            name="address"
                            value={formData.address}
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
                        <TextField
                            label="Alternate Mobile Number"
                            name="alternate_mobile_number"
                            value={formData.alternate_mobile_number}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Sign Up
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography align="center">
                            Already have an account? <Link to="/signin">Sign In</Link>
                        </Typography>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}

export default SignUp;
