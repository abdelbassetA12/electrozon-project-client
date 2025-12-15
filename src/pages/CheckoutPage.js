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
    maxWidth: 600,
    margin: '30px auto',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    marginTop: 30,
    marginBottom: 10,
  },
  productsList: {
    border: '1px solid #eee',
    borderRadius: 8,
    padding: 10,
  },
  productItem: {
    borderBottom: '1px solid #ddd',
    padding: '10px 0',
  },
  productName: {
    margin: 0,
  },
  productPrice: {
    margin: 0,
    color: '#27ae60',
  },
  total: {
    textAlign: 'right',
    marginTop: 10,
    fontSize: 16,
  },
  form: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  input: {
    padding: 10,
    borderRadius: 6,
    border: '1px solid #ccc',
    fontSize: 15,
  },
  submitBtn: {
    backgroundColor: '#27ae60',
    color: '#fff',
    padding: 12,
    border: 'none',
    borderRadius: 6,
    fontSize: 16,
    cursor: 'pointer',
  },
  registerBox: {
    marginTop: 30,
    padding: 20,
    border: '1px solid #eee',
    borderRadius: 8,
    backgroundColor: '#fafafa',
    textAlign: 'center',
  },
  registerTitle: {
    marginBottom: 10,
  },
  registerBtn: {
    backgroundColor: '#2980b9',
    color: '#fff',
    padding: 10,
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    marginTop: 10,
    width: '100%',
  },
  skipBtn: {
    backgroundColor: '#ddd',
    color: '#333',
    padding: 10,
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    marginTop: 10,
    width: '100%',
  },
};

export default CheckoutPage;


