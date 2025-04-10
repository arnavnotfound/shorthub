import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const RegisterBox: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Sign-up failed');
      }

      // Clear the form or redirect upon success
      alert('Sign-up successful!');

      onClose();
    //   window.location.reload();

    
    } catch (error) {
      setError('Sign-up failed, please try again.');
    }
  };

  return (
    <Box
      className="flex justify-center items-center min-h-[50vw] sm:min-h-[20vw]"
      sx={{
        maxWidth: '400px',
        margin: '0 auto',
        padding: 4,
        backgroundColor: '#fff',
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <form onSubmit={handleSubmit} className="w-full">
        <div className='flex flex-row gap-20 relative'>
        <Typography variant="h5" gutterBottom>Create an Account</Typography>
        <CloseIcon fontSize='large'  className = 'absolute right-0 top-0'onClick={onClose}></CloseIcon>


        </div>
        
        {/* Error Message */}
        {error && <Typography color="error" variant="body2" gutterBottom>{error}</Typography>}

        <TextField
          label="Username"
          fullWidth
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          margin="normal"
        />
        {/* <TextField
          label="Email"
          type="email"
          fullWidth
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        /> */}
        <TextField
          label="Password"
          type="password"
          fullWidth
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Confirm Password"
          type="password"
          fullWidth
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          margin="normal"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
        >
          Register
        </Button>
        
        
        
      </form>
    </Box>
  );
};

export default RegisterBox;
