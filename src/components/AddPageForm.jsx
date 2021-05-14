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
import { createCategoriesList } from '../helpers/createCategories';
import { ToastContainer } from 'react-toastify';
import { createPage } from '../redux/actions/page';

const initState = {
  title: '',
  description: '',
  category: '',
  banners: null,
  products: null,
};

const AddPageForm = ({ handleClose }) => {
  const dispatch = useDispatch();
  const submit = () => {
    let formData = new FormData();
    if (values['banners']) {
      for (let file of values.banners) {
        formData.append('banners', file);
      }
    }
    if (values['products']) {
      for (let file of values.products) {
        formData.append('products', file);
      }
    }
    formData.append('title', values['title']);
    formData.append('description', values['description']);
    formData.append('category', values['category']);

    if (values.category) {
      const cat = createCategoriesList(categoryList).find(
        (x) => x.value === values.category
      );

      formData.append('type', cat.type);
    }

    dispatch(
      createPage(formData, () => {
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
              label='Page title'
              type='text'
              fullWidth
              onChange={handleChange}
              value={values.title}
              style={{ marginBottom: '16px' }}
            />
            <InputLabel>Banners</InputLabel>
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
                    name: 'banners',
                    value: e.target.files,
                  },
                })
              }
              style={{ marginBottom: '38px' }}
            />
            <InputLabel>Products</InputLabel>
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
                    name: 'products',
                    value: e.target.files,
                  },
                })
              }
              style={{ marginBottom: '38px' }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin='dense'
              name='description'
              label='Page description'
              type='text'
              fullWidth
              multiline
              rows={6}
              onChange={handleChange}
              value={values.description}
              style={{ marginBottom: '16px' }}
            />
            <FormControl fullWidth style={{ marginBottom: '16px' }}>
              <InputLabel id='demo-simple-select-label'>
                Select category
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

export default AddPageForm;
