



import React, { useState, useEffect , useRef} from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import axios from "axios";
import "./CategoriesDropdown.css";
const BASE_URL = process.env.REACT_APP_API_URL; // من .env
const CategoriesDropdown = ({ apiUrl = `${BASE_URL}/api/categories/tree` }) => {
  const [categoriesTree, setCategoriesTree] = useState([]);
  const [openDropdowns, setOpenDropdowns] = useState({});

  //  جديد للغلق

  const navbarRef = useRef(null);




  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = useNavigate();


  //  جديد للغلق

  useEffect(() => {
  const handleClickOutside = (e) => {
    if (navbarRef.current && !navbarRef.current.contains(e.target)) {
      setOpenDropdowns({});   // 🔥 إغلاق كل الشجرة
      setMobileOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);




  // 🔽👇 تتبع اتجاه السكروول لإظهار / إخفاء البار
useEffect(() => {
  let lastScrollY = window.scrollY;

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
      // المستخدم يسحب لأعلى → نخفي البار
      document.querySelector(".categories-navbar").classList.add("hide");
    } else {
      // المستخدم يسحب لأسفل → نظهر البار
      document.querySelector(".categories-navbar").classList.remove("hide");
    }

    lastScrollY = currentScrollY;
  };

  window.addEventListener("scroll", handleScroll);

  return () => window.removeEventListener("scroll", handleScroll);
}, []);


  useEffect(() => {
    const fetchCategoriesTree = async () => {
      try {
        const res = await axios.get(apiUrl);
        setCategoriesTree(res.data);
      } catch (err) {
        console.error("❌ خطأ في جلب شجرة الفئات:", err);
      }
    };
    fetchCategoriesTree();
  }, [apiUrl]);

  const toggleDropdown = (key) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  


 

     /*
     const handleCategoryClick = (slug) => {
    if (!slug) return;
    navigate(`/?category=${slug}`);
  };
  */
 /*
   const handleCategoryClick = (slug) => {
    if (!slug) return;
    navigate(`/homeee/?category=${slug}`);
  };
  */
//  جديد للغلق
  const handleCategoryClick = (slug) => {
  if (!slug) return;

  navigate(`/product/?category=${slug}`);

  // 🔥 إغلاق كل القوائم بعد التنقل
  setOpenDropdowns({});
  setMobileOpen(false);
};






  // render recursively for child categories
  const renderDropdown = (nodes) => {
    return (
      <ul className="dropdown-level">
        {nodes.map((node) => {
          const nodeKey = node._id;
          const hasChildren = node.children?.length > 0;

          return (
            <li
              key={nodeKey}
              className={`dropdown-item ${openDropdowns[nodeKey] ? "open" : ""}`}
            >
              <div
                className="dropdown-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  if (hasChildren) toggleDropdown(nodeKey);
                  else handleCategoryClick(node.slug); // ✅ هنا فقط slug
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    e.stopPropagation();
                    if (hasChildren) toggleDropdown(nodeKey);
                    else handleCategoryClick(node.slug); // ✅ هنا فقط slug
                  }
                }}
              >
                <span>{node.name}</span>
                {hasChildren && <FaChevronDown className="arrow" />}
              </div>

              {hasChildren && (
                <div className="dropdown-children">
                  {renderDropdown(node.children)}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="categories-navbar"  ref={navbarRef}>

       {/* زر القائمة للجوال فقط */}
  <div className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
    <FaChevronDown className={mobileOpen ? "rotate" : ""} />
    <span>Categories</span>
  </div>

  
      
        <ul className="categories-main" style={{ display: mobileOpen ? "flex" : "" }}>
        {categoriesTree.map((cat) => {
          const hasChildren = cat.children?.length > 0;

          return (
            <li
              key={cat._id}
              className={`main-category ${openDropdowns[cat._id] ? "open" : ""}`}
            >
              <div
                className="main-category-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  if (hasChildren) toggleDropdown(cat._id);
                  else handleCategoryClick(cat.slug); // ✅ هنا فقط slug
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    e.stopPropagation();
                    if (hasChildren) toggleDropdown(cat._id);
                    else handleCategoryClick(cat.slug); // ✅ هنا فقط slug
                  }
                }}
              >
                <span className="main-category-title">{cat.name}</span>
                {hasChildren && <FaChevronDown className="arrow" />}
              </div>

              {hasChildren && (
                <div className="main-dropdown">
                  {renderDropdown(cat.children)}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CategoriesDropdown;













