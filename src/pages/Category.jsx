import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  IconButton,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../helpers/Layout';
import { addCategory } from '../redux/actions/category';
import { useForm } from '../hooks/useForm';
import { ToastContainer } from 'react-toastify';
import { createCategoriesList } from '../helpers/createCategories';
import AllCategories from '../components/AllCategories';

const initState = {
  name: '',
  parentId: '',
  description: '',
  image: null,
};

const Category = () => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.category.list);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    resetForm();
    setOpen(false);
  };

  const submit = () => {
    let formData = new FormData();
    formData.append('name', values.name);
    formData.append('description', values.description);
    formData.append('parentId', values.parentId);
    formData.append('image', values.image);

    dispatch(
      addCategory(formData, () => {
        resetForm();
        handleClose();
      })
    );
  };

  const { values, handleSubmit, resetForm, handleChange } = useForm(
    initState,
    submit
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <Layout>
      <ToastContainer autoClose={2000} />

      <AllCategories list={list} handleClickOpen={handleClickOpen} />
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth='lg'
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Add Category Form</DialogTitle>
        <form
          style={{
            width: '400px',
            margin: 'auto',
          }}
          onSubmit={handleSubmit}
        >
          <DialogContent>
            <TextField
              autoFocus
              margin='dense'
              name='name'
              label='Category name'
              type='text'
              fullWidth
              onChange={handleChange}
              value={values.name}
              style={{ marginBottom: '16px' }}
            />
            <TextField
              margin='dense'
              name='description'
              label='Category description'
              type='text'
              fullWidth
              multiline
              rows={3}
              onChange={handleChange}
              value={values.description}
              style={{ marginBottom: '16px' }}
            />
            <TextField
              margin='dense'
              type='file'
              fullWidth
              onChange={(e) =>
                handleChange({
                  target: {
                    name: 'image',
                    value: e.target.files[0],
                  },
                })
              }
              style={{ marginBottom: '16px' }}
            />
            <FormControl fullWidth style={{ marginBottom: '16px' }}>
              <InputLabel id='demo-simple-select-label'>
                Parent Category
              </InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                name='parentId'
                value={values.parentId}
                onChange={handleChange}
              >
                {list &&
                  createCategoriesList(list)?.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button type='button' onClick={handleClose} color='primary'>
              Cancel
            </Button>
            <Button type='submit' color='primary'>
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Layout>
  );
};

export default Category;
