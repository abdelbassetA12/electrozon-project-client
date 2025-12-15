
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';


function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
   const apiUrl = process.env.REACT_APP_API_URL; // قراءة الرابط من .env
const isVerified = new URLSearchParams(location.search).get('verified') === '1';


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      const res = await axios.post(`${apiUrl}/api/auth/login`, { email, password });
      localStorage.setItem('token', res.data.token);
      //onLogin(res.data.user);

 

      const me = await axios.get(`${apiUrl}/api/auth/me`, {
  headers: { Authorization: `Bearer ${res.data.token}` },
});
onLogin(me.data); // ✅ بيانات دقيقة





      setTimeout(() => {
        navigate('/');
      }, 300);
    } catch (err) {
      console.log("⚠️ Axios Error:", err.response || err.message || err);
      const message = err?.response?.data?.message || '⚠️ حدث خطأ أثناء تسجيل الدخول';
      setErrorMsg(message);
    }
  };

  const styles = {
    page: {
      fontFamily: 'Cairo, sans-serif',
      background: 'linear-gradient(to right, #e0f7fa, #f1f8e9)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      margin: 0,
      padding: '1rem',
      direction: 'rtl',
    },
    form: {
      backgroundColor: '#fff',
      padding: '2rem',
      borderRadius: '20px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '400px',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    },
    input: {
      padding: '0.75rem 1rem',
      border: '1px solid #ccc',
      borderRadius: '12px',
      fontSize: '1rem',
      transition: '0.3s ease',
    },
    button: {
      padding: '0.75rem',
      backgroundColor: '#26a69a',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      fontSize: '1rem',
      cursor: 'pointer',
      transition: 'background 0.3s ease',
    },
    message: {
      textAlign: 'center',
      marginTop: '1rem',
      fontWeight: 'bold',
      color: 'red',
    },
    link: {
      textAlign: 'center',
      marginTop: '1rem',
      fontSize: '0.95rem',
      color: '#00796b',
      textDecoration: 'none',
    },
    linkHover: {
      textDecoration: 'underline',
    }
  };


   

  return (
     
    <div style={styles.page}>

       
    

      <form style={styles.form} onSubmit={handleSubmit}>
        <h2 style={{ textAlign: 'center', color: '#333' }}>🔐 تسجيل الدخول</h2>

        {isVerified && (
  <p style={{ color: 'green', textAlign: 'center', fontWeight: 'bold' }}>
    ✅ تم تأكيد البريد بنجاح! يمكنك تسجيل الدخول الآن.
  </p>
)}
        <input
          type="email"
          placeholder="البريد الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>دخول</button>

        {errorMsg && <p style={styles.message}>{errorMsg}</p>}
        <Link to="/forgot-password" style={styles.link}>
  نسيت كلمة المرور؟
</Link>


        <Link to="/register" style={styles.link}>
          ليس لديك حساب؟ أنشئ حسابًا الآن
        </Link>
      </form>
    </div>
  );
}

export default Login;
