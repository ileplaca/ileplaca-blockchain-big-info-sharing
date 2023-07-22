import { DataList } from 'features/datas';
import React, { FC, useEffect } from 'react';
import { useQuery } from 'react-query'
import { bigDataSharingActions } from 'smart-contracts/big-data-sharing/actions';


const Dashboard: FC = () => {
  const { data } = useQuery("owner-datas", bigDataSharingActions.getOwnerDatas, { cacheTime: 0 });

  if (!data) return <>Loading...</>

  return (
    <main>
      <h1 className='mt-24 text-4xl font-semibold text-center'>
        Datas assigned to this wallet
      </h1>
      <section className='flex flex-col items-center justify-center gap-4 px-4 mt-10'>
        <DataList datas={data} />
      </section>
    </main>
  )
}

export default Dashboard;