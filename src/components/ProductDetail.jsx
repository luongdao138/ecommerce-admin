import {
  Divider,
  Grid,
  Typography,
  Button,
  DialogActions,
} from '@material-ui/core';
import React from 'react';

const ProductDetail = ({ product, handleClose }) => {
  const imageUrl = 'http://localhost:5000/uploads/products/';
  return (
    <div
      style={{
        width: '60vw',
        margin: 'auto',
      }}
    >
      <Divider />
      <Grid
        style={{
          paddingTop: '24px',
        }}
        container
        spacing={2}
      >
        <Grid item container xs={12}>
          <Grid item xs={8}>
            <Typography variant='subtitle1' style={{ fontWeight: '500' }}>
              Name
            </Typography>
            <Typography variant='body2'>{product?.title}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant='subtitle1' style={{ fontWeight: '500' }}>
              Price
            </Typography>
            <Typography variant='body2'>${product?.price}</Typography>
          </Grid>
        </Grid>
        <Grid item container xs={12}>
          <Grid item xs={6}>
            <Typography variant='subtitle1' style={{ fontWeight: '500' }}>
              Category
            </Typography>
            <Typography variant='body2'>{product?.category.name}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant='subtitle1' style={{ fontWeight: '500' }}>
              Quantity
            </Typography>
            <Typography variant='body2'>{product?.quantity}</Typography>
          </Grid>
        </Grid>
        <Grid item container xs={12}>
          <Grid item xs={6}>
            <Typography variant='subtitle1' style={{ fontWeight: '500' }}>
              Views
            </Typography>
            <Typography variant='body2'>{product?.views}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant='subtitle1' style={{ fontWeight: '500' }}>
              Sold
            </Typography>
            <Typography variant='body2'>{product?.sold}</Typography>
          </Grid>
        </Grid>
        <Grid item container xs={12}>
          <Typography
            component='div'
            variant='subtitle1'
            style={{ fontWeight: '500', width: '100%' }}
          >
            Description
          </Typography>
          <Typography variant='body2'>{product?.description}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            component='div'
            variant='subtitle1'
            style={{ fontWeight: '500' }}
          >
            Product images
          </Typography>
          <div style={{ marginTop: '12px' }}>
            {product?.images.map((image, index) => (
              <img
                key={index}
                style={{
                  width: '100px',
                  height: '80px',
                  objectFit: 'contain',
                }}
                src={`${imageUrl}${image}`}
              />
            ))}
          </div>
        </Grid>
      </Grid>
      <DialogActions>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '20px',
          }}
        >
          <Button onClick={handleClose}>Cancel</Button>
        </div>
      </DialogActions>
    </div>
  );
};

export default ProductDetail;
