import React, { FC } from 'react';
import useDatasSearchForm from './use-datas-search-form';

const DatasSearchInput: FC = () => {
  const { setValue, handleOnSubmit } = useDatasSearchForm();

  return (
    <form onSubmit={(e) => handleOnSubmit(e)}>
      <input
        onChange={(e) => setValue(e.target.value)}
        type="number"
        placeholder="Data id"
        className="form-input"
      />
      <button className="button ml-4">Search</button>
    </form>
  );
};

export default DatasSearchInput;
