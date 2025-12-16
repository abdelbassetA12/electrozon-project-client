import React, { useEffect, useState, useContext, useCallback } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { SearchContext } from '../context/SearchContext';
import { useLocation } from 'react-router-dom';
import Loader from "../components/Loader";
import Footer from '../components/Footer';
import { toast } from 'react-toastify';



function Product() {
  const [products, setProducts] = useState([]);
 const [loading, setLoading] = useState(true);
  const { searchQuery } = useContext(SearchContext);
   const apiUrl = process.env.REACT_APP_API_URL; // قراءة الرابط من .env

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categorySlug = queryParams.get('category');

  const fetchProducts = useCallback(async () => {
    try {
       setLoading(true); // ✅ قبل الجلب
      const url = categorySlug
        ? `${apiUrl}/api/products/by-category/${categorySlug}`
        : `${apiUrl}/api/products/all`;


        const res = await axios.get(url);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
     
      toast.error(' فشل جلب المنتجات');

    }finally {
    setLoading(false); // ✅ بعد الانتهاء
  }
  }, [categorySlug]); // تم حل التحذير هنا ✔

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]); // الآن بدون تحذير ✔

  // فلترة حسب الفئة والبحث
  const filteredProducts = products.filter((p) => {
    const matchesCategory = !categorySlug || p.category?.slug === categorySlug;
    const matchesSearch = (p.name || '').toLowerCase().includes((searchQuery || '').toLowerCase());
    return matchesCategory && matchesSearch;
  });

    if (loading) return <Loader text="جاري تحميل البيانات..." />
 


  return (
    <div className='product-contant' >
      <style>{`
         .projects-grid { 
         
        

                   padding: 32px;
  display: grid;

  /* ✅ الحل */
  grid-template-columns: repeat(auto-fill, 240px);
  gap: 20px;
  justify-content: start;


          
          }






          .empty-state {
  min-height: 50vh;
grid-column: 1 / -1;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  opacity: 0.85;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 12px;
}

.empty-state h3 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 6px;
}

.empty-state p {
  font-size: 14px;
  color: #9ca3af;
  max-width: 320px;
  line-height: 1.6;
}




   

         @media (max-width: 768px) { .projects-grid {
          grid-template-columns: 1fr; 
           justify-items: center;
            } 

            .product-contant{
            padding-top: 80px; 
            
            }
          
          
          
          
            }
       `}</style>

      
 <h2 style={{ textAlign: 'center', marginBottom: 20 }}>المنتجات  </h2>
      <div className="projects-grid fade-in">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(p => (
            <ProductCard key={p._id} product={p} />
          ))
        ) : (
          
          <div className="empty-state">
  <div className="empty-icon">🛒</div>
  <h3>لا توجد منتجات</h3>
  <p>لم يتم العثور على منتجات تطابق بحثك أو هذه الفئة</p>
</div>
        )}
      </div>
      <Footer />
    </div>
  );
}



export default Product;

