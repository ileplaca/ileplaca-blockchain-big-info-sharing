import React, { FC } from 'react';
import { Data, DataWithPassword } from 'smart-contracts/big-data-sharing/types';
import DataItem from '../data-item';

export interface DataListProps {
  datas: DataWithPassword[]
}

const DataList: FC<DataListProps> = ({ datas }) => {
  if (datas.length === 0) {
    return <>You don't have any datas</>
  }

  return (
    <>
      { datas.map(data => (
        <DataItem key={data[0][1]} data={data} />
      )) }
    </>
  )
}

export default DataList;