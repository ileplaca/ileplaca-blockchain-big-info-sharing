import { DatasSearchInput } from 'features/datas';
import React, { FC } from 'react';

const SearchData: FC = () => {
  return (
    <main className="flex flex-col items-center w-full gap-4 p-2 mt-24">
      <h1 className="text-4xl font-medium">Search your data by ID</h1>
      <DatasSearchInput />
    </main>
  );
};

export default SearchData;
