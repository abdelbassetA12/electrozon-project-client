// 📁 App.js
import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Home from './pages/Home';
import SearchOverlay from './components/SearchOverlay';
import ProductDetails from './pages/ProductDetails';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import CategoryPage from './pages/CategoryPage';
import OffersPage from './pages/OffersPage';
import Product from './pages/Product';
import Homeee from './pages/Homeees.js';
import Contact from './pages/Contact.js';
import CategoriesDropdown from './components/CategoriesDropdown';




  




  






// في Routes



import { SearchProvider, SearchContext } from './context/SearchContext';
import { CartProvider } from './context/CartContext';

function AppContent({ user, setUser }) {
  const { showSearchOverlay, setShowSearchOverlay } = useContext(SearchContext);

  const location = useLocation();






   useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // تحقق من المستخدم عند بداية التشغيل
      const fetchUser = async () => {
        try {
          const res = await fetch('http://localhost:5000/api/auth/me', {
            headers: { Authorization: `Bearer ${token}` }
          });

          if (res.ok) {
            const data = await res.json();
            setUser(data);
          } else {
            // إذا فشل التحقق احذف التوكن
            localStorage.removeItem('token');
          }
        } catch (err) {
          console.error("فشل التحقق من المستخدم:", err);
          localStorage.removeItem('token');
        }
      };

      fetchUser();
    }
  }, [setUser]);









  // إخفاء البحث عند تغيير الصفحة
  useEffect(() => {
    setShowSearchOverlay(false);
  }, [location.pathname, setShowSearchOverlay]);



  const handleLogout = async () => {
  const token = localStorage.getItem('token');

  if (token) {
    try {
      const res = await fetch('http://localhost:5000/api/cart', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const data = await res.json();

        // 🔹 تحويل بيانات قاعدة البيانات إلى شكل localStorage
        const dbCartItems = data.items.map(item => ({
          productId: item.productId._id,
          name: item.productId.name,
          image: item.productId.image,
          price: item.productId.price,
          quantity: item.quantity,
        }));

        // 🔹 حفظها في localStorage
        localStorage.setItem('cartItems', JSON.stringify(dbCartItems));
      }

    } catch (error) {
      console.error('❌ خطأ أثناء جلب السلة قبل تسجيل الخروج:', error);
    }
  }

  // 🔹 إزالة التوكن وتحديث حالة المستخدم
  localStorage.removeItem('token');
  setUser(null);
};


 

  const handleLogin = (userData) => {
    setUser(userData);
  };


  return (
    <>
      <Navbar user={user} onLogout={handleLogout} />
      <CategoriesDropdown  />
     
      {showSearchOverlay && <SearchOverlay />}

      <Routes>
        <Route path="/offers" element={<OffersPage />} />
        
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/my-orders" element={<OrdersPage />} />
        <Route path="/homeee" element={<Homeee />} />
         <Route path="/contact" element={<Contact />} />
        <Route path="/category" element={<CategoryPage />} />
        
      </Routes>
       <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

function App() {
  const [user, setUser] = useState(null);

  return (
    <SearchProvider>
      <CartProvider user={user}>
        <Router>
          <AppContent user={user} setUser={setUser} />
        </Router>
      </CartProvider>
    </SearchProvider>
  );
}

export default App;



