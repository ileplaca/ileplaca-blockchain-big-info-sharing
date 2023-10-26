import React, { FC } from 'react';
import useCreateDataForm from './use-create-data-form';

const CreateDataForm: FC = () => {
  const {
    register,
    handleSubmit,
    currentValues,
    onSubmit,
    formattedDatetime,
    generateAndCopyPassword,
    loading,
  } = useCreateDataForm();

  return (
    <form className="w-full px-4 lg:w-2/3" onSubmit={handleSubmit(onSubmit as any)}>
      <h1 className="text-5xl font-bold">Create data</h1>
      <div className="form-input-block">
        <label htmlFor="" className="form-label">
          Name {`(${currentValues.name.length}/250)`}
        </label>
        <input required maxLength={250} type="text" className="form-input" {...register('name')} />
      </div>

      <div className="form-input-block">
        <label htmlFor="" className="form-label">
          Content {`(${currentValues.content.length}/100000)`}
        </label>
        <textarea
          required
          maxLength={100000}
          className="h-96 form-input"
          {...register('content')}
        />
      </div>

      <div className="form-input-block">
        <label htmlFor="" className="form-label">
          Expiration date{'(Optional)'}
        </label>
        <input
          min={formattedDatetime}
          type="datetime-local"
          className="w-96 form-input"
          {...register('expiration_date')}
        />
      </div>

      <div className="form-input-block">
        <label htmlFor="" className="form-label">
          Password {`(${currentValues.password.length}/100)`}
        </label>
        <input
          required
          maxLength={100}
          type="password"
          className=" form-input"
          {...register('password')}
        />
        <div
          onClick={generateAndCopyPassword}
          className="w-56 mt-2 text-sm text-center cursor-pointer button-approve"
        >
          Generate and copy password
        </div>
      </div>

      <button className={`button bg-primary ${loading ? 'opacity-75' : ''}`} type="submit">
        Create data
      </button>
    </form>
  );
};

export default CreateDataForm;
