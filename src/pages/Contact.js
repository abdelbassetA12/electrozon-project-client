



import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
import {  FaLinkedin, FaInstagram, FaEnvelope, FaGlobe, FaFacebook } from "react-icons/fa";
import { SiUpwork } from "react-icons/si";

export default function Contact() {
  const [inquiry, setInquiry] = useState("");
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryEmail, setInquiryEmail] = useState("");
   const apiUrl = process.env.REACT_APP_API_URL; // قراءة الرابط من .env

  const sendInquiry = async () => {
    if (!inquiryName || !inquiryEmail || !inquiry) {
     toast.warning("⚠️ All fields are required, including the rating");
      return;
    }
    try {
      await axios.post(`${apiUrl}/api/contact/inquiry`, {
        name: inquiryName,
        email: inquiryEmail,
        message: inquiry,
      });

      toast.success("Inquiry sent successfully");
      setInquiry("");
      setInquiryName("");
      setInquiryEmail("");
    } catch (err) {
      toast.error("❌ An error occurred: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="contact-us" style={{ overflowX: "hidden"}}>

       <style>{`
 
    
 


         @media (max-width: 768px) { 
         
         .contact-us{
         padding-top: 60px; 
         
         }
         
          }
 
         
       `}</style>




      <div className="contact-container">
        {/* قسم الاستفسارات */}
        <div className=" carts about">
          <h2><FaEnvelope /> Send Inquiry</h2>
          <input
            type="text"
            value={inquiryName}
            onChange={(e) => setInquiryName(e.target.value)}
            placeholder="Your Name"
          />
          <input
            type="email"
            value={inquiryEmail}
            onChange={(e) => setInquiryEmail(e.target.value)}
            placeholder=" Your Email"
          />
          <textarea
            value={inquiry}
            onChange={(e) => setInquiry(e.target.value)}
            placeholder=" Write your inquiry here... "
          />
          <button className="btn btn-inquiry" onClick={sendInquiry}>
           Send Inquiry
          </button>
        </div>

        {/* القسم الأيمن: روابط التواصل */}
        <div className=" card about">
          <h2><FaGlobe /> Get in Touch & Follow Me </h2>
          <p>You can follow us and contact us through the following platforms:</p>
          


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

      <Footer />

      {/* CSS */}
      <style>{`
        .contact-container {
          display: flex;
          justify-content: center;
          font-family: Tajawal, sans-serif;
          gap: 20px;
          max-width: 1200px;
          margin: 30px auto;
          flex-wrap: wrap;
          padding: 0 15px;
        }


         .about {
            flex: 1;
            background: #fff;
            padding: 30px 40px;
            border-radius: 15px;
            box-shadow: 0 15px 35px rgba(0,0,0,0.15);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
           .about:hover {
            transform: translateY(-5px);
            box-shadow: 0 25px 50px rgba(0,0,0,0.2);
          }

          .carts{
          padding-left: 20px;
          
          }




        .card {
          background: #fff;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          flex: 1;
          min-width: 300px;
          max-width: 500px;
        }
        h2 {
          margin-bottom: 15px;
          color: #333;
        }
        input, textarea {
          width: 100%;
          margin-bottom: 15px;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 14px;
        }
        textarea {
          min-height: 100px;
          resize: vertical;
        }
        .btn-inquiry {
          background: #007bff;
          color: #fff;
          padding: 10px 15px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          width: 100%;
          font-size: 16px;
        }
        .btn-inquiry:hover {
          background: #0056b3;
        }
      
      `}</style>
    </div>
  );
}







