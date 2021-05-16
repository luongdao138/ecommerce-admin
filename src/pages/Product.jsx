import {
  Button,
  Table,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
  makeStyles,
  Paper,
  TableHead,
  TablePagination,
  IconButton,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Layout from '../helpers/Layout';
import Modal from '../common/Modal';
import AddProductForm from '../components/AddProductForm';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/actions/product';
import ProductDetail from '../components/ProductDetail';
import DetailsIcon from '@material-ui/icons/Details';
import EditIcon from '@material-ui/icons/Edit';
import { useHistory } from 'react-router-dom';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
    '& thead th': {
      fontWeight: '600',
      color: theme.palette.primary.main,
      backgroundColor: '#eaedff',
    },
    '& tbody tr': {
      fontWeight: '300',
    },
    '& tbody tr:hover': {
      backgroundColor: '#fffbf2',
      cursor: 'pointer',
    },
  },
}));

const Product = () => {
  const [open, setOpen] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const imageUrl = 'http://localhost:5000/uploads/products/';
  const list = useSelector((state) => state.product.data.list);
  const total = useSelector((state) => state.product.data.total);
  const [product, setProduct] = useState(null);
  const history = useHistory();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(1);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const refreshProducts = () => {
    setPage(0);
    dispatch(
      getProducts({
        sortBy: 'createdAt',
        limit: rowsPerPage,
        skip: 0,
      })
    );
  };

  useEffect(() => {
    dispatch(
      getProducts({
        sortBy: 'createdAt',
        limit: rowsPerPage,
        skip: Number(Number(page) * Number(rowsPerPage)),
      })
    );
  }, [rowsPerPage, page, dispatch]);

  return (
    <Layout>
      <div
        style={{
          padding: '24px',
        }}
      >
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align='center'>Image</TableCell>
                <TableCell align='center'>Price</TableCell>
                <TableCell align='center'>Quantity</TableCell>
                <TableCell align='center'>Category</TableCell>
                <TableCell align='left'>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list &&
                list.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell component='th' scope='row'>
                      {product.title}
                    </TableCell>
                    <TableCell align='right'>
                      {product.images?.length > 0 && (
                        <img
                          style={{
                            width: '60px',
                            height: '90px',
                            objectFit: 'contain',
                          }}
                          src={`${imageUrl}${product?.images[0]}`}
                          alt=''
                        />
                      )}
                    </TableCell>
                    <TableCell align='right'>{product.price}</TableCell>
                    <TableCell align='right'>{product.quantity}</TableCell>
                    <TableCell align='right'>{product.category.name}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => {
                          setProduct(product);
                          setOpenDetail(true);
                        }}
                      >
                        <DetailsIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          history.push(`/products/edit/${product.slug}`);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          history.push(`/products/photos/${product.slug}`);
                        }}
                      >
                        <PhotoLibraryIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            margin: '24px 0',
          }}
        >
          <TablePagination
            component='div'
            count={total}
            rowsPerPageOptions={[1, 2, 3]}
            page={page}
            onChangePage={handleChangePage}
            rowsPerPage={rowsPerPage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </div>
      </div>
      <Modal open={open} handleClose={handleClose} title='Add Product Form'>
        <AddProductForm
          handleClose={handleClose}
          refreshProducts={refreshProducts}
        />
      </Modal>
      <Modal
        open={openDetail}
        handleClose={() => {
          setOpenDetail(false);
        }}
        title='Product Detail'
      >
        <ProductDetail
          product={product}
          handleClose={() => {
            setOpenDetail(false);
          }}
        />
      </Modal>
      <Button
        color='secondary'
        variant='contained'
        style={{
          color: '#fff',
          position: 'fixed',
          bottom: '20px',
          right: '20px',
        }}
        onClick={handleOpen}
      >
        Add Product
      </Button>
    </Layout>
  );
};

export default Product;
