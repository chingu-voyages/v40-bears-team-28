import { Route, Routes } from "react-router-dom";

import { Dashboard } from "./components/Dashboard";
import AuthContextProvider from "./context/auth.context";
import { Landing } from "./features/misc/routes/Landing";
import UserLibrary from "./features/misc/routes/UserLibrary/UserLibrary";
import PrivateRoutes from "./hooks/PrivateRouters";
import { LoginPage } from "./pages";

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/users" element={<Dashboard />}>
            <Route path="library/:username" element={<UserLibrary />} />
          </Route>
        </Route>
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
