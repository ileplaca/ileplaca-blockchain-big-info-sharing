import React, { FC, useState } from 'react';
import { Data, DataWithPassword } from 'smart-contracts/big-data-sharing/types';
import { parseDateFns } from 'utils/helpers/date-fns';
import { motion } from 'framer-motion'

export interface DataItemProps {
  data: DataWithPassword
}

const DataItem: FC<DataItemProps> = ({ data }) => {
  const [owner_address, id, created_at, expiration_date, name] = data[0];
  const password = data[1];

  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
  }

  return (
    <div className='w-full p-4 border border-gray-600 lg:w-3/4 rounded-button'>
      <h2 className='text-3xl font-medium'>ID {Number(id)}</h2>
      <h3 className='text-sm font-light'>{owner_address}</h3>
      <h4>{parseDateFns(created_at)}</h4>
      <h5>{expiration_date}</h5>
      <h6 className='text-xl'>{name}</h6>
      <div className='flex items-center gap-4'>
        <button className='button' onClick={() => setIsPasswordShown(!isPasswordShown)}>
          Toggle password
        </button>
        {isPasswordShown && (
          <motion.div 
            whileTap={{
              rotate: [0, 10, 0],
              borderColor: 'green'
            }} onClick={copyPassword} className='px-4 py-2 mt-4 duration-75 border cursor-pointer hover:opacity-90 rounded-button'>
            {password}
          </motion.div>
        )}
        </div>
    </div>
  )
}

export default DataItem;