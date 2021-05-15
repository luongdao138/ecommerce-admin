import { CssBaseline } from '@material-ui/core';
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Appbar from './components/Appbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { useDispatch, useSelector } from 'react-redux';
import PrivateRoute from './helpers/PrivateRoute.jsx';
import LoggedInRoute from './helpers/LoggedInRoute.jsx';
import { useEffect } from 'react';
import { loadUser, removeLoading } from './redux/actions/auth';
import Category from './pages/Category';
import Product from './pages/Product';
import { getAllCategories } from './redux/actions/category';
import NewPage from './pages/NewPage';
import Banner from './pages/Banner';

function App() {
  const authenticated = useSelector((state) => state.auth.authenticated);
  const loading = useSelector((state) => state.auth.loading);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.category.list);

  useEffect(() => {
    if (token) {
      dispatch(loadUser(token));
    } else {
      dispatch(removeLoading());
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (!categoryList && authenticated) {
      dispatch(getAllCategories());
    }
  }, [authenticated, dispatch]);

  return (
    <>
      <Router>
        <Appbar />
        <Switch>
          <PrivateRoute
            path='/'
            exact
            authenticated={authenticated}
            loading={loading}
          >
            <Home />
          </PrivateRoute>
          {/* <Route path='/categories' component={Category} /> */}
          <PrivateRoute
            path='/categories'
            exact
            authenticated={authenticated}
            loading={loading}
          >
            <Category />
          </PrivateRoute>
          <PrivateRoute
            path='/page'
            exact
            authenticated={authenticated}
            loading={loading}
          >
            <NewPage />
          </PrivateRoute>
          <PrivateRoute
            path='/products'
            exact
            authenticated={authenticated}
            loading={loading}
          >
            <Product />
          </PrivateRoute>
          <PrivateRoute
            path='/banners'
            authenticated={authenticated}
            loading={loading}
          >
            <Banner />
          </PrivateRoute>
          <LoggedInRoute
            path='/login'
            loggedInPath='/'
            authenticated={authenticated}
          >
            <Login />
          </LoggedInRoute>
          <LoggedInRoute
            path='/register'
            loggedInPath='/'
            authenticated={authenticated}
          >
            <Register />
          </LoggedInRoute>
        </Switch>
      </Router>
      <CssBaseline />
    </>
  );
}

export default App;
