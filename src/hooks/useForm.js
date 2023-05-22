import { useState } from 'react';

const useForm = (initialState) => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const input = e.target;
    
    setErrors({
      ...errors,
      [input.name]: input.validationMessage,
    })

    setForm({
      ...form,
      [input.name]: input.value,
    });
  };

  return { form, errors, handleChange};
}

export default useForm;