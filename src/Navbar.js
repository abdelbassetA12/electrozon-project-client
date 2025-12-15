import React, { useContext, useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaSearch, FaShoppingCart, FaChevronDown } from 'react-icons/fa';
import { SearchContext } from '../context/SearchContext';
import { CartContext } from '../context/CartContext';
import CartSidebar from './CartSidebar';
import axios from 'axios';

function Navbar({ user, onLogout }) {
  const { setShowSearchOverlay } = useContext(SearchContext);
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const [showCart, setShowCart] = useState(false);
  const [categoriesTree, setCategoriesTree] = useState([]);
  const [openDropdowns, setOpenDropdowns] = useState({});

  useEffect(() => {
    fetchCategoriesTree();
  }, []);

  const fetchCategoriesTree = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/categories/tree');
      setCategoriesTree(res.data);
    } catch (err) {
      console.error('❌ خطأ في جلب شجرة الفئات:', err);
    }
  };

  const toggleDropdown = (name) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleCategoryClick = (slug) => {
    navigate(`/?category=${slug}`);
  };

  // دالة لعرض Dropdown الفئات بشكل متداخل
  const renderDropdown = (nodes, parentKey = '') => {
    return (
      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {(nodes || []).map((node, idx) => {
          const nodeKey = node._id || `${parentKey}-${node.name}-${idx}`;
          return (
            <li key={nodeKey} style={{ position: 'relative', borderBottom: '1px solid #eee' }}>
              <div
                style={{ padding: '6px 10px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}
                onClick={() => node.children?.length > 0 ? toggleDropdown(nodeKey) : handleCategoryClick(node.slug)}
              >
                <span>{node.name}</span>
                {(node.children?.length > 0) && <FaChevronDown style={{ marginLeft: 5 }} />}
              </div>

              {openDropdowns[nodeKey] && node.children && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: '100%',
                  backgroundColor: '#fff',
                  minWidth: 250,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  zIndex: 1000,
                }}>
                  {renderDropdown(node.children, nodeKey)}
                </div>
              )}
            </li>
          )
        })}
      </ul>
    );
  };

  return (
    <>
      <nav style={styles.nav}>
        <h2 style={styles.logo}>ElectroZone</h2>

        <div style={styles.leftLinks}>
          <NavLink to="/" style={{ textDecoration: 'none', color: '#000', fontWeight: '500', padding: '6px 10px' }}>الرئيسية</NavLink>
          <NavLink to="/homee" style={{ textDecoration: 'none', color: '#000', fontWeight: '500', padding: '6px 10px' }}>Homee</NavLink>
          <NavLink to="/offers" style={{ textDecoration: 'none', color: '#000', fontWeight: '500', padding: '6px 10px' }}>العروض</NavLink>

          {/* Dropdown الفئات */}
          <div style={{ position: 'relative' }}>
            <div
              style={{ cursor: 'pointer', padding: '6px 10px', fontWeight: 500 }}
              onClick={() => toggleDropdown('mainCategories')}
            >
              الفئات ▼
            </div>
            {openDropdowns['mainCategories'] && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                backgroundColor: '#fff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                minWidth: 250,
                zIndex: 1000,
              }}>
                {renderDropdown(categoriesTree, 'mainCategories')}
              </div>
            )}
          </div>

          {user && <NavLink to="/my-orders" style={{ textDecoration: 'none', color: '#000', fontWeight: '500', padding: '6px 10px' }}>طلبياتي</NavLink>}
        </div>

        <div style={styles.rightLinks}>
          <FaSearch
            onClick={() => setShowSearchOverlay(true)}
            style={{ fontSize: 20, cursor: 'pointer' }}
            title="بحث"
          />

          <div style={styles.cartIconContainer}>
            <FaShoppingCart
              onClick={() => setShowCart(true)}
              style={{ fontSize: 20, cursor: 'pointer' }}
              title="السلة"
            />
            {cartItems.length > 0 && (
              <span style={styles.cartBadge}>{cartItems.length}</span>
            )}
          </div>

          {!user ? (
            <>
              <NavLink to="/login" style={{ textDecoration: 'none', color: '#000', fontWeight: '500', padding: '6px 10px' }}>تسجيل الدخول</NavLink>
              <NavLink to="/register" style={{ textDecoration: 'none', color: '#000', fontWeight: '500', padding: '6px 10px' }}>إنشاء حساب</NavLink>
            </>
          ) : (
            <button onClick={onLogout} style={styles.logoutBtn}>
              <FaSignOutAlt /> تسجيل الخروج
            </button>
          )}
        </div>
      </nav>

      <CartSidebar isOpen={showCart} onClose={() => setShowCart(false)} />
    </>
  );
}

const styles = {
  nav: {
    position: 'sticky',
    top: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: '12px 30px',
    boxShadow: '0 1px 5px rgba(0,0,0,0.1)',
    zIndex: 1000,
    fontFamily: 'Tajawal, sans-serif',
  },
  logo: {
    fontSize: '1.6rem',
    fontWeight: 'bold',
    background: 'linear-gradient(to right, #00c6ff, #0072ff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  leftLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    flex: 1,
  },
  rightLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  logoutBtn: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: 6,
    padding: '6px 12px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },
  cartIconContainer: {
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -8,
    backgroundColor: '#ff4757',
    color: '#fff',
    borderRadius: '50%',
    fontSize: 10,
    padding: '2px 5px',
    fontWeight: 'bold',
  },
};

export default Navbar;



