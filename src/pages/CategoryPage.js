import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

function CategoryPage() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL; // قراءة الرابط من .env

  useEffect(() => {
    fetchCategoryProducts();
  }, [categoryName]);

  const fetchCategoryProducts = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/products/category/${categoryName}`);
      setProducts(res.data);
    } catch (err) {
      console.error('❌ خطأ في جلب منتجات الفئة:', err);
    }
  };
 

  return (
    <div style={{ padding: '20px' }}>
      <h2>فئة: {categoryName}</h2>
      <div style={{   
        display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', // ✅ استخدم auto-fill
    gap: '10px', // ✅ قلل الفراغات بين الكروت
    justifyContent: 'center', // ✅ وسط البطاقات
    alignItems: 'start', // ✅ اجعلها تبدأ من الأعلى بشكل مرتب
    padding: '10px', // ✅ مساحة خارجية خفيفة لجمالية العرض
       }}>
        {products.map(products=> (
          
           <ProductCard key={products._id} product={products} />
        ))}
      </div>
    </div>
    



 
  );
}

export default CategoryPage;
