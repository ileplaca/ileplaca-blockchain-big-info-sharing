import React, { FC } from 'react';
import useDatasPasswordCheckForm from './use-datas-password-check-form';
import { Data, DataWithPassword } from 'smart-contracts/big-data-sharing/types';

export interface DatasPasswordCheckerFormProps {
  setData: React.Dispatch<React.SetStateAction<DataWithPassword | null>>;
}

const DatasPasswordCheckForm: FC<DatasPasswordCheckerFormProps> = ({ setData }) => {
  const { loading, error, isDataSet, setValue, handleOnSubmit } = useDatasPasswordCheckForm({
    setData,
  });

  return (
    <div>
      <form onSubmit={(e) => handleOnSubmit(e)}>
        <input
          disabled={loading}
          onChange={(e) => setValue(e.target.value)}
          type="password"
          placeholder="Password to data"
          className={`form-input ${loading || isDataSet ? 'cursor-not-allowed' : ''}`}
        />
        <button
          disabled={loading || isDataSet}
          className={`ml-4 button w-28 ${loading || isDataSet ? 'cursor-not-allowed' : ''}`}
        >
          {!loading ? 'Check' : 'Loading...'}
        </button>
      </form>
      <span className="text-sm text-red-500">{error}</span>
    </div>
  );
};

export default DatasPasswordCheckForm;
