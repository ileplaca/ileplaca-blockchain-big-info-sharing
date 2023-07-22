import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { bigDataSharingActions } from 'smart-contracts/big-data-sharing/actions';
import { DatasPasswordCheckerFormProps } from './datas-password-check-form';

const useDatasPasswordCheckForm = ({ setData }: DatasPasswordCheckerFormProps) => {
  const { data_id } = useParams();

  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDataSet, setIsDataSet] = useState(false);

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isDataSet) {
      return;
    }

    setLoading(true);

    try {
      const data = await bigDataSharingActions.getDataById(data_id as unknown as string, value);
      console.log("🚀 ~ file: use-datas-password-check-form.ts:25 ~ handleOnSubmit ~ data:", data)
      setData(data);
      setIsDataSet(true);
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
