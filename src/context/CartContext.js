



// هدا ينقل السعر النهائي في خاصية الاوبشنز

import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
   const apiUrl = process.env.REACT_APP_API_URL; // قراءة الرابط من .env

  // تحميل السلة من localStorage أو DB
  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedCart = localStorage.getItem('cartItems');
    const localCartItems = savedCart ? JSON.parse(savedCart) : [];

    if (!token) {
      setCartItems(localCartItems);
      return;
    }

    const fetchCart = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/cart`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('فشل جلب السلة');
        const data = await res.json();

        let dbCartItems = data.items.map(item => {
          const product = item.productId;
          let finalPrice = product.price;
          if (product.discount && product.discount.isActive) {
            if (product.discount.type === 'percentage') {
              finalPrice = product.price - (product.price * product.discount.value / 100);
            } else if (product.discount.type === 'fixed') {
              finalPrice = product.price - product.discount.value;
            }
          }
          return {
            productId: product._id.toString(),
            name: product.name,
            image: product.image,
            
           price: finalPrice,

            quantity: item.quantity,
            selectedOptions: item.selectedOptions || {},
          };
        });

        // دمج localStorage مع DB
        for (const localItem of localCartItems) {
          const existingIndex = dbCartItems.findIndex(i => i.productId === localItem.productId);
          if (existingIndex > -1) {
            dbCartItems[existingIndex].quantity = localItem.quantity;
          } else {
            dbCartItems.push(localItem);
          }
        }

        setCartItems(dbCartItems);
        localStorage.removeItem('cartItems');
      } catch (err) {
        console.error(err);
        setCartItems(localCartItems);
      }
    };

    fetchCart();
  }, []);

  // حفظ السلة في localStorage إذا المستخدم غير مسجل
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token && cartItems.length > 0) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // تحديث الكمية
  const updateQuantity = (productId, newQuantity) => {
    setCartItems(prev => prev.map(item =>
      item.productId === productId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const increaseQuantity = (productId) => {
    const item = cartItems.find(i => i.productId === productId);
    if (item) updateQuantity(productId, item.quantity + 1);
  };

  const decreaseQuantity = (productId) => {
    const item = cartItems.find(i => i.productId === productId);
    if (item && item.quantity > 1) updateQuantity(productId, item.quantity - 1);
  };
const addToCart = (product) => {
  const sellingPrice = product.discount?.isActive ? product.finalPrice : product.price;

  setCartItems(prev => {
    const existing = prev.find(i =>
      i.productId === product._id &&
      JSON.stringify(i.selectedOptions) === JSON.stringify(product.selectedOptions || {})
    );
    if (existing) {
      return prev.map(i =>
        i === existing ? { ...i, quantity: i.quantity + 1 } : i
      );
    } else {
      return [...prev, {
        productId: product._id,
        name: product.name,
        image: product.image,
        price: sellingPrice,  // ✅ السعر النهائي بعد التخفيض
        quantity: 1,
        selectedOptions: product.selectedOptions || {}
      }];
    }
  });
};

 

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(i => i.productId !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
  };

  const getPrice = (item) => {
    let price = item.price;
    if (item.selectedOptions) {
      Object.values(item.selectedOptions).forEach(opt => {
        if (opt.priceModifier) price += opt.priceModifier;
      });
    }
    return price;
  };

  const getTotalPrice = () => cartItems.reduce((acc, i) => acc + getPrice(i) * i.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      getTotalPrice,
      getPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};

