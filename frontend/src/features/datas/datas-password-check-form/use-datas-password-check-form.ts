import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { bigDataSharingActions } from 'smart-contracts/big-data-sharing/actions';
import { DatasPasswordCheckerFormProps } from './datas-password-check-form';

const useDatasPasswordCheckForm = ({ setData }: DatasPasswordCheckerFormProps) => {
  const { data_id, password } = useParams();

  const [value, setValue] = useState(password ?? '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDataSet, setIsDataSet] = useState(false);

  useEffect(() => {
    if (password) {
      handleOnSubmit();
    }
  }, []);

  const handleOnSubmit = async () => {
    if (isDataSet) {
      return;
    }

    setLoading(true);

    try {
      const data = await bigDataSharingActions.getDataById(data_id as unknown as string, value);
      setData(data);
      setIsDataSet(true);
      setError('');
    } catch (err) {
      setIsDataSet(false);
      console.log(err);
      setError('You pass wrong id/password');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    isDataSet,
    setValue,
    handleOnSubmit,
  };
};

export default useDatasPasswordCheckForm;
