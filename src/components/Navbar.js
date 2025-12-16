import React, { useContext,useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaBars, FaTimes, FaSignOutAlt, FaUserCircle, FaSearch, FaChevronDown} from 'react-icons/fa';
import { SearchContext } from '../context/SearchContext';
import { CartContext } from '../context/CartContext';
import CartSidebar from './CartSidebar';

import axios from 'axios';




import './navbare.css';

const Navbar = ({ user, onLogout }) => {
   const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);
   const apiUrl = process.env.REACT_APP_API_URL; // قراءة الرابط من .env
   const [showCart, setShowCart] = useState(false);
   const { setShowSearchOverlay } = useContext(SearchContext);
    const [categoriesTree, setCategoriesTree] = useState([]);
     const [openDropdowns, setOpenDropdowns] = useState({});
   
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();
  const [hoverProfile, setHoverProfile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // حالة القائمة على الموبايل
  const navLinksRef = useRef();
  const handleMouseEnter = e => {
    e.target.style.color = '#007bff';
  };
   useEffect(() => {
      fetchCategoriesTree();
    }, []);


   const fetchCategoriesTree = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/categories/tree`);
      setCategoriesTree(res.data);
    } catch (err) {
      console.error('❌ خطأ في جلب شجرة الفئات:', err);
    }
  };

  const handleMouseLeave = e => {
    if (!e.target.classList.contains('active-link')) {
      e.target.style.color = '#000';
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

  const linkStyle = ({ isActive }) => ({
    ...styles.link,
    color: isActive ? '#007bff' : '#000',
    borderBottom: isActive ? '2px solid #007bff' : 'none',
    ...(isActive ? { className: 'active-link' } : {}),
    cursor: 'pointer',
  });

  // إغلاق القوائم (الدروبدون والقائمة الجانبية) إذا تم الضغط خارجها
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }

      if (navLinksRef.current && !navLinksRef.current.contains(e.target) && !e.target.closest('.menu-toggle')) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);



  return (
    <nav style={styles.nav}>
      <div className="menu-toggle" style={styles.cartIconContainer}>
                      <FaShoppingCart
                        onClick={() => setShowCart(true)}
                        style={{ fontSize: 20, cursor: 'pointer' }}
                        title="السلة"
                      />
                      {cartItems.length > 0 && (
                        <span style={styles.cartBadge}>{cartItems.length}</span>
                      )}
                    </div>

                  
      <NavLink className='logo' to="/" style={styles.logo} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>ElectroZone </NavLink>
     



        <FaSearch className="menu-toggle"
            onClick={() => setShowSearchOverlay(true)}
            style={{ fontSize: 20, cursor: 'pointer' }}
            title="بحث"
          />
         
      {/* زر الهامبرغر للموبايل */}
      <div className="menu-toggle" onClick={() => setMenuOpen(prev => !prev)}>
        {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </div>

      
       

      {/* حاوية الروابط - تُستخدم كقائمة جانبية على الموبايل */}
      <div ref={navLinksRef} className={`nav-links ${menuOpen ? 'open' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1, justifyContent: 'center' }}>

      {/* عناصر خاصة بالموبايل داخل القائمة (تُظهر فقط على الشاشات الصغيرة) */}
      <div className="mobile-auth" style={{ display: 'none', flexDirection: 'column', gap: 8 }}>
  {!user ? (
    <>
      

      
        <NavLink to="/login" className="mobile-login" style={styles.buttonOutline} onClick={() => setMenuOpen(false)}> 
        Log in
      </NavLink>
      <NavLink to="/register" className="mobile-register" style={styles.registerBtn} onClick={() => setMenuOpen(false)}> 
       Register
      </NavLink>

      
    </>
  ) : (
    <>


      <div >
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px'}}>

          <div     style={{ ...styles.userCircle, flexShrink: 0   }} >
            {user.username?.[0]?.toUpperCase() || "U"}
           
          </div>
           <strong>{user.username}</strong>
          
          

          
        </div>



        <div style={{ fontSize: 13, color: '#555' }}>{user.email}</div>
        
       <div  style={{ display: 'flex', alignItems: 'center' }}>
        <NavLink to="/profile" onClick={() => {   setShowDropdown(false);   setMenuOpen(false);   }}
              onMouseEnter={() => setHoverProfile(true)}
              onMouseLeave={() => setHoverProfile(false)}
              style={{    ...styles.btnDropdown,   backgroundColor: hoverProfile ? '#f0f0f0' : 'transparent',    color: hoverProfile ? '#007bff' : '#000',width: '100%'   }} >
              <FaUserCircle /> profile
         </NavLink>

        
         
       </div>
      </div>


      
    </>
  )}

  
      </div>





        <div style={styles.leftLinks} className='leftlinks'>
          <NavLink className='nav-link' to="/" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={() => setMenuOpen(false)}>Home</NavLink>

          <NavLink className='nav-link' to="/offers" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={() => setMenuOpen(false)}> offers </NavLink>
          {/* Dropdown الفئات */}
          {/* <div style={{ position: 'relative' }}>
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
                    </div>*/ }
                    
          
                    {user && <NavLink to="/my-orders" style={{ textDecoration: 'none', color: '#000', fontWeight: '500', padding: '6px 10px' }}>My Orders</NavLink>}
          <NavLink className='nav-link' to="/product" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={() => setMenuOpen(false)}>Product</NavLink>
          <NavLink className='nav-link' to="/contact" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={() => setMenuOpen(false)}>Contact Us</NavLink>


          
          {user && (
                      <>
                       
                        <button className='onlogout-mobile'
                    onClick={() => {
                      setShowDropdown(false);
                      onLogout();
                    }}
                  >
                    <FaSignOutAlt />Sign out
                  </button>
          
                      </>
                    )}

        
          </div>

          
            


      
      </div>

      {/* يمين النافبار - دائرة المستخدم وقائمة منسدلة (مخفية على الموبايل بواسطة CSS) */}
      <div className="right-links" style={styles.rightLinks} ref={dropdownRef}>


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



        {user ? (
          <>
            {!user.isSubscribed && (
              <NavLink to="/subscription" style={styles.upgradeBtn}>subscription</NavLink>
            )}
           

            <div style={{ position: 'relative' }}>
              <div
                onClick={() => setShowDropdown(prev => !prev)}
                style={styles.userCircle}
              >
                {user.username?.[0]?.toUpperCase() || "U"}
              </div>
              {showDropdown && (
                <div style={styles.dropdown}>
                  <div style={{ marginBottom: 10 }}>
                    <strong>{user.username}</strong>
                    <div style={{ fontSize: 13, color: '#555' }}>{user.email}</div>
                  </div>

                  <hr />

                  <NavLink
                    to="/profile"
                    onClick={() => setShowDropdown(false)}
                    onMouseEnter={() => setHoverProfile(true)}
                    onMouseLeave={() => setHoverProfile(false)}
                    style={{
                      ...styles.btnDropdown,
                      backgroundColor: hoverProfile ? '#f0f0f0' : 'transparent',
                      color: hoverProfile ? '#007bff' : '#000',
                     
                    }}
                  >
                    <FaUserCircle />profile
                  </NavLink>

                  <button className='onlogout'
                    onClick={() => {
                      setShowDropdown(false);
                      onLogout();
                    }}
                  >
                    <FaSignOutAlt />Sign out
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
           
            <NavLink to="/login" style={styles.buttonOutline}> login </NavLink>
            <NavLink to="/register" style={styles.registerBtn}> register </NavLink>
          </>
        )}
      </div>
      <CartSidebar isOpen={showCart} onClose={() => setShowCart(false)} />
       
 


   
    </nav>
  );
};

