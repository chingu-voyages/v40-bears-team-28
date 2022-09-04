import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Dashboard } from './components/Dashboard';
import AuthContextProvider from './context/auth.context';
import Landing from './features/misc/routes/Landing';
import Search from './features/misc/routes/Search/Search';
import UserLibrary from './features/misc/routes/UserLibrary/UserLibrary';
import PrivateRoutes from './hooks/PrivateRouters';
import { LoginPage, HomePage } from './pages';

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<Dashboard />}>
          <Route element={<PrivateRoutes />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/library" element={<UserLibrary />} />
          </Route>
          <Route path="/search" element={<Search />} />
        </Route>
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
