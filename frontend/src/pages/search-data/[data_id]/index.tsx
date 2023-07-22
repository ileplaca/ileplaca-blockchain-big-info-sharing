import { DataView, DatasPasswordCheckForm } from 'features/datas';
import React, { FC, useState } from 'react';
import { DataWithPassword } from 'smart-contracts/big-data-sharing/types';

const DataPage: FC = () => {
  const [data, setData] = useState<DataWithPassword | null>(null);

  return (
    <main className="flex flex-col items-center w-full gap-4 p-2 mt-20">
      <h1 className="flex flex-col text-4xl font-medium text-center">
        Enter the password assigned to this data.
        <span className="text-lg font-light">If you are owner you can just click check button</span>
      </h1>
      <DatasPasswordCheckForm setData={setData} />

      {data ? <DataView data={data} /> : 'Here will be data'}
    </main>
  );
};

export default DataPage;
