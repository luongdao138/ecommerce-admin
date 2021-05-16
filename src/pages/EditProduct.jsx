import React, { useEffect, useState } from 'react';
import Layout from '../helpers/Layout';
import { useRouteMatch } from 'react-router-dom';
import AddSpecification from '../components/AddSpecification';
import { getProductBySlug } from '../services/product';
import { Grid, Button } from '@material-ui/core';
import AddHightlight from '../components/AddHightlight';
import EditDetail from '../components/EditProductDetail';
import { useDispatch } from 'react-redux';
import { updateProducts } from '../redux/actions/product';
import { ToastContainer } from 'react-toastify';

const EditProduct = () => {
  const routeMatch = useRouteMatch();
  const { slug } = routeMatch.params;
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);

  const [specifications, setSpecifications] = useState(null);
  const [hightlights, setHightlights] = useState(null);

  useEffect(() => {
    getProductBySlug(slug)
      .then((res) => {
        setProduct(res.data.product);
        setSpecifications(res.data.product.specifications);
        setHightlights(res.data.product.hightlights);
      })
      .catch((error) => console.log(error));
  }, [slug]);

  const handleUpdate = () => {
    const newProduct = {
      ...product,
      specifications,
      hightlights,
    };
    dispatch(updateProducts(newProduct));
    // console.log(newProduct);
  };

  if (!product) return <p>Loading...</p>;

  return (
    <Layout>
      <ToastContainer autoClose={2000} />
      <Grid container style={{ padding: '20px 20px', boxSizing: 'border-box' }}>
        <Grid item xs={12}>
          <EditDetail product={product} setProduct={setProduct} />
        </Grid>
        <Grid item xs={7}>
          <AddSpecification
            specifications={specifications}
            setSpecifications={setSpecifications}
          />
        </Grid>
        <Grid item xs={5}>
          <AddHightlight
            hightlights={hightlights}
            setHightlights={setHightlights}
          />
        </Grid>
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'flex-end',
            marginTop: '32px',
            marginBottom: '12px',
          }}
        >
          <Button
            variant='outlined'
            type='button'
            style={{ marginRight: '12px' }}
          >
            Cancel
          </Button>
          <Button variant='outlined' color='primary' onClick={handleUpdate}>
            Submit
          </Button>
        </div>
      </Grid>
    </Layout>
  );
};

export default EditProduct;
