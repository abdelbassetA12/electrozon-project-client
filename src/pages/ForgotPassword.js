import React, { useState } from 'react';
import axios from 'axios';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
   const apiUrl = process.env.REACT_APP_API_URL; // قراءة الرابط من .env

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const res = await axios.post(`${apiUrl}/api/auth/forgot-password`, { email });
      setMessage(res.data.message);
    } catch (err) {
      const msg = err?.response?.data?.message || 'حدث خطأ';
      setError(msg);
    }
  };

  return (
    <div style={{ fontFamily: 'Cairo', direction: 'rtl', padding: '2rem', textAlign: 'center' }}>
      <h2>🔑 استعادة كلمة المرور</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="email"
          placeholder="أدخل بريدك الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: '0.75rem', borderRadius: '8px' }}
        />
        <button type="submit" style={{ padding: '0.75rem', backgroundColor: '#26a69a', color: 'white', border: 'none', borderRadius: '8px' }}>
          إرسال رابط إعادة التعيين
        </button>
        {message && <p style={{ color: 'green' }}>{message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}

export default ForgotPassword;
