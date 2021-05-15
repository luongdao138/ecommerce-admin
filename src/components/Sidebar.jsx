import {
  List,
  Paper,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';

const Sidebar = () => {
  return (
    <Paper
      variant='outlined'
      style={{
        minHeight: '100vh',
        borderRadius: '0',
        paddingTop: '73px',
        position: 'fixed',
        top: 0,
        bottom: 0,
      }}
    >
      <List component='nav' aria-label='main mailbox folders'>
        <ListItem
          button
          component={Link}
          to='/'
          style={{ paddingRight: '94px' }}
        >
          <ListItemIcon>
            <HomeIcon color='primary' />
          </ListItemIcon>
          <ListItemText primary='Home' />
        </ListItem>
        <Divider />
        <ListItem button component={Link} to='/page'>
          <ListItemIcon>
            <MenuIcon color='primary' />
          </ListItemIcon>
          <ListItemText primary='Page' />
        </ListItem>
        <Divider />
        <ListItem button component={Link} to='/categories'>
          <ListItemIcon>
            <MenuIcon color='primary' />
          </ListItemIcon>
          <ListItemText primary='Categories' />
        </ListItem>
        <Divider />
        <ListItem button component={Link} to='/products'>
          <ListItemIcon>
            <MenuIcon color='primary' />
          </ListItemIcon>
          <ListItemText primary='Products' />
        </ListItem>
        <Divider />
        <ListItem button component={Link} to='/banners'>
          <ListItemIcon>
            <MenuIcon color='primary' />
          </ListItemIcon>
          <ListItemText primary='Banners' />
        </ListItem>
      </List>
    </Paper>
  );
};

export default Sidebar;
