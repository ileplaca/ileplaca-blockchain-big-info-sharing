import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Index from './pages';
import SearchData from 'pages/search-data';
import Data from 'pages/search-data/[data_id]';
import CreateData from 'pages/create-data';
import { useDispatch } from 'react-redux';
import { setAccount } from 'smart-contracts/slice';
import Cookies from 'js-cookie';
import Dashboard from 'pages/dashboard';
import { Header } from 'features/ui';
import { ethereum } from 'smart-contracts';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setAccount(Cookies.get('account')));

    ethereum.on('accountsChanged', function (accounts: string[]) {
      Cookies.set('account', accounts[0]);
      dispatch(setAccount(accounts[0]));
      navigate(0);
    });
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route index element={<Index />}></Route>
        <Route path="search-data">
          <Route index element={<SearchData />}></Route>
          <Route path=":data_id" element={<Data />}></Route>
          <Route path=":data_id/:password" element={<Data />}></Route>
        </Route>
        <Route path="create-data" element={<CreateData />}></Route>
        <Route path="dashboard" element={<Dashboard />}></Route>
      </Routes>
    </>
  );
}

export default App;
