import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { OuterPage } from './components/OuterPage';
import AuthContextProvider from './context/auth.context';
import Landing from './features/misc/routes/Landing';
import UserLibrary from './features/misc/routes/UserLibrary/UserLibrary';
import PrivateRoutes from './hooks/PrivateRouters';
import { LoginPage, HomePage } from './pages';

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/users" element={<OuterPage />}>
            <Route path="library/:username" element={<UserLibrary />} />
          </Route>
        </Route>
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
