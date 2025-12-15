



import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ProjectCard from "../components/ProjectCard"; 
import { FaServer, FaShoppingCart, FaSearch, FaCloud, FaPaintBrush, FaCode, FaLinkedin, FaGithub, FaInstagram,  FaArrowUp, FaArrowRight, FaYoutube} from "react-icons/fa";
import { SiUpwork } from "react-icons/si";
import Footer from '../components/Footer';






import "./home.css";

const cardStyle = {
  background: "#fff",
  padding: "2rem",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  transition: "transform 0.3s ease, boxShadow 0.3s ease",
  textAlign: "center"
};

const titleStyle = { fontSize: "1.2rem", marginBottom: "1rem", color: "#2563eb" };
const descStyle = { fontSize: "0.95rem", color: "#4b5563", lineHeight: "1.6" };

const Home = () => {
 // useReveal(".fade-in, .slide-left, .slide-right, .slide-up, .zoom-in, .stagger");
  const [projects, setProjects] = useState([]);
 const [showScroll, setShowScroll] = useState(false);
   
  const navigate = useNavigate();

  const services = [
    { icon: <FaServer size={40} color="#2563eb" />, title: "Headless CMS", desc: "Build and integrate modern headless CMS solutions for scalable and flexible content management." },
    { icon: <FaShoppingCart size={40} color="#2563eb" />, title: "E-commerce", desc: "Develop secure and scalable e-commerce platforms with advanced payment and product management features." },
    { icon: <FaSearch size={40} color="#2563eb" />, title: "SEO Optimization", desc: "Optimize websites for search engines with best practices to improve ranking and visibility." },
    { icon: <FaCloud size={40} color="#2563eb" />, title: "Hosting & Domain", desc: "Provide reliable hosting setup and domain configuration for seamless project deployment." },
    { icon: <FaPaintBrush size={40} color="#2563eb" />, title: "UI/UX Design", desc: "Design intuitive, user-friendly, and modern interfaces that improve user experience." },
    { icon: <FaCode size={40} color="#2563eb" />, title: "Web Development", desc: "Build complete, secure, and high-performance web applications from scratch to deployment." },
  ];

  const features = [
    { title: "Latest Technologies", desc: "I use the latest technologies such as React, Next.js, Node.js, and MongoDB to build powerful and fast websites.", img: "https://images.unsplash.com/photo-1649451844813-3130d6f42f8a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fFJlYWN0JTJDJTIwTmV4dC5qcyUyQyUyME5vZGUuanMlMkMlMjAlRDklODglMjBNb25nb0RCfGVufDB8fDB8fHww" },
    { title: "Modern Design", desc: "A modern and attractive design that fits all devices and reflects your brand identity.", img: "https://images.unsplash.com/photo-1519222970733-f546218fa6d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHdlYnxlbnwwfHwwfHx8MA%3D%3D" },
    { title: "Responsive Design", desc: "All websites are fully responsive on mobiles, tablets, and large screens to ensure an excellent user experience.", img: "https://images.unsplash.com/photo-1688733720228-4f7a18681c4f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cmVzcG9uc2l2ZSUyMGRlc2lnbnxlbnwwfHwwfHx8MA%3D%3D" },
    { title: "Tailored Solutions", desc: "Custom solutions that precisely meet your project needs, with a focus on performance and quality.", img: "https://images.unsplash.com/file-1719664968387-83d5a3f4d758image?w=416&dpr=2&auto=format&fit=crop&q=60" },
    { title: "Strong Experience", desc: "Years of experience in developing websites and applications, with a commitment to global best practices.", img: "https://media.istockphoto.com/id/1364393941/fr/photo/processus-de-certification-et-de-normalisation-activit%C3%A9-certifi%C3%A9e-iso-conformit%C3%A9-aux-normes.webp?a=1&b=1&s=612x612&w=0&k=20&c=CQ7YiKUdhleDRaZQLUT0E0JwhJJAPpSaeBrnt0uEhWc=" },
    { title: "Professional Design", desc: "Professional interfaces and smooth user experience that add real value to your website.", img: "https://plus.unsplash.com/premium_photo-1722207099676-f188d17ff51b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8UHJvZmVzc2lvbmFsJTIwaW50ZXJmYWNlJTIwZGVzaWduJTIwYW5kJTIwYSUyMHNlYW1sZXNzJTIwdXNlciUyMGV4cGVyaWVuY2UlMjB0aGF0JTIwYWRkcyUyMHJlYWwlMjB2YWx1ZSUyMHRvJTIweW91ciUyMHdlYnNpdGUufGVufDB8fDB8fHww" },
  ];

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/projects")
      .then((res) => setProjects(res.data))
      .catch((err) => console.error(err));
  }, []);


  
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
        .projects-grid { padding: 0 3rem; display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        @media (max-width: 768px) { .projects-grid { grid-template-columns: 1fr; } }

        
      `}</style>

      {/* الهيدر */}
      <div className="heder">
        <div className="baner  zoom-in">
          <img src="/images/logo1.jpeg" alt="Logo" />
        </div>
        <div className="scrept-baner slide-up ">
          <h4>Hello, how are you?</h4>
      
          <h1>All the digital solutions you need — smart, modern, and tailored for your success.</h1>

         
     
          
        
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


        </div>
      </div>

      {/* Projects Section */}
      <div className="projects-section  " style={{  overflow: "hidden"}}>
        <h2  style={{ fontSize: "26px", color: "purple", marginBottom: "40px", display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>My Works</h2>
        <div className="projects-grid fade-in">
          {projects.slice(0, 2).map((project) => <ProjectCard key={project._id} project={project} />)}
        </div>
        <div style={{ marginTop: "30px", textAlign: "center", display: "flex", flexDirection:"column", justifyContent: "center", alignItems: "center" }}>
          <Link to="/projects-list" style={{
             padding: "10px 20px", backgroundColor: "#2563eb",
            color: "#fff", fontWeight: "600", borderRadius: "8px", textDecoration: "none", display: "flex", alignItems: "center", gap:"5px"
          }}>See All Projects <FaArrowRight /></Link>
        </div>
      </div>

      {/* Services Section */}
      <div   style={{  padding: "80px 20px 20px", background: "#f9fafb", textAlign: "center", overflow: "hidden" }}>
        <h2 className="slide-up" style={{ fontSize: "26px", color: "purple", marginBottom: "40px", display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>My Services</h2>
        <div className=" zoom-in "  style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px", justifyItems: "center", padding: "0 2rem" }}>
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
      <div  className="zoom-in"  style={{ padding: "80px 20px 20px", backgroundColor: "#f9fafb", overflow: "hidden" }}>
        <h2 className="slide-left "   style={{ fontSize: "26px", color: "purple", marginBottom: "40px", display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}> Why Me?</h2>
        <div    style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "30px", maxWidth: "1200px", margin: "0 auto" }}>
          {features.map((feature, idx) => (
            <div     key={idx} style={{
              padding: "30px 20px", borderRadius: "16px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              textAlign: "center", transition: "transform 0.3s ease, boxShadow 0.3s ease", cursor: "pointer",
              color: "#fff", backgroundImage: `url(${feature.img})`, backgroundSize: "cover",
              backgroundPosition: "center", position: "relative", overflow: "hidden"
            }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-10px)"; e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.15)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.1)"; }}>
              <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", borderRadius: "16px" }}></div>
              <div style={{ position: "relative", zIndex: 1 }}>
                <h3 style={{ color: "#fff", marginBottom: "15px", fontSize: "1.5rem" }}>{feature.title}</h3>
                <p style={{ lineHeight: "1.7", fontSize: "1rem" }}>{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <section className="slide-left"  style={{ textAlign: "center", padding: "50px 20px", backgroundColor: "#fafafa", overflow: "hidden" }}>
        <h2 style={{ fontSize: "26px", color: "purple", marginBottom: "40px", display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}> About Us</h2>
        <div style={{ display: "flex", justifyContent: "center", gap: "40px", flexWrap: "wrap" }}>
          <div className="team-card" style={{
            background: "#fff", borderRadius: "12px", padding: "1rem", boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            width: "200px", textAlign: "center", cursor: "pointer"
          }} onClick={() => navigate("/resume")}>
            <img src="images/mepro.jpg" alt="Ali Ahmed" style={{ width: "100%", borderRadius: "50%", objectFit: "cover", marginBottom: "0.8rem" }} />
            <h4 style={{ margin: "0 0 8px", fontWeight: "bold", fontSize: "16px", color: "#222" }}>Abdelbasset El Hajiri</h4>
            <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>Founder & CEO</p>
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



