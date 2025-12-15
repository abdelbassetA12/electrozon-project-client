import React, { useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
 const apiUrl = process.env.REACT_APP_API_URL; // قراءة الرابط من .env
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiUrl}/api/auth/reset-password`, { token, newPassword: password });
      setMessage(res.data.message);
    } catch (err) {
      setError(err?.response?.data?.message || 'حدث خطأ');
    }
  };

  return (
    <div style={{ fontFamily: 'Cairo', direction: 'rtl', padding: '2rem', textAlign: 'center' }}>
      <h2>🔒 تعيين كلمة مرور جديدة</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="password"
          placeholder="كلمة المرور الجديدة"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: '0.75rem', borderRadius: '8px' }}
        />
        <button type="submit" style={{ padding: '0.75rem', backgroundColor: '#26a69a', color: 'white', border: 'none', borderRadius: '8px' }}>
          حفظ
        </button>
        {message && <p style={{ color: 'green' }}>{message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}

export default ResetPassword;
