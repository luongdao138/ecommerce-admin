import React from 'react';
import { Grid } from '@material-ui/core';
import Sidebar from '../components/Sidebar';

const Layout = ({ children }) => {
  return (
    <Grid container>
      <Grid item xs={2}>
        <Sidebar />
      </Grid>
      <Grid item xs={10}>
        <div style={{ height: '74px' }}></div>
        {children}
      </Grid>
    </Grid>
  );
};

export default Layout;
