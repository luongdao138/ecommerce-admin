import { Paper, Button, IconButton, TextField } from '@material-ui/core';
import React from 'react';
import './style.css';
import RemoveIcon from '@material-ui/icons/Remove';

const AddHightlight = ({ hightlights, setHightlights }) => {
  const handleAddHightlight = () => {
    setHightlights((old) => [...old, '']);
  };

  const handleChangeHightlight = (index, e) => {
    setHightlights((old) =>
      old.map((x, _index) => (index === _index ? e.target.value : x))
    );
  };

  const handleRemoveHightlight = (index) => {
    const newHightlights = [...hightlights];
    newHightlights.splice(index, 1);
    setHightlights(newHightlights);
  };

  return (
    <Paper style={{ padding: '20px' }}>
      {hightlights && (
        <form>
          <h3>Edit Product Hightlights</h3>
          {hightlights.map((hightlight, index) => (
            <div key={index} className='spec__parent'>
              <TextField
                label='Enter value'
                value={hightlight}
                onChange={(e) => handleChangeHightlight(index, e)}
              />
              <IconButton
                style={{ marginTop: '10px', marginLeft: '10px' }}
                onClick={() => handleRemoveHightlight(index)}
              >
                <RemoveIcon />
              </IconButton>
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
              color='secondary'
              variant='contained'
              onClick={handleAddHightlight}
            >
              {' '}
              Add more hightlight{' '}
            </Button>
          </div>
        </form>
      )}
    </Paper>
  );
};

export default AddHightlight;
