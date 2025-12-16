




import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { SearchContext } from '../context/SearchContext';
import Footer from '../components/Footer';

import { toast } from 'react-toastify';







import {  FaLinkedin, FaGithub, FaInstagram,FaFacebook,  FaArrowUp, FaArrowRight, FaYoutube, FaTruck, FaAward, FaCreditCard, FaTag, FaCogs } from "react-icons/fa";
import { SiUpwork } from "react-icons/si";








import "./home.css";

const titleStyle = { fontSize: "1.2rem", marginBottom: "1rem", color: "#2563eb" };
const descStyle = { fontSize: "0.95rem", color: "#4b5563", lineHeight: "1.6" };

const Home = () => {
      const location = useLocation();

const cardStyle = {
  background: "#fff",
  padding: "2rem",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  transition: "transform 0.3s ease, boxShadow 0.3s ease",
  textAlign: "center"
};

 // useReveal(".fade-in, .slide-left, .slide-right, .slide-up, .zoom-in, .stagger");
 const [products, setProducts] = useState([]);
 const [showScroll, setShowScroll] = useState(false);
  const [offers, setOffers] = useState([]);
   const apiUrl =   process.env.REACT_APP_API_URL; 

   
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
    toast.error(' فشل جلب المنتجات');

  }
};


  const services = [
    { icon: < FaTruck size={40} color="#2563eb" />, title: "Quality Guaranteed", desc: "All our products are carefully selected to guarantee their quality, with a clear commitment to the guarantee." },
    { icon: <FaAward size={40} color="#2563eb" />, title: "100% secure payment", desc: "Make your purchases with complete confidence thanks to our secure and protected online payment system." },
    { icon: <FaCreditCard size={40} color="#2563eb" />, title: "Exceptional offer", desc: "Take advantage of our exclusive promotions, special discounts and limited-time offers on a wide selection of products" },
    { icon: <FaTag size={40} color="#2563eb" />, title: "After-Sales Service", desc: "Available in store 5 days a week, with fast support, technical advice and warranty service." },
    { icon: <FaCogs size={40} color="#2563eb" />, title: "Professional Design", desc: "Professional interfaces and smooth user experience that add real value to your website." },

  ];
