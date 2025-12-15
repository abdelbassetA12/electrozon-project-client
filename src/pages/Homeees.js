




import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { SearchContext } from '../context/SearchContext';
import Footer from '../components/Footer';








import {  FaLinkedin, FaGithub, FaInstagram,  FaArrowUp, FaArrowRight, FaYoutube,FaCheckCircle, FaTruck, FaAward, FaCreditCard, FaTag, FaCogs } from "react-icons/fa";
import { SiUpwork } from "react-icons/si";








import "./home.css";



const Homeee = () => {
      const location = useLocation();



 // useReveal(".fade-in, .slide-left, .slide-right, .slide-up, .zoom-in, .stagger");
 const [products, setProducts] = useState([]);
 const [showScroll, setShowScroll] = useState(false);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
   const apiUrl = process.env.REACT_APP_API_URL; // قراءة الرابط من .env
   
 // const navigate = useNavigate();
   
    const queryParams = new URLSearchParams(location.search);
     const categorySlug = queryParams.get('category');
      const { searchQuery } = useContext(SearchContext);
      const filteredProducts = products.filter((p) => {
  const matchesCategory = !categorySlug || p.category?.slug === categorySlug;
  const matchesSearch = (p.name || '').toLowerCase().includes((searchQuery || '').toLowerCase());
 
  return matchesCategory && matchesSearch;
});
   
      const fetchProducts = async () => {
  try {
    const url = categorySlug
      ? `${apiUrl}/api/products/by-category/${categorySlug}`
      : `${apiUrl}/api/products/all`;
    const res = await axios.get(url);
    setProducts(res.data);
  } catch (err) {
    console.error(err);
    alert('فشل جلب المنتجات');
  }
};





   

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/products/offers/active`);
      setOffers(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      alert('❌ فشل جلب العروض');
      setLoading(false);
    }
  };


    useEffect(() => {
      fetchProducts();
    }, [categorySlug]);

 


  
    useEffect(() => {
      const sections = document.querySelectorAll(
        ".fade-in, .slide-left, .slide-right, .slide-up, .zoom-in"
      );
  
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("show");
            } else {
              entry.target.classList.remove("show");
            }
          });
        },
        { threshold: 0.2 }
      );
  
      sections.forEach((sec) => observer.observe(sec));
      return () => observer.disconnect();
    }, []);



const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};


useEffect(() => {
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowScroll(true);
    } else {
      setShowScroll(false);
    }
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);


   return (
     <div className="contaner">
       <style>{`
 
    
 
 
 
 
 
   /* 🔹 Animations Base */
         .fade-in, .slide-left, .slide-right, .slide-up, .zoom-in {
           opacity: 0;
           transition: all 0.8s ease-out;
         }
 
         .fade-in.show { opacity: 1; transform: translateY(0); }
         .slide-left { transform: translateX(-50px); }
         .slide-left.show { opacity: 1; transform: translateX(0); }
         .slide-right { transform: translateX(50px); }
         .slide-right.show { opacity: 1; transform: translateX(0); }
         .slide-up { transform: translateY(50px); }
         .slide-up.show { opacity: 1; transform: translateY(0); }
         .zoom-in { transform: scale(0.9); }
         .zoom-in.show { opacity: 1; transform: scale(1); }
 
 
 
 
 
 
        
 
         /* مشاريع */
         .projects-section { padding: 2rem; }
         .projects-section h2 { text-align: center; margin: 0 0 3rem; }
          .projects-grid {  display: grid; grid-template-columns: repeat(5, 1fr); gap: 20px; }










      


         @media (max-width: 768px) { .projects-grid {
         
         grid-template-columns: 1fr;
         
          } }
 
         
       `}</style>
 
      
 
       {/* Projects Section */}
       <div className="projects-section  " style={{  overflow: "hidden"}}>
         <h2  style={{ fontSize: "26px", color: "purple", marginBottom: "40px", display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>Product</h2>
        
         <div className="projects-grid fade-in">
           {filteredProducts.length > 0 ? (
    filteredProducts.slice(0, 10).map((p) => ( // إظهار 10 منتجات كحد أقصى
      <ProductCard key={p._id} product={p} />
    ))
  ) : (
    <p style={{ textAlign: "center", width: "100%" }}>لا توجد منتجات لعرضها</p>
  )}
         </div>
         <div style={{ marginTop: "30px", textAlign: "center", display: "flex", flexDirection:"column", justifyContent: "center", alignItems: "center" }}>
           <Link to="/product" style={{
              padding: "10px 20px", backgroundColor: "#2563eb",
             color: "#fff", fontWeight: "600", borderRadius: "8px", textDecoration: "none", display: "flex", alignItems: "center", gap:"5px"
           }}>See All Product <FaArrowRight /></Link>
         </div>
       </div>


     




















     




       
 
      
 
       {/* Features Section */}
      
 
       {/* Team Section */}
       <section className="slide-left"  style={{ textAlign: "center", padding: "50px 20px", backgroundColor: "#fafafa", overflow: "hidden" }}>
         

         <div>
           <h4>Follow me on</h4>
 
          <div
   style={{
     display: "flex",
     justifyContent: "center",
     alignItems: "center",
     gap: "25px",
     marginTop: "0px",
     fontSize: "36px", // حجم الأيقونات
   
   
   }}
 >
   
   <a
     href="https://www.linkedin.com/in/abdelbasset-el-hajiri-65036830a/"
     target="_blank"
     rel="noreferrer"
     style={{ color: "#444", transition: "all 0.3s ease" }}
     onMouseEnter={(e) => {
       e.currentTarget.style.color = "#0077b5";
       e.currentTarget.style.transform = "scale(1.2)";
     }}
     onMouseLeave={(e) => {
       e.currentTarget.style.color = "#444";
       e.currentTarget.style.transform = "scale(1)";
     }}
   >
     <FaLinkedin />
   </a>
 
   <a
     href="https://github.com/abdelbassetA12"
     target="_blank"
     rel="noreferrer"
     style={{ color: "#444", transition: "all 0.3s ease" }}
     onMouseEnter={(e) => {
       e.currentTarget.style.color = "#000";
       e.currentTarget.style.transform = "scale(1.2)";
     }}
     onMouseLeave={(e) => {
       e.currentTarget.style.color = "#444";
       e.currentTarget.style.transform = "scale(1)";
     }}
   >
     <FaGithub />
   </a>
 
   <a
     href="https://www.instagram.com/abdelbasset_eh?igsh=MWc5Z3Azbnh3ZnhodA=="
     target="_blank"
     rel="noreferrer"
     style={{ color: "#444", transition: "all 0.3s ease" }}
     onMouseEnter={(e) => {
       e.currentTarget.style.color = "#e4405f";
       e.currentTarget.style.transform = "scale(1.2)";
     }}
     onMouseLeave={(e) => {
       e.currentTarget.style.color = "#444";
       e.currentTarget.style.transform = "scale(1)";
     }}
   >
     <FaInstagram />
   </a>
   <a
     href="https://www.youtube.com/@abdelbassetelhajiri"
     target="_blank"
     rel="noreferrer"
     style={{ color: "#444", transition: "all 0.3s ease" }}
     onMouseEnter={(e) => {
       e.currentTarget.style.color = "#ff0707ff";
       e.currentTarget.style.transform = "scale(1.2)";
     }}
     onMouseLeave={(e) => {
       e.currentTarget.style.color = "#444";
       e.currentTarget.style.transform = "scale(1)";
     }}
   >
    
     <FaYoutube />
   </a>
 
   <a
     href="https://www.upwork.com/freelancers/~016eb755e81c8f3902"
     target="_blank"
     rel="noreferrer"
     style={{ color: "#444", transition: "all 0.3s ease" }}
     onMouseEnter={(e) => {
       e.currentTarget.style.color = "#6fda44";
       e.currentTarget.style.transform = "scale(1.2)";
     }}
     onMouseLeave={(e) => {
       e.currentTarget.style.color = "#444";
       e.currentTarget.style.transform = "scale(1)";
     }}
   >
     <SiUpwork />
   </a>
 
 
 
   
 
 
 
 
         </div>
 
 
         </div>
           
       </section>


        <Footer />
      
 
       
    
 
           {/* زر الرجوع لأعلى */}
      {showScroll && (
  
   <div className="scroll-top"> <button  onClick={scrollToTop}><FaArrowUp size={20} /></button></div>
 )}
     </div>
    
   );
 };
 
 export default Homeee;
 
 