import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import Modal from '../common/Modal';
import AddPageForm from '../components/AddPageForm';
import Layout from '../helpers/Layout';

const NewPage = () => {
  const [open, setOpen] = useState(false);

  return (
    <Layout>
      <Button
        color='secondary'
        variant='contained'
        style={{
          color: '#fff',
          position: 'fixed',
          bottom: '20px',
          right: '20px',
        }}
        onClick={() => setOpen(true)}
      >
        Add New Page
      </Button>
      <Modal
        open={open}
        handleClose={() => setOpen(false)}
        title='Add new page'
      >
        <AddPageForm handleClose={() => setOpen(false)} />
      </Modal>
    </Layout>
  );
};

export default NewPage;
