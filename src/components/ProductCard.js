
import { MdShoppingCartCheckout } from "react-icons/md";



import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
/*
  const handleCardClick = () => {
    navigate(`/product/${product._id}`);
  };
  */
 



  // هدا زر الاضافة الى السلة القديم 
 /*
 <button
        onClick={(e) => {
          e.stopPropagation();
          addToCart(product);
        }}
        style={styles.cartButton}
        className="cart-button"
      >
        <MdShoppingCartCheckout size={20} />
      </button>


      
<button
  onClick={(e) => {
    e.stopPropagation(); // هذا يمنع تنفيذ handleCardClick على البطاقة
    if (product.options && product.options.length > 0) {
      // إذا كان المنتج له خيارات، نذهب للصفحة
      navigate(`/product/${product._id}`);
    } else {
      // إذا لم يكن له خيارات، نضيفه مباشرة للسلة
      addToCart(product);
    }
  }}
  style={styles.cartButton}
  className="cart-button"
>
  <MdShoppingCartCheckout size={20} />
</button>

      */


/*
  const handleCardClick = (e) => {

  if (product.options && product.options.length > 0) {
    // إذا كان المنتج يحتوي خيارات، نذهب لصفحة التفاصيل
    navigate(`/product/${product._id}`);
  } else {
    // إذا لم يحتوي على خيارات، نضيفه مباشرة للسلة
    addToCart(product);
  }
};
*/
const handleCardClick = () => {
  // دائماً نفتح صفحة التفاصيل عند الضغط على الكارد
  navigate(`/product/${product._id}`);
};



  const discountPercent =
    product.discount?.isActive && product.finalPrice < product.price
      ? product.discount.type === "percentage"
        ? product.discount.value
        : Math.round(
            ((product.price - product.finalPrice) / product.price) * 100
          )
      : null;

  return (
    <div style={styles.card} className="product-card" onClick={handleCardClick}>
      {discountPercent && (
        <div style={styles.discountBadge}>-{discountPercent}%</div>
      )}

      <div style={styles.imageWrapper}>
        <img
          
        
            src={product.image}  // مباشرة رابط Cloudinary
          alt={product.name}
          style={styles.image}
        />
      </div>

      <div style={styles.content}>
        <h3 style={styles.name}>{product.name}</h3>

        <div style={styles.prices}>
          <span style={styles.currentPrice}>
            {product.finalPrice && product.discount?.isActive
              ? `${product.finalPrice} د.م`
              : `${product.price} د.م`}
          </span>

          {product.discount?.isActive && product.finalPrice < product.price && (
            <span style={styles.oldPrice}>{product.price} د.م</span>
          )}
        </div>

        <p style={styles.category}>{product.category?.name}</p>
      </div>

     

<button
  onClick={(e) => {
    e.stopPropagation(); // يمنع تنفيذ handleCardClick عند الضغط على الزر
    if (product.options && product.options.length > 0) {
      // إذا كان للمنتج خيارات، نذهب لصفحة التفاصيل
      navigate(`/product/${product._id}`);
    } else {
      // إذا لم يكن له خيارات، نضيفه مباشرة للسلة
      addToCart(product);
    }
  }}
  style={styles.cartButton}
  className="cart-button"
>
  <MdShoppingCartCheckout size={20} />
</button>












     
    </div>
  );
}

const styles = {
  card: {
   width: 240,
    


   

    borderRadius: 18,
    overflow: "hidden",
    position: "relative",
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
    border: "2px solid #ceb7b741",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.06)",
    transition: "transform 0.35s ease, box-shadow 0.35s ease",
  },
  
  imageWrapper: {
    width: "100%",
    height: "270px",
    overflow: "hidden",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.5s ease",
  },

  discountBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    background: "linear-gradient(135deg, #ff5f6d, #ff3c3c)",
    color: "#fff",
    padding: "5px 10px",
    fontSize: 13,
    fontWeight: "700",
    borderRadius: 6,
    zIndex: 3,
    boxShadow: "0 2px 10px rgba(255,0,0,0.25)",
  },

  content: {
    padding: "14px",
  },

  name: {
    fontSize: 15,
    fontWeight: "bold",
    margin: "5px 0",
    color: "#222",
    lineHeight: "1.4",
  },

  prices: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    margin: "8px 0",
  },

  currentPrice: {
    color: "#ff3c3c",
    fontWeight: "bold",
    fontSize: 16,
  },

  oldPrice: {
    textDecoration: "line-through",
    color: "#999",
    fontSize: 14,
  },

  category: {
    fontSize: 13,
    color: "#555",
    marginTop: 4,
  },

  cartButton: {
    position: "absolute",
    bottom: 14,
    right: 14,
   
    background: "linear-gradient(135deg, #000dc8bd, #00629aff)",
    border: "none",
    borderRadius: "50%",
    padding: 12,
    color: "#fff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.25)",
    transition: "transform 0.25s, box-shadow 0.25s",
  },
};

// Hover effects
const styleSheet = document.styleSheets[0];

styleSheet.insertRule(`
  .product-card:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 12px 28px rgba(0,0,0,0.18);
  }
`, styleSheet.cssRules.length);

styleSheet.insertRule(`
  .product-card:hover img {
    transform: scale(1.12);
  }
`, styleSheet.cssRules.length);

styleSheet.insertRule(`
  .product-card:hover .cart-button {
    transform: scale(1.25);
    box-shadow: 0 6px 16px rgba(0,0,0,0.35);
  }
`, styleSheet.cssRules.length);

export default ProductCard;

