import {
  Button,
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  makeStyles,
} from '@material-ui/core';
import React, { useState } from 'react';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Modal from '../common/Modal';
import {
  createCategoriesList,
  getAllDescendantsOfOneNode,
  findNodeById,
} from '../helpers/createCategories';
import { useDispatch } from 'react-redux';
import {
  getAllCategories,
  updateCategory,
  deleteCategories,
} from '../redux/actions/category';

const useStyles = makeStyles((theme) => ({
  button: {
    textTransform: 'none',
    color: '#fff',
    marginRight: '12px',
  },
}));

const AllCategories = ({ list, handleClickOpen }) => {
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();

  const [updateArray, setUpdateArray] = useState([]);

  const handleCheck = (checked, targetNode) => {
    setChecked(checked);
    console.log(checked);
    const { value, checked: isChecked } = targetNode;
    const category = findNodeById(value, list);
    const descendants = getAllDescendantsOfOneNode(category);
    if (isChecked) {
      let old = updateArray;
      for (let cat of descendants) {
        const category = old.find((x) => x.value === cat.value);
        if (!category) {
          old = [...old, cat];
        }
      }
      setUpdateArray(old);
    } else {
      let old = updateArray;
      for (let cat of descendants) {
        old = old.filter((x) => x.value !== cat.value);
      }
      setUpdateArray(old);
    }
  };

  const renderCategories = (categories) => {
    const result = [];
    for (let category of categories) {
      result.push({
        label: category.name,
        value: category._id,
        children:
          category.children.length > 0 && renderCategories(category.children),
      });
    }

    return result;
  };

  const handleCategoryChange = (name, value, index) => {
    const newUpdateArray = updateArray.map((cat, _index) =>
      index === _index
        ? {
            ...cat,
            [name]: value,
          }
        : cat
    );
    setUpdateArray(newUpdateArray);
  };

  const handleUpdateCategories = () => {
    let formData = new FormData();

    updateArray.forEach((cat) => {
      formData.append('_id', cat.value);
      formData.append('name', cat.name);
      formData.append('parentId', cat.parentId);
      formData.append('type', cat.type);
      // formData.append('image', cat.image ? cat.image : '');
    });

    dispatch(
      updateCategory(formData, () => {
        dispatch(getAllCategories());
        setOpenUpdate(false);
      })
    );
  };

  const handleDeleteCategories = () => {
    const ids = updateArray.map((x) => x.value);
    dispatch(
      deleteCategories(ids, () => {
        dispatch(getAllCategories());
        setOpenDelete(false);
        setUpdateArray([]);
      })
    );
  };

  return (
    <div style={{ padding: '24px' }}>
      {list && (
        <CheckboxTree
          nodes={renderCategories(list)}
          checked={checked}
          expanded={expanded}
          onCheck={handleCheck}
          onExpand={(expanded) => setExpanded(expanded)}
          icons={{
            check: <CheckBoxIcon />,
            uncheck: <CheckBoxOutlineBlankIcon />,
            halfCheck: <CheckBoxOutlineBlankIcon />,
            expandClose: <ChevronRightIcon />,
            expandOpen: <ExpandMoreIcon />,
          }}
        />
      )}
      <Button
        color='secondary'
        variant='contained'
        style={{
          color: '#fff',
          position: 'fixed',
          bottom: '20px',
          right: '20px',
        }}
        onClick={handleClickOpen}
      >
        Add Category
      </Button>
      <div style={{ marginTop: '12px' }}>
        <Button
          variant='contained'
          color='secondary'
          className={classes.button}
          onClick={() => {
            if (updateArray.length === 0)
              return alert('You have not chosen any categories yet!');
            setOpenUpdate(true);
          }}
        >
          Update
        </Button>
        <Button
          variant='contained'
          className={classes.button}
          style={{
            background: 'red',
          }}
          onClick={() => {
            if (updateArray.length === 0)
              return alert('You have not chosen any categories yet!');
            setOpenDelete(true);
          }}
        >
          Delete
        </Button>
      </div>
      <Modal
        title='Update Category'
        open={openUpdate}
        handleClose={() => setOpenUpdate(false)}
      >
        <div style={{ width: '80vw' }}>
          <Grid container spacing={2}>
            {updateArray.map((cat, index) => (
              <Grid key={index} item container spacing={2} xs={12}>
                <Grid item xs={3}>
                  <TextField
                    name='name'
                    label='Category name'
                    type='text'
                    value={cat.name}
                    fullWidth
                    onChange={(e) =>
                      handleCategoryChange(e.target.name, e.target.value, index)
                    }
                  />
                </Grid>
                <Grid item xs={3}>
                  <FormControl fullWidth>
                    <InputLabel id='demo-simple-select-label'>
                      Parent Category
                    </InputLabel>
                    <Select
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      name='parentId'
                      value={cat.parentId}
                      onChange={(e) =>
                        handleCategoryChange(
                          e.target.name,
                          e.target.value,
                          index
                        )
                      }
                    >
                      {list &&
                        createCategoriesList(list)?.map((item) => (
                          <MenuItem key={item.value} value={item.value}>
                            {item.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={3}>
                  <FormControl fullWidth>
                    <InputLabel id='demo-simple-select-label'>
                      Select type
                    </InputLabel>
                    <Select
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      name='type'
                      value={cat.type}
                      onChange={(e) =>
                        handleCategoryChange(
                          e.target.name,
                          e.target.value,
                          index
                        )
                      }
                    >
                      <MenuItem value='store'>Store</MenuItem>
                      <MenuItem value='product'>Product</MenuItem>
                      <MenuItem value='page'>Page</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    type='file'
                    fullWidth
                    style={{ paddingTop: '16px' }}
                    onChange={(e) =>
                      handleCategoryChange('image', e.target.files[0], index)
                    }
                  />
                </Grid>
              </Grid>
            ))}
          </Grid>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: '12px',
            }}
          >
            <Button
              color='default'
              variant='contained'
              onClick={() => setOpenUpdate(false)}
              style={{
                textTransform: 'none',
                color: '#fff',
                margin: '6px',
              }}
            >
              Cancel
            </Button>
            <Button
              color='primary'
              variant='contained'
              style={{
                textTransform: 'none',
                color: '#fff',
                margin: '6px',
              }}
              onClick={handleUpdateCategories}
            >
              Save changes
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        open={openDelete}
        handleClose={() => setOpenDelete(false)}
        title='Are you sure to delete all these categories?'
      >
        <div style={{ width: '60vw' }}>
          {updateArray.map((cat) => {
            return (
              <Typography key={cat.value} variant='h6'>
                {cat.name}
              </Typography>
            );
          })}
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: '12px',
            }}
          >
            <Button
              color='default'
              variant='contained'
              onClick={() => setOpenDelete(false)}
              style={{
                textTransform: 'none',
                color: '#fff',
                margin: '6px',
              }}
            >
              Cancel
            </Button>
            <Button
              color='primary'
              variant='contained'
              style={{
                textTransform: 'none',
                color: '#fff',
                margin: '6px',
              }}
              onClick={handleDeleteCategories}
            >
              Continue delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AllCategories;
