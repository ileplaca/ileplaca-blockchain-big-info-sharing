import React, { FC } from 'react';
import { Data, DataWithContent } from 'smart-contracts/big-data-sharing/types';
import { parseDateFns } from 'utils/helpers/date-fns';

export interface DataViewProps {
  data: DataWithContent;
}

const DataView: FC<DataViewProps> = ({ data }) => {
  const [owner_address, id, created_at, expiration_date, name] = data[0];
  const content = data[1];

  return (
    <div className="w-screen px-6 mt-8 lg:px-10 xl:px-40 lg:mt-10 xl:mt-20">
      <h2 className="text-3xl font-bold">ID {Number(id)}</h2>
      <h3 className="text-sm font-light">{owner_address}</h3>
      <div className="mt-4 text-3xl font-medium">{name}</div>
      <div className="text-lg font-light">Created {parseDateFns(Number(created_at))}</div>
      <div>{Number(expiration_date) !== 0 ? parseDateFns(Number(expiration_date)) : null}</div>
      <div className="text-lg">{content}</div>
    </div>
  );
};

export default DataView;
