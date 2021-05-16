import {
  Paper,
  Button,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Grid,
} from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { createCategoriesList } from '../../helpers/createCategories';

const EditDetail = ({ product, setProduct }) => {
  const categoryList = useSelector((state) => state.category.list);
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Paper style={{ padding: 20, marginBottom: 10 }}>
      <h3>Edit detail</h3>
      {product && (
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              autoFocus
              margin='dense'
              name='title'
              label='Product title'
              type='text'
              fullWidth
              value={product.title}
              onChange={handleChange}
              style={{ marginBottom: '16px' }}
            />
            <TextField
              margin='dense'
              name='description'
              label='Product description'
              value={product.description}
              onChange={handleChange}
              type='text'
              fullWidth
              multiline
              rows={6}
              style={{ marginBottom: '16px' }}
            />
            <TextField
              margin='dense'
              name='price'
              label='Product price'
              type='number'
              fullWidth
              onChange={(e) =>
                handleChange({
                  target: {
                    name: 'price',
                    value: Number(e.target.value),
                  },
                })
              }
              value={product.price}
              style={{ marginBottom: '16px' }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin='dense'
              name='discountPrice'
              label='Discount price'
              type='number'
              fullWidth
              onChange={(e) =>
                handleChange({
                  target: {
                    name: 'discountPrice',
                    value: Number(e.target.value),
                  },
                })
              }
              value={product.discountPrice}
              style={{ marginBottom: '16px' }}
            />
            <TextField
              margin='dense'
              name='quantity'
              label='Product quantity'
              type='number'
              fullWidth
              onChange={(e) =>
                handleChange({
                  target: {
                    name: 'quantity',
                    value: Number(e.target.value),
                  },
                })
              }
              value={product.quantity}
              style={{ marginBottom: '38px' }}
            />
            <FormControl fullWidth style={{ marginBottom: '16px' }}>
              <InputLabel id='demo-simple-select-label'>
                Product category
              </InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                name='category'
                value={product.category}
                onChange={handleChange}
              >
                {categoryList &&
                  createCategoriesList(categoryList)?.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      )}
    </Paper>
  );
};

export default EditDetail;
