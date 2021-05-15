import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../helpers/Layout';
import {
  deleteBanner as deleteBannerAction,
  getBanners,
  updateBanner as updateBannerAction,
} from '../redux/actions/banner';
import {
  Table,
  TableContainer,
  Paper,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  IconButton,
  Button,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Modal from '../common/Modal';
import AddBannerForm from '../components/AddBannerForm';
import { ToastContainer } from 'react-toastify';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const Banner = () => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.banner.list);
  const bannerUrl = 'http://localhost:5000/uploads/banners/';
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [updateBanner, setUpdateBanner] = useState(null);
  const [deleteBanner, setDeleteBanner] = useState(null);

  useEffect(() => {
    if (!list) {
      console.log('list', list);
      dispatch(getBanners());
    }
  }, [dispatch]);

  const handleDelete = () => {
    dispatch(deleteBannerAction(deleteBanner._id, () => setOpenConfirm(false)));
  };

  const handleChangeStatus = (banner) => {
    dispatch(
      updateBannerAction(
        banner._id,
        {
          navigateTo: banner.navigateTo,
          status: !banner.status,
          image: null,
        },
        () => {}
      )
    );
  };

  return (
    <Layout>
      <ToastContainer autoClose={2500} />
      <div
        style={{
          padding: '20px',
        }}
      >
        <IconButton
          color='primary'
          style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
          }}
          onClick={() => {
            setUpdateBanner(null);
            setOpen(true);
          }}
        >
          <AddIcon fontSize='large' />
        </IconButton>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Navigate to</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align='inherit'>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list &&
                list.map((banner) => (
                  <TableRow key={banner._id}>
                    <TableCell>
                      <img
                        style={{
                          width: '300px',
                          objectFit: 'contain',
                          maxHeight: '200px',
                        }}
                        src={`${bannerUrl}${banner.image}`}
                        alt=''
                      />
                    </TableCell>
                    <TableCell>
                      <a
                        style={{ color: '#333' }}
                        href={`${banner.navigateTo}`}
                      >
                        {banner.navigateTo}
                      </a>
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        checked={banner.status}
                        onChange={() => handleChangeStatus(banner)}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        color='secondary'
                        onClick={() => {
                          setUpdateBanner(banner);
                          setOpen(true);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        style={{ color: 'red' }}
                        onClick={() => {
                          setDeleteBanner(banner);
                          setOpenConfirm(true);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Modal
          handleClose={() => setOpen(false)}
          open={open}
          title={updateBanner ? 'Update Banner Form' : 'Add Banner Form'}
        >
          <AddBannerForm
            updateBanner={updateBanner}
            handleClose={() => setOpen(false)}
          />
        </Modal>
        <Modal
          open={openConfirm}
          handleClose={() => setOpenConfirm(false)}
          title='Continue delete this banner ?'
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              margin: '10px',
              width: '40vw',
            }}
          >
            <Button
              variant='contained'
              color='default'
              style={{ textTransform: 'none', color: '#fff', margin: '5px' }}
              onClick={() => setOpenConfirm(false)}
            >
              Cancel
            </Button>
            <Button
              variant='contained'
              color='primary'
              style={{ textTransform: 'none', color: '#fff', margin: '5px' }}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        </Modal>
      </div>
    </Layout>
  );
};

export default Banner;
