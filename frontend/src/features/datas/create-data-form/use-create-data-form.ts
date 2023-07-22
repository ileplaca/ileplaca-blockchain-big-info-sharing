import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CreateDataFormDto } from './create-data-form.config';
import { bigDataSharingActions } from 'smart-contracts/big-data-sharing/actions';
import { generatePassword } from 'utils/helpers/password';

const useCreateDataForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue
  } = useForm();

  const [loading, setLoading] = useState(false);

  const currentDatetime = new Date();
  const year = currentDatetime.getFullYear();
  const month = String(currentDatetime.getMonth() + 1).padStart(2, '0');
  const day = String(currentDatetime.getDate()).padStart(2, '0');
  const hours = String(currentDatetime.getHours()).padStart(2, '0');
  const minutes = String(currentDatetime.getMinutes()).padStart(2, '0');
  const formattedDatetime = `${year}-${month}-${day}T${hours}:${minutes}`;

  const [currentValues, setCurrentValues] = useState<CreateDataFormDto>({
    name: '',
    content: '',
    expiration_date: new Date(),
    password: '',
  });

  const onSubmit = async (data: CreateDataFormDto) => {
    setLoading(true)

    try {
      await bigDataSharingActions.addData(data.expiration_date !== '' ? Number(new Date(data.expiration_date)) : 0, data.name, data.content, data.password)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  };

  const generateAndCopyPassword = () => {
    const generatedPassword = generatePassword();
    navigator.clipboard.writeText(generatedPassword);
    setValue("password", generatedPassword);
  }

  useEffect(() => {
    const subscription = watch((value) =>
      setCurrentValues(value as CreateDataFormDto)
    );
    return () => subscription.unsubscribe();
  }, [watch]);

  return {
    register,
    handleSubmit,
    currentValues,
    onSubmit,
    loading,
    formattedDatetime,
    generateAndCopyPassword
  };
};

export default useCreateDataForm;
