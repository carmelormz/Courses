import { useState } from 'react';

export const useInput = (initialValue, validationFn) => {
  const [value, setValue] = useState(initialValue);
  const [didEdit, setDidEdit] = useState(false);

  const valueIsValid = validationFn(value);

  const handleInputChange = (e) => {
    setValue(e.target.value);
    setDidEdit(false);
  };

  const handleInputBlur = () => {
    setDidEdit(true);
  };

  return {
    value,
    handleInputChange,
    handleInputBlur,
    hasError: didEdit && !valueIsValid,
  };
};
