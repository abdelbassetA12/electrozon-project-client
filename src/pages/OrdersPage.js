


import React, { useEffect, useState } from 'react';

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
   const apiUrl = process.env.REACT_APP_API_URL; // قراءة الرابط من .env

  const getStatusColor = (status) => {
    switch (status) {
      case 'قيد الانتظار':
        return 'status pending';
      case 'قيد الشحن':
        return 'status shipping';
      case 'تم التسليم':
        return 'status delivered';
      case 'ملغي':
        return 'status canceled';
      default:
        return 'status';
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('🔒 يجب تسجيل الدخول لعرض طلباتك');
      return;
    }

    try {
      const res = await fetch(`${apiUrl}/api/orders/my-orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await res.json();
      setOrders(data);
      setLoading(false);
    } catch (error) {
      console.error('❌ خطأ أثناء جلب الطلبات:', error);
      setLoading(false);
    }
  };

  if (loading) return <p className="loading">🔄 جاري التحميل...</p>;

  return (
    <div className="orders-container">
      <h2 className="title">📦 طلباتي</h2>

      {orders.length === 0 ? (
        <p className="empty">🚫 لا توجد طلبات بعد.</p>
      ) : (
        <div className="table-card">
          <table className="orders-table">
            <thead>
              <tr>
                <th>رقم الطلب</th>
                <th>الاسم الكامل</th>
                <th>الهاتف</th>
                <th>المدينة</th>
                <th>الإجمالي</th>
                <th>الحالة</th>
                <th>المنتجات</th>
                <th>التاريخ</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order, i) => (
                <tr key={i}>
                  <td>{order._id}</td>
                  <td>{order.firstName} {order.lastName}</td>
                  <td>{order.phone}</td>
                  <td>{order.city}</td>
                  <td className="price">{order.totalPrice} درهم</td>

                  <td>
                    <span className={getStatusColor(order.status)}>
                      {order.status}
                    </span>
                  </td>

                  <td>
                    <details>
                      <summary className="show-products">عرض المنتجات</summary>
                      <ul className="products-list">
                        {order.products.map((item, idx) => (
                          



                          <li key={idx} style={{ marginBottom: "10px", textAlign: "right" }}>

  <strong>{item.name}</strong> — {item.quantity} × {item.price}  
  = <b>{item.price * item.quantity} درهم</b>

  {/* عرض الخيارات */}
  {item.selectedOptions && item.selectedOptions.length > 0 && (
    <ul style={{ marginTop: "5px", marginRight: "20px" }}>
      {item.selectedOptions.map((opt, i) => (
        <li key={i}>
          ⚙️ {opt.name}: {opt.value}
          {opt.priceModifier > 0 ? ` (+${opt.priceModifier} درهم)` : ""}
        </li>
      ))}
    </ul>
  )}

  {/* صورة المنتج */}
  {item.productId && item.productId.image && (
    <img 
      src={item.productId.image} 
      alt={item.name} 
      style={{ width: "80px", marginTop: "5px", borderRadius: "8px" }} 
    />
  )}

</li>





                        ))}
                      </ul>
                    </details>
                  </td>

                  <td className="date">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* CSS داخل نفس الصفحة */}
      <style>{`
        .orders-container {
          max-width: 1100px;
          margin: 30px auto;
          padding: 20px;
          direction: rtl;
          font-family: sans-serif;
        }

        .title {
          text-align: center;
          font-size: 28px;
          font-weight: bold;
          margin-bottom: 20px;
          color: #333;
        }

        .loading, .empty {
          text-align: center;
          font-size: 18px;
          color: #555;
        }

        .table-card {
          background: #fff;
          padding: 15px;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          overflow-x: auto;
        }

        .orders-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 900px;
        }

        .orders-table th {
          background: #f4f4f4;
          padding: 12px;
          font-weight: bold;
          border-bottom: 2px solid #ddd;
          color: #333;
          text-align: center;
        }

        .orders-table td {
          padding: 10px;
          border-bottom: 1px solid #eee;
          text-align: center;
          color: #444;
        }

        .orders-table tr:hover {
          background: #fafafa;
        }

        .price {
          font-weight: bold;
          color: #0a7a20;
        }

        /* شارات الحالة */
        .status {
          padding: 5px 10px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: bold;
          display: inline-block;
        }

        .pending {
          background: #ffe7c2;
          color: #c77f00;
        }

        .shipping {
          background: #cfe1ff;
          color: #0052cc;
        }

        .delivered {
          background: #d4f8d4;
          color: #1d7c1d;
        }

        .canceled {
          background: #ffd4d4;
          color: #bb0000;
        }

        /* المنتجات */
        details summary {
          cursor: pointer;
          color: #0066cc;
          font-weight: bold;
        }

        .products-list {
          margin-top: 10px;
        }

        .products-list li {
          text-align: right;
          margin-bottom: 5px;
          color: #555;
        }

        .date {
          color: #888;
          font-size: 12px;
        }
      `}</style>
    </div>
  );
}

export default OrdersPage;











/*

import React, { useEffect, useState } from 'react';

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const getStatusColor = (status) => {
  switch(status) {
    case 'قيد الانتظار':
      return 'orange';
    case 'قيد الشحن':
      return 'blue';
    case 'تم التسليم':
      return 'green';
    case 'ملغي':
      return 'red';
       default:
      return 'black';
   
  }
};

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('🔒 يجب تسجيل الدخول لعرض طلباتك');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/orders/my-orders', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setOrders(data);
      setLoading(false);
    } catch (error) {
      console.error('❌ خطأ أثناء جلب الطلبات:', error);
      setLoading(false);
    }
  };

  if (loading) return <p>🔄 جاري التحميل...</p>;

  return (
    <div style={{ maxWidth: 600, margin: '30px auto', padding: 20 }}>
      <h2>📦 طلباتي</h2>

      {orders.length === 0 ? (
        <p>🚫 لا توجد طلبات بعد.</p>
      ) : (
        orders.map((order, i) => (
          <div key={i} style={{
            border: '1px solid #ddd',
            borderRadius: 8,
            padding: 10,
            marginBottom: 10
          }}>
            <h4>🧾 طلب رقم: {order._id}</h4>
            <p><strong>الاسم:</strong> {order.firstName} {order.lastName}</p>
            <p><strong>الهاتف:</strong> {order.phone}</p>
            <p><strong>المدينة:</strong> {order.city}</p>
            <p><strong>الإجمالي:</strong> {order.totalPrice} درهم</p>
           
            <p>
  <strong>الحالة:</strong>{' '}
  <span style={{ 
    color: getStatusColor(order.status), 
    fontWeight: 'bold' 
  }}>
    {order.status}
  </span>
</p>



            <div>
              <strong>المنتجات:</strong>
              <ul>
                {order.products.map((item, idx) => (
                  <li key={idx}>
                    {item.name} x {item.quantity} = {item.price * item.quantity} درهم
                  </li>
                ))}
              </ul>
            </div>

            <p style={{ fontSize: 12, color: '#888' }}>
              📅 تم إنشاؤه في: {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default OrdersPage;
*/