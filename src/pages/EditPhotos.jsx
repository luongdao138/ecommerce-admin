import React, { useEffect, useState } from 'react';
import Layout from '../helpers/Layout';
import { useRouteMatch } from 'react-router-dom';
import { getProductBySlug } from '../services/product';
import { IconButton, Button, Paper, TextField } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  uploadPhotos,
  updatePhoto,
  deletePhoto,
} from '../redux/actions/product';
import { toast } from 'react-toastify';

const EditPhotos = () => {
  const routeMatch = useRouteMatch();
  const { slug } = routeMatch.params;
  const dispatch = useDispatch();
  const [images, setImages] = useState(null);
  const rootImageUrl = 'http://localhost:5000/uploads/products/';
  const [addImages, setAddImages] = useState(null);
  const [updateImage, setUpdateImage] = useState(null);

  useEffect(() => {
    getProductBySlug(slug)
      .then((res) => {
        console.log('res', res);
        setImages(res.data.product.images);
      })
      .catch((error) => console.log(error));
  }, [slug]);

  const handleAddImages = () => {
    let formData = new FormData();
    if (images) {
      for (let image of addImages) {
        formData.append('image', image);
      }
    }

    dispatch(
      uploadPhotos(slug, formData, (data) => {
        console.log('data', data);
        setImages((old) => [...old, ...data]);
      })
    );
  };

  const handleUpdatePhoto = (index, image) => {
    if (!updateImage || index !== updateImage.index) {
      return toast.error('Please select the image!');
    } else {
      let formData = new FormData();
      formData.append('filename', image);
      formData.append('image', updateImage.file);
      dispatch(
        updatePhoto(slug, formData, (data) => {
          setImages(data);
        })
      );
    }
  };

  const handleDeletePhoto = (image) => {
    if (window.confirm('Are you sure to delete this image ?')) {
      dispatch(
        deletePhoto(slug, image, (data) => {
          setImages(data);
        })
      );
    }
  };

  if (!images) return <p>Loading...</p>;

  return (
    <Layout>
      <ToastContainer autoClose={2000} />
      <Paper style={{ padding: 20 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '40px',
          }}
        >
          <form>
            <TextField
              type='file'
              inputProps={{
                multiple: true,
              }}
              className='update'
              onChange={(e) => setAddImages(e.target.files)}
              variant='outlined'
            />
            <Button
              variant='contained'
              color='primary'
              type='button'
              style={{
                textTransform: 'none',
                color: '#fff',
                marginLeft: '20px',
              }}
              disabled={!addImages}
              onClick={handleAddImages}
            >
              Add Photos
            </Button>
          </form>
        </div>
        <div>
          {images?.map((image, index) => {
            return (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '15px',
                }}
              >
                <img
                  style={{
                    maxWidth: '200px',
                    maxHeight: '200px',
                    objectFit: 'cover',
                  }}
                  src={`${rootImageUrl}${image}`}
                  alt=''
                />
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '20px',
                  }}
                >
                  <TextField
                    type='file'
                    variant='outlined'
                    onChange={(e) =>
                      setUpdateImage({ file: e.target.files[0], index })
                    }
                  />
                  <Button
                    variant='contained'
                    color='secondary'
                    onClick={() => handleUpdatePhoto(index, image)}
                    style={{
                      textTransform: 'none',
                      color: '#fff',
                      marginLeft: '20px',
                    }}
                  >
                    Update
                  </Button>
                </div>
                <IconButton
                  style={{ color: 'red' }}
                  onClick={() => handleDeletePhoto(image)}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            );
          })}
        </div>
      </Paper>
    </Layout>
  );
};

export default EditPhotos;
