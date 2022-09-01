import React from 'react';
import './styles/main.css';
import AuthContextProvider from './context/auth.context';
import { Route, Routes } from 'react-router-dom';
import { LoginPage, HomePage } from './pages';
import PrivateRoutes from './hooks/PrivateRouters';

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route element={<PrivateRoutes />}>
          <Route path='/home' element={<HomePage />} />
        </Route>
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
