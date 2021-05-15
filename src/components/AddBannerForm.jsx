import React from 'react';
import {
  TextField,
  InputLabel,
  Checkbox,
  Button,
  FormControlLabel,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import {
  createBanner,
  updateBanner as updateBannerAction,
} from '../redux/actions/banner';
import { useForm } from '../hooks/useForm';

const initState = {
  image: null,
  status: false,
  navigateTo: '',
};

const AddBannerForm = ({ handleClose, updateBanner }) => {
  const dispatch = useDispatch();
  const submit = () => {
    let formData = new FormData();
    formData.append('image', values.image);
    formData.append('status', values.status);
    formData.append('navigateTo', values.navigateTo);
    if (!updateBanner) {
      dispatch(createBanner(formData, handleClose));
    } else {
      dispatch(updateBannerAction(updateBanner._id, formData, handleClose));
    }
  };

  const { values, handleChange, handleSubmit } = useForm(
    updateBanner
      ? {
          navigateTo: updateBanner.navigateTo,
          status: updateBanner.status,
          image: null,
        }
      : initState,
    submit
  );
  return (
    <div style={{ width: '40vw' }}>
      <form onSubmit={handleSubmit}>
        <InputLabel>Banner Image</InputLabel>
        <TextField
          type='file'
          fullWidth
          style={{ marginBottom: updateBanner ? '0' : '32px' }}
          onChange={(e) => {
            handleChange({
              target: {
                name: 'image',
                value: e.target.files[0],
              },
            });
          }}
        />
        {updateBanner && (
          <img
            style={{ margin: '10px 0 32px 0', width: '200px' }}
            src={`http://localhost:5000/uploads/banners/${updateBanner.image}`}
            alt=''
          />
        )}
        <TextField
          fullWidth
          type='text'
          style={{ marginBottom: '24px' }}
          label='Navigate to'
          name='navigateTo'
          value={values.navigateTo}
          onChange={handleChange}
        />
        <FormControlLabel
          style={{ marginBottom: '24px' }}
          control={
            <Checkbox
              checked={values.status}
              onChange={(e) =>
                handleChange({
                  target: {
                    name: 'status',
                    value: e.target.checked,
                  },
                })
              }
            />
          }
          label='Status'
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginBottom: '12px',
          }}
        >
          <Button
            type='button'
            variant='contained'
            style={{
              color: '#fff',
              textTransform: 'none',
              marginRight: '5px',
            }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            type='submit'
            color='primary'
            variant='contained'
            style={{
              color: '#fff',
              textTransform: 'none',
            }}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddBannerForm;
