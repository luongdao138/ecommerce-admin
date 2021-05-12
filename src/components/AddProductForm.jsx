import {
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Button,
  Grid,
} from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../hooks/useForm';
import { addProduct } from '../redux/actions/product';
import { createCategoriesList } from '../helpers/createCategories';
import { ToastContainer } from 'react-toastify';

const initState = {
  title: '',
  description: '',
  price: '',
  quantity: '',
  category: '',
  image: null,
};

const AddProductForm = ({ handleClose, refreshProducts }) => {
  const dispatch = useDispatch();
  const submit = () => {
    let formData = new FormData();
    // Object.keys(values).forEach((key) => {
    //   if (key === 'image') {
    //     for (let file of values[key]) {
    //       formData.append('image', file);
    //     }
    //   } else formData.append(key, values[key]);
    // });
    if (values['image']) {
      for (let file of values.image) {
        formData.append('image', file);
      }
    }
    formData.append('title', values['title']);
    formData.append('description', values['description']);
    formData.append('price', values['price']);
    formData.append('quantity', values['quantity']);
    formData.append('category', values['category']);

    dispatch(
      addProduct(formData, () => {
        refreshProducts();
        resetForm();
        handleClose();
      })
    );
  };

  const { values, resetForm, handleChange, handleSubmit } = useForm(
    initState,
    submit
  );
  const categoryList = useSelector((state) => state.category.list);

  return (
    <div style={{ width: '80vw', margin: 'auto' }}>
      <ToastContainer autoClose={2500} />
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              autoFocus
              margin='dense'
              name='title'
              label='Product title'
              type='text'
              fullWidth
              onChange={handleChange}
              value={values.title}
              style={{ marginBottom: '16px' }}
            />
            <TextField
              margin='dense'
              name='description'
              label='Product description'
              type='text'
              fullWidth
              multiline
              rows={6}
              onChange={handleChange}
              value={values.description}
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
              value={values.price}
              style={{ marginBottom: '16px' }}
            />
          </Grid>
          <Grid item xs={6}>
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
              value={values.quantity}
              style={{ marginBottom: '38px' }}
            />
            <TextField
              margin='dense'
              type='file'
              fullWidth
              inputProps={{
                multiple: true,
              }}
              onChange={(e) =>
                handleChange({
                  target: {
                    name: 'image',
                    value: e.target.files,
                  },
                })
              }
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
                value={values.category}
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
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '32px',
            marginBottom: '12px',
          }}
        >
          <Button
            variant='outlined'
            type='button'
            style={{ marginRight: '12px' }}
            onClick={() => {
              resetForm();
              handleClose();
            }}
          >
            Cancel
          </Button>
          <Button variant='outlined' type='submit' color='primary'>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