/*
  const features = [
   
    { title: "Quality Guaranteed", desc: "All our products are carefully selected to guarantee their quality, with a clear commitment to the guarantee.", img: "https://images.unsplash.com/photo-1649451844813-3130d6f42f8a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fFJlYWN0JTJDJTIwTmV4dC5qcyUyQyUyME5vZGUuanMlMkMlMjAlRDklODglMjBNb25nb0RCfGVufDB8fDB8fHww" },
    { title: "100% secure payment", desc: "Make your purchases with complete confidence thanks to our secure and protected online payment system.", img: "https://images.unsplash.com/photo-1688733720228-4f7a18681c4f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cmVzcG9uc2l2ZSUyMGRlc2lnbnxlbnwwfHwwfHx8MA%3D%3D" },
    { title: "Exceptional offer", desc: "Take advantage of our exclusive promotions, special discounts and limited-time offers on a wide selection of products", img: "https://images.unsplash.com/file-1719664968387-83d5a3f4d758image?w=416&dpr=2&auto=format&fit=crop&q=60" },
    { title: "After-Sales Service", desc: "Available in store 5 days a week, with fast support, technical advice and warranty service.", img: "https://media.istockphoto.com/id/1364393941/fr/photo/processus-de-certification-et-de-normalisation-activit%C3%A9-certifi%C3%A9e-iso-conformit%C3%A9-aux-normes.webp?a=1&b=1&s=612x612&w=0&k=20&c=CQ7YiKUdhleDRaZQLUT0E0JwhJJAPpSaeBrnt0uEhWc=" },
    { title: "Professional Design", desc: "Professional interfaces and smooth user experience that add real value to your website.", img: "https://plus.unsplash.com/premium_photo-1722207099676-f188d17ff51b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8UHJvZmVzc2lvbmFsJTIwaW50ZXJmYWNlJTIwZGVzaWduJTIwYW5kJTIwYSUyMHNlYW1sZXNzJTIwdXNlciUyMGV4cGVyaWVuY2UlMjB0aGF0JTIwYWRkcyUyMHJlYWwlMjB2YWx1ZSUyMHRvJTIweW91ciUyMHdlYnNpdGUufGVufDB8fDB8fHww" },
  ];

  */



   

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/products/offers/active`);
      setOffers(res.data);
    } catch (err) {
      console.error(err);
      toast.error(' فشل جلب العروض');

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
          .projects-grid { 
          
         


           padding: 32px;
  display: grid;

  /* ✅ الحل */

    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  justify-content: start;
          }











                    .empty-state {
  min-height: 50vh;
grid-column: 1 / -1;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  opacity: 0.85;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 12px;
}

.empty-state h3 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 6px;
}

.empty-state p {
  font-size: 14px;
  color: #9ca3af;
  max-width: 320px;
  line-height: 1.6;
}










      


         @media (max-width: 768px) { .projects-grid {
         
         grid-template-columns: 1fr; 
          justify-items: center;
         
         } }
 
         
       `}</style>
 
       {/* الهيدر */}
       <div className="heder">
         <div className="baner  zoom-in">
           <img src="https://c8.alamy.com/comp/2D7GAPB/online-sale-shopping-vector-banner-design-online-shopping-text-with-phone-cart-and-paper-bag-elements-in-smartphone-app-store-for-mobile-business-2D7GAPB.jpg" alt="Logo" />
         </div>
         <div className="scrept-baner slide-up ">
           <h4>Hello, how are you?</h4>
       
           <h1>Discover premium products and outstanding services, carefully selected to deliver the best shopping experience.</h1>
          

 
          
      
           
         
         <div>
           <h4>Follow Us on</h4>
 
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
               href="https://www.facebook.com"
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
               <FaFacebook />
             </a>
 
 
 
   
 
 
 
 
         </div>
 
 
         </div>
 
 
         </div>
       </div>
 
       {/* Projects Section */}
       <div className="projects-section " style={{  overflow: "hidden"}}>
         <h2  style={{ fontSize: "26px", color: "purple", marginBottom: "40px", display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>Product</h2>
        
         <div className="projects-grid ">
           {filteredProducts.length > 0 ? (
    filteredProducts.slice(0, 10).map((p) => ( // إظهار 10 منتجات كحد أقصى
      <ProductCard key={p._id} product={p} />
    ))
  ) : (
     <div className="empty-state">
  <div className="empty-icon">🛒</div>
  <h3>لا توجد منتجات</h3>
  <p>لم يتم العثور على منتجات  </p>
</div>
  )}
         </div>
         <div style={{ marginTop: "30px", textAlign: "center", display: "flex", flexDirection:"column", justifyContent: "center", alignItems: "center" }}>
           <Link to="/product" style={{
              padding: "10px 20px", backgroundColor: "#2563eb",
             color: "#fff", fontWeight: "600", borderRadius: "8px", textDecoration: "none", display: "flex", alignItems: "center", gap:"5px"
           }}>See All Product <FaArrowRight /></Link>
         </div>
       </div>










        {/* Projects Section */}
       <div className="projects-section " style={{  overflow: "hidden"}}>
         <h2  style={{ fontSize: "26px", color: "purple", marginBottom: "40px", display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>Les Promos</h2>
        
         <div className="projects-grid ">
            {offers.length === 0 ? (
 <div className="empty-state">
  <div className="empty-icon">🛒</div>
  <h3>لا توجد منتجات</h3>
  <p>لم يتم العثور على منتجات بها تخفيضات أو عروض </p>
</div>        ) : (
          offers.slice(0, 10).map((product) => (
            
            <ProductCard key={product._id} product={product} />
          ))
        )}
         </div>
         <div style={{ marginTop: "30px", textAlign: "center", display: "flex", flexDirection:"column", justifyContent: "center", alignItems: "center" }}>
           <Link to="/offers" style={{
              padding: "10px 20px", backgroundColor: "#2563eb",
             color: "#fff", fontWeight: "600", borderRadius: "8px", textDecoration: "none", display: "flex", alignItems: "center", gap:"5px"
           }}>See All Product <FaArrowRight /></Link>
         </div>
       </div>





       
 
       {/* Services Section */}
       <div   style={{  padding: "80px 20px 20px", background: "#f9fafb", textAlign: "center", overflow: "hidden" }}>
         <h2 className="slide-up" style={{ fontSize: "26px", color: "purple", marginBottom: "40px", display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>My Services</h2>
         <div className=" zoom-in "  style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", justifyItems: "center", padding: "0 2rem" }}>
           {services.map((service, idx) => (
             <div key={idx} style={cardStyle}
               onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-8px)"; e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.15)"; }}
               onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)"; }}>
               <div style={{ marginBottom: "1rem" }}>{service.icon}</div>
               <h3 style={titleStyle}>{service.title}</h3>
               <p style={descStyle}>{service.desc}</p>
             </div>
           ))}
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
                           href="https://www.facebook.com"
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
                           <FaFacebook />
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
 
 export default Home;
 
 