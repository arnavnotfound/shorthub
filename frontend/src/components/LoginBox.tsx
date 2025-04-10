import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField } from '@mui/material';
import RegisterBox from './RegisterBox';

const LoginForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  
  const handleRegisterSuccess = () => {
    setShowRegisterForm(false);
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:5001/api/login', {
        username,
        password,
      });

      // Assuming you get a JWT token on successful login
      localStorage.setItem('token', response.data.access_token);
      onClose(); // Close the form upon successful login
    } catch (error) {
      setError('Invalid credentials. Please try again.');
    }
  };

  const handleRegister = () => {

    setShowRegisterForm(!showRegisterForm);
    setShowLoginForm(false);

  }
  
  return (
    <>
    
    <div  className="fixed inset-0 flex justify-center items-center z-50">


    {showLoginForm?
        <div className="bg-white p-6 border-black rounded-lg shadow-lg w-96">
          
        <h2 className="text-2xl text-black mb-4">Login</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}


        <form className='flex flex-col gap-2' onSubmit={handleLogin}>
        <TextField
          required
          id="outlined-required"
          placeholder='Username'
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          required
          id="outlined-required"
          placeholder='Password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" onClick={handleLogin} type='submit' onSubmit={handleLogin}>Submit</Button>
        <Button variant="outlined"onClick={onClose}>Close</Button>
        <Button variant="text" onClick={handleRegister}>Create an account?</Button>
        </form> 
        </div>
            : <></>}

      {showRegisterForm? <RegisterBox onClose={handleRegisterSuccess}/> : <></>}


      </div>

    </>
  );
};

export default LoginForm;


