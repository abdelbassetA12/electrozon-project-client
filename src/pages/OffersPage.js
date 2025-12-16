import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import Loader from "../components/Loader";
import { toast } from 'react-toastify';
import Footer from '../components/Footer';


function OffersPage() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
   const apiUrl = process.env.REACT_APP_API_URL; // قراءة الرابط من .env

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/products/offers/active`);
      setOffers(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
     toast.error(' فشل جلب المنتجات');

      setLoading(false);
    }
  };

  //     if (loading) return <p style={{ textAlign: 'center' }}>🔄 جاري التحميل...</p>;
   if (loading) return <Loader text="جاري تحميل البيانات..." />;

  return (
    <div className='grid-offers' >
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
    
 
 
        
 





      


         @media (max-width: 768px) { .grid-offers {
         padding-top: 70px;
         
         }}
 
         
       `}</style>



      <h2 style={{ textAlign: 'center', marginBottom: 20 }}>🔥 العروض والتخفيضات</h2>
      <div className="projects-grid ">
        {offers.length === 0 ? (
        
                   <div className="empty-state">
  <div className="empty-icon">🛒</div>
  <h3>لا توجد منتجات</h3>
  <p>لم يتم العثور على منتجات بها تخفيضات أو عروض </p>
</div>

        ) : (
          offers.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>

      <Footer />
    </div>
  );
}



export default OffersPage;
