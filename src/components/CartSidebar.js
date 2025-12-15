






import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartSidebar = ({ isOpen, onClose }) => {
   const navigate = useNavigate();

  const handleCheckoutClick = () => {
    onClose();
    navigate('/checkout');
  };
  /*
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart, 
    
  } = useContext(CartContext);
   */
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart, getTotalPrice, getPrice } = useContext(CartContext);

 // const getPrice = (item) => item.price || 0;
/*
  const getTotalPrice = () => {
    return cartItems.reduce((acc, item) => acc + item.quantity * getPrice(item), 0);
  };
  */

  return (
    <div style={{ ...styles.sidebar, right: isOpen ? 0 : '-100%' }}>
      <div style={styles.header}>
        <h2>🛒 السلة</h2>
        <button onClick={onClose} style={styles.closeBtn}>✖</button>
      </div>

      <div style={styles.itemsContainer}>
        {cartItems.length === 0 ? (
          <p>لا توجد منتجات في السلة.</p>
        ) : (
          cartItems.map((item, index) => {
            const name = item.name;
            const image = item.image;
            const quantity = item.quantity;
            const price = getPrice(item);

            return (
              <div key={index} style={styles.item}>
                <img
                 
                   src={image}  // مباشرة رابط Cloudinary
                  alt={name}
                  style={styles.image}
                />
                <div style={{ flex: 1 }}>
                  <p><strong>{name}</strong></p>
                  <p>{price.toFixed(2)} درهم</p>

                  <div style={styles.quantityControls}>
                    <button
                      onClick={() => decreaseQuantity(item.productId)}
                      style={styles.qtyBtn}
                      disabled={quantity <= 1}
                    >
                      −
                    </button>
                    <span style={styles.qtyNumber}>{quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.productId)}
                      style={styles.qtyBtn}
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      style={styles.removeBtn}
                    >
                      🗑️
                    </button>
                  </div>

                  <p>المجموع: {(price * quantity).toFixed(2)} درهم</p>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div style={styles.footer}>
        <p><strong>الإجمالي:</strong> {getTotalPrice().toFixed(2)} درهم</p>
       
         <button onClick={handleCheckoutClick} style={styles.checkoutBtn}>🧾 تمرير الطلب</button>
      </div>
    </div>
  );
};
const styles = {
  sidebar: {
    position: "fixed",
    top: 0,
    right: 0,
    width: 350,
    height: "100%",
    backgroundColor: "#ffffff",
    boxShadow: "-3px 0 15px rgba(0,0,0,0.12)",
    padding: 20,
    transition: "right 0.35s cubic-bezier(0.25, 1, 0.5, 1)",
    zIndex: 9999,
    borderTopLeftRadius: 18,
    borderBottomLeftRadius: 18,
    display: "flex",
    flexDirection: "column",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 15,
    marginBottom: 10,
    borderBottom: "1px solid #e7e7e7",
  },

  closeBtn: {
    border: "none",
    background: "#f5f5f5",
    width: 32,
    height: 32,
    borderRadius: "50%",
    fontSize: 18,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    transition: "0.2s",
  },

  itemsContainer: {
    flex: 1,
    overflowY: "auto",
    paddingRight: 5,
  },

  item: {
    display: "flex",
    gap: 12,
    marginBottom: 18,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#fafafa",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    transition: "0.25s",
  },

  image: {
    width: 70,
    height: 70,
    objectFit: "cover",
    borderRadius: 10,
  },

  quantityControls: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginTop: 8,
  },

  qtyBtn: {
    backgroundColor: "#e0e0e0",
    border: "none",
    padding: "5px 12px",
    cursor: "pointer",
    fontSize: 16,
    borderRadius: 8,
    fontWeight: "bold",
    transition: "0.2s",
  },

  qtyNumber: {
    minWidth: 22,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },

  removeBtn: {
    backgroundColor: "#ffe5e5",
    color: "#ff3b30",
    border: "none",
    cursor: "pointer",
    fontSize: 16,
    padding: "4px 8px",
    borderRadius: 6,
    transition: "0.2s",
    marginLeft: "auto",
  },

  footer: {
    borderTop: "1px solid #e5e5e5",
    paddingTop: 15,
    paddingBottom: 10,
  },

  checkoutBtn: {
    
    margin: '15px 0 20px',
    width: "100%",
    backgroundColor: " #0d47a1",
    color: "#fff",
    border: "none",
    padding: "12px",
    borderRadius: 10,
    fontWeight: "bold",
    fontSize: 16,
    cursor: "pointer",
    transition: "0.25s",
    boxShadow: "0 4px 15px rgba(46, 204, 113, 0.4)",
  },
};


export default CartSidebar;


















