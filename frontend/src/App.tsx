import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Index from './pages';
import SearchData from 'pages/search-data';
import Data from 'pages/search-data/[data_id]';
import CreateData from 'pages/create-data';
import { useDispatch } from 'react-redux';
import { setAccount } from 'smart-contracts/slice';
import Cookies from 'js-cookie';
import Dashboard from 'pages/dashboard';
import { Menu } from 'features/ui';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAccount(Cookies.get('account')));
  }, []);

  return (
    <>
      <Menu />
      <Routes>
        <Route index element={<Index />}></Route>
        <Route path="search-data">
          <Route index element={<SearchData />}></Route>
          <Route path=":data_id" element={<Data />}></Route>
        </Route>
        <Route path="create-data" element={<CreateData />}></Route>
        <Route path="dashboard" element={<Dashboard />}></Route>
      </Routes>
    </>
  );
}

export default App;
