import { Route, Routes } from "react-router-dom";

import { Dashboard } from "./components/Dashboard";
import AuthContextProvider from "./context/auth.context";
import LoginPage from "./features/Login";
import {
  Landing,
  LibraryPage,
  SearchPage,
  BookmarkPage,
  UserLibrary,
  NotFound,
  BookPage,
} from "./features/misc/routes";
import PrivateRoutes from "./hooks/PrivateRouters";

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<Dashboard />}>
          <Route path="/book/:id" element={<BookPage />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/home" element={<UserLibrary />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/bookmarks" element={<BookmarkPage />} />
          </Route>
          <Route path="/search" element={<SearchPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
