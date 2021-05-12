import React from 'react';
import { TextField, Button, Paper, Typography } from '@material-ui/core';
import { useForm } from '../hooks/useForm';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions/auth';
import { ToastContainer } from 'react-toastify';

const initState = {
  email: '',
  password: '',
};
const Login = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  const submit = () => {
    dispatch(login(values));
  };
  const { values, handleChange, handleSubmit } = useForm(initState, submit);

  return (
    <Paper
      variant='outlined'
      style={{ padding: '24px', width: '40%', margin: '120px auto' }}
    >
      <ToastContainer autoClose={2500} />
      <form onSubmit={handleSubmit}>
        <Typography align='center' variant='h5' style={{ fontWeight: '500' }}>
          Login Form
        </Typography>

        <TextField
          fullWidth
          label='Email'
          value={values.email}
          onChange={handleChange}
          style={{ marginBottom: '32px' }}
          name='email'
        />
        <TextField
          fullWidth
          label='Password'
          value={values.password}
          type='password'
          onChange={handleChange}
          style={{ marginBottom: '32px' }}
          name='password'
        />

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant='subtitle2'>
            Dont't have account?{' '}
            <Link to='/register' style={{ textDecoration: 'none' }}>
              Register
            </Link>{' '}
            here
          </Typography>
          <Button
            type='submit'
            variant='contained'
            color='secondary'
            style={{ color: '#fff' }}
            disabled={loading}
          >
            Submit
          </Button>
        </div>
      </form>
    </Paper>
  );
};

export default Login;
