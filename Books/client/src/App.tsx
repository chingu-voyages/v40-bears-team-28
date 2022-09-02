import React from 'react';
import './styles/main.css';
import AuthContextProvider from './context/auth.context';
import { Route, Routes } from 'react-router-dom';
import { LoginPage, HomePage, BookPage } from './pages';
import PrivateRoutes from './hooks/PrivateRouters';

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/book/:id' element={<BookPage />} />
        <Route element={<PrivateRoutes />}>
          <Route path='/home' element={<HomePage />} />
        </Route>
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
