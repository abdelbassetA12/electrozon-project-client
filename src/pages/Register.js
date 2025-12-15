import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '', referralCode: '' });
  const [message, setMessage] = useState('');
   const apiUrl = process.env.REACT_APP_API_URL; // قراءة الرابط من .env
  const location = useLocation();

  useEffect(() => {
    const refCode = new URLSearchParams(location.search).get('ref');
    if (refCode) {
      setForm(prev => ({ ...prev, referralCode: refCode }));
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await axios.post(`${apiUrl}/api/auth/register`, form);
      setMessage(res.data.message || '✅ تم إنشاء الحساب. الرجاء التحقق من بريدك الإلكتروني.');
    } catch (err) {
      setMessage(err?.response?.data?.message || '⚠️ فشل التسجيل');
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
    },
    link: {
      textAlign: 'center',
      marginTop: '1rem',
      fontSize: '0.95rem',
      color: '#00796b',
      textDecoration: 'none',
    }
  };

  return (
    <div style={styles.page}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2 style={{ textAlign: 'center', color: '#333' }}>إنشاء حساب</h2>
        <input
          style={styles.input}
          type="text"
          placeholder="اسم المستخدم"
          onChange={e => setForm({ ...form, username: e.target.value })}
          required
        />
        <input
          style={styles.input}
          type="email"
          placeholder="البريد الإلكتروني"
          onChange={e => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          style={styles.input}
          type="password"
          placeholder="كلمة المرور"
          onChange={e => setForm({ ...form, password: e.target.value })}
          required
        />
        <button style={styles.button} type="submit">تسجيل</button>

        {message && (
          <p style={{
            ...styles.message,
            color: message.includes('فشل') ? 'red' : 'green'
          }}>
            {message}
          </p>
        )}

        <Link to="/login" style={styles.link}>
          لديك حساب؟ تسجيل الدخول
        </Link>
      </form>
    </div>
  );
}

export default Register;















