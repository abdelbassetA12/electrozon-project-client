import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';

function CheckoutPage() {
  const { cartItems, getTotalPrice, clearCart } = useContext(CartContext);
   const apiUrl = process.env.REACT_APP_API_URL; // قراءة الرابط من .env

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    city: '',
    address: '',
    email: '',
  });

  const [showRegisterOption, setShowRegisterOption] = useState(false);
  const [password, setPassword] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.phone || !form.city) {
      alert('📝 المرجو ملء جميع الحقول الإجبارية.');
      return;
    }

    if (form.email) {
      setShowRegisterOption(true);
    } else {
      sendOrder();
    }
  };

const sendOrder = async () => {
  try {
    const token = localStorage.getItem('token');
    console.log("🔑 Token to send:", token);

    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }), // ✅ لا ترسل الهيدر إذا لا يوجد توكن
    };

    const res = await fetch(`${apiUrl}/api/orders/create`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        ...form,
        products: cartItems,
        totalPrice: getTotalPrice(),
      }),
    });

    const data = await res.json();
    if (res.ok) {
      alert('✅ تم إرسال الطلب بنجاح!');
      clearCart();
    } else {
      alert(data.message || '❌ حدث خطأ أثناء إرسال الطلب');
    }
  } catch (error) {
    console.error("❌ خطأ أثناء إرسال الطلب:", error);
  }
};



  /*const sendOrder = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          products: cartItems,
          totalPrice: getTotalPrice(),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert('✅ تم إرسال الطلب بنجاح!');
        clearCart();
      } else {
        alert(data.message || '❌ حدث خطأ أثناء إرسال الطلب');
      }
    } catch (error) {
      console.error("❌ خطأ أثناء إرسال الطلب:", error);
    }
  };*/

  const handleRegisterAndOrder = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/orders/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          password,
          products: cartItems,
          totalPrice: getTotalPrice(),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert('✅ تم إنشاء الحساب وإرسال الطلب بنجاح!');
        clearCart();
      } else {
        alert(data.message || '❌ حدث خطأ أثناء إرسال الطلب');
      }
    } catch (error) {
      console.error("❌ خطأ أثناء إنشاء الحساب أو إرسال الطلب:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🧾 تأكيد الطلب</h2>

      <h3 style={styles.subtitle}>🛒 المنتجات:</h3>
      <div style={styles.productsList}>
        {cartItems.map((item, i) => (
          <div key={i} style={styles.productItem}>
            <div>
              <p style={styles.productName}><strong>{item.name}</strong> x {item.quantity}</p>
              <p style={styles.productPrice}>{item.price} درهم للواحدة</p>
            </div>
          </div>
        ))}
        <p style={styles.total}><strong>الإجمالي: {getTotalPrice()} درهم</strong></p>
      </div>

      <h3 style={styles.subtitle}>📄 معلوماتك</h3>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text" name="firstName" placeholder="الاسم" value={form.firstName} onChange={handleChange} required style={styles.input} />
        <input type="text" name="lastName" placeholder="النسب" value={form.lastName} onChange={handleChange} required style={styles.input} />
        <input type="text" name="phone" placeholder="الهاتف" value={form.phone} onChange={handleChange} required style={styles.input} />
        <input type="text" name="city" placeholder="المدينة" value={form.city} onChange={handleChange} required style={styles.input} />
        <input type="text" name="address" placeholder="العنوان (اختياري)" value={form.address} onChange={handleChange} style={styles.input} />
        <input type="email" name="email" placeholder="الإيميل (اختياري)" value={form.email} onChange={handleChange} style={styles.input} />

        <button type="submit" style={styles.submitBtn}>🧾 اتمام الطلب</button>
      </form>

      {showRegisterOption && (
        <div style={styles.registerBox}>
          <h4 style={styles.registerTitle}>🔒 هل ترغب في فتح حساب بهذه المعلومات؟</h4>
          <input
            type="password"
            placeholder="كلمة المرور للحساب"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleRegisterAndOrder} style={styles.registerBtn}>✅ نعم، فتح الحساب وإرسال الطلب</button>
          <button onClick={sendOrder} style={styles.skipBtn}>🚫 تخطي، إرسال الطلب بدون حساب</button>
        </div>
      )}
    </div>
  );
}


const styles = {
  container: {
    maxWidth: 720,
    margin: '60px auto',
    padding: '30px 28px',
    background: 'linear-gradient(180deg, #ffffff, #f9fafb)',
    borderRadius: 20,
    boxShadow: '0 20px 50px rgba(0,0,0,0.08)',
    fontFamily: "'Segoe UI', Tahoma, sans-serif",
  },

  title: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 700,
    marginBottom: 30,
    color: '#1f2937',
  },

  subtitle: {
    fontSize: 20,
    fontWeight: 600,
    marginTop: 35,
    marginBottom: 15,
    color: '#111827',
    borderLeft: '4px solid #10b981',
    paddingLeft: 10,
  },

  productsList: {
    backgroundColor: '#f9fafb',
    borderRadius: 14,
    padding: 16,
    border: '1px solid #e5e7eb',
  },

  productItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 0',
    borderBottom: '1px dashed #e5e7eb',
  },

  productName: {
    fontSize: 15,
    fontWeight: 600,
    color: '#1f2937',
    margin: 0,
  },

  productPrice: {
    fontSize: 14,
    color: '#0d47a1',
      
    margin: 0,
  },

  total: {
    textAlign: 'right',
    marginTop: 18,
    fontSize: 18,
    fontWeight: 700,
    color: '#111827',
  },

  form: {
    marginTop: 25,
    display: 'grid',
    gridTemplateColumns: ' 1fr',
    gap: 14,
  },

  input: {
    padding: '14px 12px',
    borderRadius: 10,
    border: '1px solid #d1d5db',
    fontSize: 15,
    outline: 'none',
    transition: '0.3s',
  },

  submitBtn: {
    gridColumn: '1 / -1',
    marginTop: 10,
  
     backgroundColor: " #0d47a1",
    color: '#fff',
    padding: 16,
    border: 'none',
    borderRadius: 14,
    fontSize: 17,
    fontWeight: 600,
    cursor: 'pointer',
    boxShadow: '0 10px 25px rgba(16,185,129,0.35)',
    transition: '0.3s',
  },

  registerBox: {
    marginTop: 35,
    padding: 24,
    borderRadius: 18,
    background: 'linear-gradient(180deg, #f9fafb, #ffffff)',
    border: '1px solid #e5e7eb',
    textAlign: 'center',
    boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
  },

  registerTitle: {
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 14,
    color: '#1f2937',
  },

  registerBtn: {
    background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
    color: '#fff',
    padding: 14,
    border: 'none',
    borderRadius: 12,
    cursor: 'pointer',
    marginTop: 12,
    width: '100%',
    fontSize: 15,
    fontWeight: 600,
    boxShadow: '0 8px 22px rgba(37,99,235,0.35)',
    transition: '0.3s',
  },

  skipBtn: {
    backgroundColor: '#f3f4f6',
    color: '#374151',
    padding: 14,
    border: '1px solid #d1d5db',
    borderRadius: 12,
    cursor: 'pointer',
    marginTop: 12,
    width: '100%',
    fontSize: 14,
    fontWeight: 500,
    transition: '0.3s',
  },
};





export default CheckoutPage;


