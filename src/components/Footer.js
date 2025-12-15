import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaLinkedin, FaGithub, FaInstagram, FaYoutube } from "react-icons/fa";
import { SiUpwork } from "react-icons/si";

const Footer = ({ user }) => {
  const styles = {
    footer: {
      margin: ' 3rem',
      backgroundColor: '#1f2937', // داكن عصري
      color: '#f9fafb',
      padding: '4rem 1rem',
      fontFamily: 'Tajawal, sans-serif',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      gap: '2rem',
    },
    column: {
      flex: '1 1 200px',
    },
    heading: {
      fontWeight: 'bold',
      marginBottom: '1rem',
      fontSize: '1.1rem',
      color: '#fff',
      borderBottom: '2px solid #2563eb',
      display: 'inline-block',
      paddingBottom: '4px',
    },
    link: {
      display: 'block',
      textDecoration: 'none',
      color: '#d1d5db',
      
      marginBottom: '0.5rem',
      transition: 'color 0.3s ease',
    },
    linkHover: {
      color: '#2563eb',
    },
    bottom: {
      borderTop: '1px solid #374151',
      marginTop: '2rem',
      paddingTop: '1.5rem',
      textAlign: 'center',
      fontSize: '0.85rem',
      color: '#9ca3af',
    },
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* روابط الموقع */}
        <div style={styles.column}>
          <h4 style={styles.heading}> Site Links </h4>
          <NavLink to="/"   className="footer-link">Home</NavLink>
          <NavLink to="/contact"  className="footer-link">Contact Us</NavLink>
          <NavLink to="/resume"  className="footer-link">Resume</NavLink>
          <NavLink to="/projects-list"  className="footer-link">Projects</NavLink>
       
        </div>

        {/* معلومات إضافية */}
        <div style={styles.column}>
          <h4 style={styles.heading}>Information</h4>
          <p style={{ color: '#d1d5db', lineHeight: '1.6' }}>
           AB Portfolio — All rights reserved. Here you can find the latest projects and digital services in a professional and seamless way.
          </p>







            
        
             <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "25px",
            marginTop: "20px",
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

      <div style={styles.bottom}>
        © {new Date().getFullYear()} All Rights Reserved — AB Portfolio
      </div>

      <style>{`
       
       
        .footer-link {
        color: #d1d5db;
        display: block;
      
      text-decoration: none;
      marginBottom: 0.5rem;
      transition: color 0.3s ease;
        
        }


        .footer-link:hover {
      color: #2563eb;
    },
        





       

          /* ✅ تحسين الاستجابة */
        @media (max-width: 992px) {
          footer div[style*="display: flex"][style*="justify-content: space-between"] {
            flex-direction: column;
            align-items: center;
            
          }
          footer div[style*="flex: 1 1 200px"] {
            min-width: 100%;
          }
        }

        @media (max-width: 600px) {
          footer {
            padding: 2rem 1rem;
          }
          .footer-link {
            margin-bottom: 0.75rem;
            font-size: 0.95rem;
          }
          footer h4 {
            font-size: 1rem !important;
          }
          footer p {
            font-size: 0.9rem;
          }
          footer div[style*="font-size: 36px"] {
            font-size: 28px !important;
            gap: 18px !important;
          }
        }

        @media (max-width: 400px) {
          footer div[style*="font-size: 36px"] {
            font-size: 24px !important;
            gap: 15px !important;
          }
        }







      `}</style>
    </footer>
  );
};

export default Footer;