const styles = {
  nav: {
    position: 'sticky',
    top: '0',
    fontFamily: 'Tajawal, sans-serif',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: '12px 30px',
    color: '#000',
    zIndex: 1000,
    boxShadow: '0 1px 5px rgba(0,0,0,0.1)',
  },
  logo: {
    
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  leftLinks: {
    display: 'flex',
    alignItems: 'center',
    
    gap: '20px',
    flex: 1,
    justifyContent: 'center',
  },
  dropdownLink: {
    display: "block",
    padding: "8px 16px",
    textDecoration: "none",
    color: "#000",
    fontWeight: 500,
    borderRadius: 6,
    transition: "background 0.2s, color 0.2s",
  },
  rightLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  link: {
    color: '#000',
    textDecoration: 'none',
    fontWeight: 500,
    padding: '6px 10px',
    transition: 'color 0.3s ease',
  },
  button: {
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    padding: '6px 14px',
    color: '#000',
    cursor: 'pointer',
    borderRadius: '6px',
    fontWeight: 500,
  },
  buttonOutline: {
    border: '1px solid #ccc',
    padding: '6px 14px',
    backgroundColor: 'white',
    borderRadius: '6px',
    textDecoration: 'none',
    color: '#000',
    fontWeight: 500,
  },
  registerBtn: {
    background: 'linear-gradient(to right, #7b2ff7, #f107a3)',
    color: 'white',
    padding: '7px 16px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: 'bold',
    border: 'none',
  },
  upgradeBtn: {
    background: 'linear-gradient(to right, #f39c12, #f1c40f)',
    color: 'white',
    padding: '7px 14px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: 'bold',
    border: 'none',
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
  btnDropdown: {
    display: 'block',
    padding: '8px 12px',
    textDecoration: 'none',
    color: '#000',
    borderRadius: 6,
    fontWeight: 500,
    transition: 'background 0.2s',
  },
  userCircle: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    backgroundColor: '#007bff',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  dropdown: {
    position: 'absolute',
    top: '110%',
    
    
   insetInlineEnd: 0,   /* يستبدل right:0 */
    overflow: 'hidden',
    
    background: 'white',
    borderRadius: 10,
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    padding: '15px',
    width: 230,
    zIndex: 200,
    
  }
};

export default Navbar;


































