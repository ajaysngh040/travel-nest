import "./styles.css";
import { Route, Routes } from "react-router-dom";
import IndexLayout from "./Layout/IndexLayout";
import IndexPage from "./pages/IndexPage";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import ProfilePage from "./pages/ProfilePage";
import Axios from "axios";
import { UserContextProvider } from "./context/UserContext";
import PlacesPage from "./pages/PlacesPage";
import PlacesFormPage from "./pages/PlacesFormPage";
import PlacePage from "./pages/PlacePage";
import BookingsPage from "./pages/BookingsPage";
import BookingPage from "./pages/BookingPage";

const isProduction = window.location.hostname === import.meta.env.VITE_PROD_URL;

Axios.defaults.baseURL =
  isProduction === true
    ? import.meta.env.VITE_PROD_URL
    : import.meta.env.VITE_DEV_URL;

Axios.defaults.withCredentials = true;

export default function App() {
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<IndexLayout />}>
            <Route index element={<IndexPage />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/account" element={<ProfilePage />} />
            <Route path="/account/places" element={<PlacesPage />} />
            <Route path="/account/places/new" element={<PlacesFormPage />} />
            <Route path="/account/places/:id" element={<PlacesFormPage />} />
            <Route path="/place/:id" element={<PlacePage />} />
            <Route path="/account/bookings" element={<BookingsPage />} />
            <Route path="/account/bookings/:id" element={<BookingPage />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </>
  );
}
