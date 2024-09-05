import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import HomePage from './Pages/HomePage/HomePage';
import LoginPage from './Pages/LoginPage/LoginPage';
import SignupPage from './Pages/SignupPage/SignupPage';
import Contact from './Pages/Contact/Contact';
import AboutUs from './Pages/AboutUs/AboutUs';
import Admin from './Pages/AdminLoginPage/AdminLoginPage';
import ItemsPage from './Pages/ItemsPage/ItemsPage';
import WarrantyItemsPage from './Pages/WarrantyItemsPage/WarrantyItemsPage';
import UploadItemsPage from './Pages/UploadItemsPage/UploadItemsPage';
import ProfilePage from './Pages/ProfilePage/ProfilePage';
import PurchasedItemsPage from './Pages/PurchasedItemsPage/PurchasedItemsPage';
import ClaimedItemsPage from './Pages/ClaimedItemsPage/ClaimedItemsPage,';
import AdminDashboard from './Pages/AdminDashboard/AdminDashboard';
import UsersPage from './Pages/UsersPage/UsersPage';
import OrdersPage from './Pages/OrdersPage/OrdersPage';
import AdminItemsPage from './Pages/AdminItemsPage/AdminItemsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/items" element={<ItemsPage />} />
        <Route path="/warranty-items" element={<WarrantyItemsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/orders" element={<PurchasedItemsPage />} />
        <Route path="/warranty-details" element={<ClaimedItemsPage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/items" element={<UploadItemsPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<UsersPage />} />
        <Route path="/admin/orders" element={<OrdersPage />} />
        <Route path="/admin/view-items" element={<AdminItemsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
