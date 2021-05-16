import React from 'react';
import { Button, TextField, IconButton, Paper } from '@material-ui/core';
import './style.css';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';

const AddSpecification = ({ specifications, setSpecifications }) => {
  const handleChangeParent = (index, e) => {
    setSpecifications((old) =>
      old.map((x, _index) =>
        _index === index
          ? {
              ...x,
              [e.target.name]: e.target.value,
            }
          : x
      )
    );
  };

  const handleChangeChildren = (indexParent, indexChilden, e) => {
    const newSpecifications = [...specifications];
    const parent = newSpecifications[indexParent];
    parent.values[indexChilden] = {
      ...parent.values[indexChilden],
      [e.target.name]: e.target.value,
    };
    setSpecifications(newSpecifications);
  };

  const handleAddChildren = (index) => {
    const newSpecifications = [...specifications];
    newSpecifications[index].values.push({
      label: '',
      value: '',
    });
    setSpecifications(newSpecifications);
  };
  const handleRemoveChildren = (indexParent, indexChilden) => {
    const newSpecifications = [...specifications];
    const parent = newSpecifications[indexParent];
    parent.values.splice(indexChilden, 1);
    setSpecifications(newSpecifications);
  };

  const handleAddParent = () => {
    const newSpecifications = [...specifications];
    newSpecifications.push({
      name: '',
      values: [],
    });
    setSpecifications(newSpecifications);
  };

  const handleRemoveParent = (index) => {
    const newSpecifications = [...specifications];
    newSpecifications.splice(index, 1);
    setSpecifications(newSpecifications);
  };

  return (
    <Paper className='add__spec_wrapper'>
      {specifications && (
        <form>
          <h3>Edit Product Specifications</h3>
          {specifications.map((spec, index) => (
            <div key={index} className='spec__parent'>
              <TextField
                label='Name'
                value={spec.name}
                name='name'
                onChange={(e) => handleChangeParent(index, e)}
              />
              <IconButton
                style={{ marginTop: '10px', marginLeft: '10px' }}
                onClick={() => handleRemoveParent(index)}
              >
                <RemoveIcon />
              </IconButton>
              <div className='spec__children'>
                {spec.values.map((child, _index) => (
                  <div className='spec__children__item' key={_index}>
                    <TextField
                      label='Label'
                      type='text'
                      name='label'
                      onChange={(e) => handleChangeChildren(index, _index, e)}
                      style={{ marginRight: '10px' }}
                      value={child.label}
                    />
                    <TextField
                      label='Value'
                      type='text'
                      name='value'
                      value={child.value}
                      onChange={(e) => handleChangeChildren(index, _index, e)}
                      style={{ marginRight: '10px', width: '300px' }}
                    />
                    <IconButton
                      style={{ marginTop: '10px' }}
                      onClick={() => handleRemoveChildren(index, _index)}
                    >
                      <RemoveIcon />
                    </IconButton>
                  </div>
                ))}
                <div className='float-right'>
                  <IconButton onClick={() => handleAddChildren(index)}>
                    <AddIcon />
                  </IconButton>
                </div>
              </div>
            </div>
          ))}
          <div>
            <Button
              style={{
                textTransform: 'none',
                color: '#fff',
                marginRight: 10,
              }}
              type='button'
              onClick={handleAddParent}
              color='secondary'
              variant='contained'
            >
              {' '}
              Add more spec{' '}
            </Button>
          </div>
        </form>
      )}
    </Paper>
  );
};

export default AddSpecification;
