import { useState } from 'react';

export const useForm = (initState, cb) => {
  const [values, setValues] = useState(initState);
  const [error, setError] = useState(null);

  const handleChange = ({ target: { name, value } }) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    cb();
  };

  const resetForm = () => {
    setValues(initState);
  };

  return {
    values,
    error,
    setError,
    handleChange,
    handleSubmit,
    resetForm,
  };
};
