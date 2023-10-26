import { CreateDataForm } from 'features/datas';
import React, { FC } from 'react';

const CreateData: FC = () => {
  return (
    <main className="flex justify-center w-full mt-24">
      <CreateDataForm />
    </main>
  );
};

export default CreateData;
