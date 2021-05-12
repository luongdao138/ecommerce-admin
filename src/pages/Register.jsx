import React from 'react';
import { Grid, TextField, Button, Paper, Typography } from '@material-ui/core';
import { useForm } from '../hooks/useForm';
import { Link, useHistory } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { register } from '../redux/actions/auth';

const initState = {
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  password: '',
};
const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const submit = () => {
    dispatch(
      register(values, () => {
        history.push('/login');
      })
    );
  };
  const { values, handleChange, handleSubmit } = useForm(initState, submit);

  return (
    <Paper
      variant='outlined'
      style={{ padding: '24px', width: '60%', margin: '120px auto' }}
    >
      <ToastContainer autoClose={2500} />
      <form onSubmit={handleSubmit}>
        <Typography align='center' variant='h5' style={{ fontWeight: '500' }}>
          Register Form
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label='First name'
              value={values.firstName}
              onChange={handleChange}
              style={{ marginBottom: '32px' }}
              name='firstName'
            />
            <TextField
              fullWidth
              label='Last name'
              value={values.lastName}
              onChange={handleChange}
              style={{ marginBottom: '32px' }}
              name='lastName'
            />
            <TextField
              fullWidth
              label='Username'
              value={values.username}
              onChange={handleChange}
              style={{ marginBottom: '32px' }}
              name='username'
            />
          </Grid>
          <Grid item xs={6}>
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
          </Grid>
        </Grid>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant='subtitle2'>
            Already have an account?{' '}
            <Link to='/login' style={{ textDecoration: 'none' }}>
              Login
            </Link>{' '}
            here
          </Typography>
          <Button
            type='submit'
            variant='contained'
            color='secondary'
            style={{ color: '#fff' }}
          >
            Submit
          </Button>
        </div>
      </form>
    </Paper>
  );
};

export default Register;
