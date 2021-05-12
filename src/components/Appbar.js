import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Avatar, CssBaseline, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { logout } from '../redux/actions/auth';
import { useHistory } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appbar: {
    zIndex: theme.zIndex.drawer + 1,
    padding: '5px 15px',
    color: '#fff',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Appbar() {
  const classes = useStyles();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position='fixed' className={classes.appbar}>
        <Toolbar>
          {user ? (
            <>
              <IconButton
                onClick={() => history.push('/')}
                edge='start'
                className={classes.menuButton}
                color='inherit'
                aria-label='menu'
              >
                <HomeIcon />
              </IconButton>
              <Typography variant='h5' className={classes.title}>
                Admin Dashboard
              </Typography>
            </>
          ) : (
            <div style={{ flexGrow: 1 }}></div>
          )}
          {!user && (
            <>
              <Button
                variant='text'
                style={{ color: '#fff' }}
                onClick={() => history.push('/login')}
              >
                Login
              </Button>
              <Button
                variant='text'
                style={{ color: '#fff' }}
                onClick={() => history.push('/register')}
              >
                Register
              </Button>
            </>
          )}
          {user && (
            <>
              <Avatar
                src={user?.avatar ? user?.avatar : '/images/no-img.png'}
                alt='avatar'
              />
              <Typography style={{ margin: '0 12px' }} variant='subtitle1'>
                Welcome{' '}
                <span style={{ fontWeight: '600' }}>{user?.username}</span>
              </Typography>
              <IconButton
                style={{ color: '#fff' }}
                onClick={() => {
                  localStorage.removeItem('token');
                  dispatch(logout());
                }}
              >
                <ExitToAppIcon />
              </IconButton>
            </>
          )}
        </Toolbar>
      </AppBar>
      {/* <div style={{ height: '74px' }}></div> */}
    </div>
  );
}
