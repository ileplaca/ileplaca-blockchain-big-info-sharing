import { DatasSearchInput } from 'features/datas';
import React, { FC } from 'react';

const SearchData: FC = () => {
  return (
    <main className="flex flex-col w-full h-screen justify-center gap-4 items-center">
      <h1 className="text-4xl font-medium">Search your data by ID</h1>
      <DatasSearchInput />
    </main>
  );
};

export default SearchData;
