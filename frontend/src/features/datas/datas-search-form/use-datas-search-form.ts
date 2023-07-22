import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useDatasSearchForm = () => {
  const navigate = useNavigate();

  const [value, setValue] = useState('');

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`${value}`);
  };

  return {
    setValue,
    handleOnSubmit,
  };
};

export default useDatasSearchForm;
