import {
  Button,
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  Divider,
} from '@material-ui/core';
import React, { useState } from 'react';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Modal from '../common/Modal';
import { createCategoriesList } from '../helpers/createCategories';
import { useDispatch } from 'react-redux';
import { getAllCategories, updateCategory } from '../redux/actions/category';

const AllCategories = ({ list, handleClickOpen }) => {
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const dispatch = useDispatch();

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

  const handleChangeExpandedAndChecked = () => {
    const linearCategories = createCategoriesList(list);
    const tempChecked = [];
    const tempExpanded = [];
    checked.length > 0 &&
      checked.forEach((id) => {
        const cat = linearCategories.find((x) => x.value === id);
        cat && tempChecked.push(cat);
      });
    expanded.length > 0 &&
      expanded.forEach((id) => {
        const cat = linearCategories.find((x) => x.value === id);
        cat && tempExpanded.push(cat);
      });

    setCheckedArray(tempChecked);
    setExpandedArray(tempExpanded);
  };

  const handleOpenUpdateModal = () => {
    setOpenUpdate(true);
    // console.log({ checked, expanded });
    handleChangeExpandedAndChecked();
  };

  const handleCategoryChange = (name, value, index, type) => {
    if (type === 'checked') {
      const newCheckedArray = checkedArray.map((cat, _index) =>
        index === _index
          ? {
              ...cat,
              [name]: value,
            }
          : cat
      );
      setCheckedArray(newCheckedArray);
    } else {
      const newExpandedArray = expandedArray.map((cat, _index) =>
        index === _index
          ? {
              ...cat,
              [name]: value,
            }
          : cat
      );
      setExpandedArray(newExpandedArray);
    }
  };

  const handleUpdateCategories = () => {
    let formData = new FormData();
    const array = [...checkedArray, ...expandedArray];
    array.forEach((cat) => {
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

  const handleOpenDeleteModal = () => {
    setOpenDelete(true);
    handleChangeExpandedAndChecked();
  };

  return (
    <div style={{ padding: '24px' }}>
      <Divider />
      {list && (
        <CheckboxTree
          nodes={renderCategories(list)}
          checked={checked}
          expanded={expanded}
          onCheck={(checked) => setChecked(checked)}
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
          style={{
            textTransform: 'none',
            color: '#fff',
            marginRight: '12px',
          }}
          onClick={handleOpenUpdateModal}
        >
          Update
        </Button>
        <Button
          variant='contained'
          style={{
            textTransform: 'none',
            color: '#fff',
            background: 'red',
          }}
          onClick={handleOpenDeleteModal}
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
          <Typography
            variant='subtitle2'
            style={{ marginBottom: '12px', fontSize: '16px' }}
          >
            Expanded categories
          </Typography>
          <Grid container spacing={2}>
            {expandedArray.map((cat, index) => (
              <Grid key={index} item container spacing={2} xs={12}>
                <Grid item xs={3}>
                  <TextField
                    name='name'
                    label='Category name'
                    type='text'
                    value={cat.name}
                    fullWidth
                    onChange={(e) =>
                      handleCategoryChange(
                        e.target.name,
                        e.target.value,
                        index,
                        'expanded'
                      )
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
                          index,
                          'expanded'
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
                          index,
                          'expanded'
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
                      handleCategoryChange(
                        'image',
                        e.target.files[0],
                        index,
                        'expanded'
                      )
                    }
                  />
                </Grid>
              </Grid>
            ))}
            <Typography
              variant='subtitle2'
              style={{
                margin: '12px 0 12px 8px',
                fontSize: '16px',
              }}
            >
              Checked categories
            </Typography>
            {checkedArray.map((cat, index) => (
              <Grid key={index} item container spacing={2} xs={12}>
                <Grid item xs={3}>
                  <TextField
                    name='name'
                    label='Category name'
                    type='text'
                    value={cat.name}
                    fullWidth
                    onChange={(e) =>
                      handleCategoryChange(
                        e.target.name,
                        e.target.value,
                        index,
                        'checked'
                      )
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
                          index,
                          'checked'
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
                          index,
                          'checked'
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
                      handleCategoryChange(
                        'image',
                        e.target.files[0],
                        index,
                        'checked'
                      )
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
          <Typography
            variant='subtitle2'
            style={{
              margin: '12px 0 12px 8px',
              fontSize: '16px',
            }}
          >
            Expanded categories
          </Typography>
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
