



import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { CartContext } from '../context/CartContext';
import { MdShoppingCartCheckout } from "react-icons/md";
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import Loader from "../components/Loader";







function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
    const [mainImage, setMainImage] = useState(null); // <-- new state for main displayed image
  const { addToCart } = useContext(CartContext);
   const apiUrl = process.env.REACT_APP_API_URL; // قراءة الرابط من .env

  const [suggestedProducts, setSuggestedProducts] = useState([]);



 
/*
  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products/all"); // رابط API لكل المنتجات
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };
  fetchProducts();
}, []);
*/


useEffect(() => {
  const fetchSuggestedProducts = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/products/all`);  
      // استبعاد المنتج الحالي من الاقتراحات
      const filtered = res.data.filter(p => p._id !== id);
      setSuggestedProducts(filtered);
    } catch (err) {
      console.error(err);
    }
  };

  fetchSuggestedProducts();
}, [id]);










 






  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
        setMainImage(data.image); // <-- initialize main image from product.image
      } catch (err) { console.error(err); }
    };
    fetchProduct();
  }, [id]);

   if (!product) return  <Loader text="جاري تحميل البيانات..." />;

  const handleOptionChange = (optionName, value) => {
    setSelectedOptions(prev => ({ ...prev, [optionName]: value }));
  };

  
  // extract image-type content items (if any)
  const contentImages = product.content?.filter(c => c.type === 'image') || [];

  return (
    <div >

       



      <div className='contaner' >


      <div  className="left-img" >

         {/* Thumbnail column (stacked vertically) */}
        {contentImages.length > 0 && (
          <div className="thumbnail-column" style={{ display: 'flex', flexDirection: 'column',  gap: 10, alignItems: 'center', padding: "10px ",  
            position: "absolute", top: '0', bottom: '0',overflowY: 'auto'
           }}>
            {contentImages.map((c, idx) => (
              <img
                key={idx}
                src={c.filePath }
                alt={c.title || `thumb-${idx}`}
                className="thumb"
                onClick={() => setMainImage(c.filePath)} // clicking sets main image
                style={{
                  width: 72,
                  height: 72,
                  objectFit: 'cover',
                  borderRadius: 8,

                  cursor: 'pointer',
                  boxShadow: mainImage === c.filePath ? '0 0 0 3px rgba(37,99,235,0.15)' : '0 4px 12px rgba(0,0,0,0.06)'
                }}
              />
              
            ))}
          </div>
        )}

         {/* Main image (uses mainImage state; falls back to product.image) */}
        <div style={{ flex: 1, minWidth: 0, height: "100%" }}>
          <img
            src={mainImage || product.image}
            alt={product.name}
            style={{ width:'100%', height: "100%", objectFit:'cover', borderRadius: 12 }}
          />
        </div>



     


      </div>
      
 
<div className='right-detail' >
  <div className="discreptiom-detail">

    
      <h1>{product.name}</h1>
    




      <div style={styles.prices}>
          <span style={styles.currentPrice}>
            {product.finalPrice && product.discount?.isActive
              ? `${product.finalPrice} dh`
              : `${product.price} dh`}
          </span>

          {product.discount?.isActive && product.finalPrice < product.price && (
            <span style={styles.oldPrice}>{product.price} dh</span>
          )}
      </div>




     
      <p className="description">{product.description}</p>

      {product.options?.length > 0 && (
        <div className="options-section">
          <h3>  options:</h3>
          {product.options.map((opt, idx) => (
            <div  key={idx}>
              <p>{opt.name}</p>
              <div  className="options-list">
                

                {opt.values.map((val, i) => (
  <button
    className="options-item"
    key={i}
    onClick={() => handleOptionChange(opt.name, val)}
    style={{
      border: selectedOptions[opt.name]?.value === val.value ? '2px solid green' : '1px solid #ccc',
      padding: '6px 10px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: 5
    }}
  >
    {/* إذا كان الخيار لون */}
    {opt.type === 'color' && (
      <div style={{ width: 20, height: 20, borderRadius: '50%', background: val.value }}></div>
    )}

    {/* إذا كانت الصورة موجودة */}
    {opt.type === 'image' && val.image && (
      <img
        src={val.image}
        alt={val.value}
        style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 6 }}
      />
    )}

    {/* إذا لم يكن لون أو صورة، اعرض القيمة النصية */}
    {opt.type !== 'color' && opt.type !== 'image' && val.value}
  </button>
))}

              </div>
            </div>
          ))}
        </div>
      )}
   

      

      <button
        onClick={() => {
          if (product.options?.length > 0) {
            const allSelected = product.options.every(opt => selectedOptions[opt.name]);
            if (!allSelected) return alert("اختر كل الخيارات");
          }
          addToCart({ ...product, selectedOptions });
        }}
        style={{ marginTop:20, backgroundColor:'#2563EB', color:'#fff', padding:'10px 20px', border:'none', borderRadius:6, cursor:'pointer', display: "flex", alignItems: "center", gap: "5px", fontSize: "16px" }}
      >
         Add to ca cat  <MdShoppingCartCheckout size={20}/>
      </button>

  </div>


  <div className=" content-info">
        {product.content && product.content.length > 0 && (
          <div className="content-preview">
            {product.content.map((c, i) => (
              <div key={i} className="content-item">
                {c.type === "text" && <p>{c.text}</p>}
                {c.type === "image" && (
                  
                  <div className="project-image-div">
                    <img
                    src={ c.filePath} 
                    alt={c.title || ""}
                    className="project-image"
                  />

                  </div>
                )}
                {c.type === "video" && (
                  <video
                    controls
                   
                     src={c.filePath}
                    className="project-video"
                  />
                )} 








 <a
        href={c.url}
        target="_blank"
        rel="noopener noreferrer"
        className="link-title"
      >
       

        
               {c.type === "link" && (
              <div className="link-card">
                <div className="link-info">
                  <a
        href={c.url}
        target="_blank"
        rel="noopener noreferrer"
        className="link-title"
      >
        {c.title || "Project Link"}
                  </a>
                  <p className="link-domain">
                  {new URL(c.url).hostname}
                  </p>
                 </div>
                 <a
                 href={c.url}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="link-icon"
              >
               ↗
                 </a>
               </div>
)}

                  </a>

              </div>
            ))}
          </div>
        )}
</div>










</div>








   </div>


   {suggestedProducts.length > 0 && (
  <div style={{ marginTop: 50, overflow: "hidden", display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
    <h2 style={{ marginBottom: 20 }}>منتجات مقترحة لك</h2>
    <div className='suggested-grid'   >
      {suggestedProducts.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  </div>
)}






            




<style>{`


  /* مشاريع */
         .projects-section { padding: 2rem; }
         .projects-section h2 { text-align: center; margin: 0 0 3rem; }
          
         
.suggested-grid {
 



    padding: 32px;
  display: grid;

  /* ✅ الحل */
  grid-template-columns: repeat(auto-fill, 240px);
  gap: 20px;
  justify-content: start;

 
        
}





/* Desktop */
@media (min-width: 1200px) {
  .suggested-grid {
    grid-template-columns: repeat(5, 240px);
  }
}

/* Tablet */
@media (max-width: 1199px) and (min-width: 768px) {
  .suggested-grid {
    grid-template-columns: repeat(3, 240px);
  }
}

/* Mobile */
@media (max-width: 767px) {
  .suggested-grid {
    grid-template-columns: repeat(2, 1fr);
    
  }
}













      


         @media (max-width: 768px) { .suggested-grid{ grid-template-columns: 1fr; } }


 



.project-detail {
  max-width: 1400px;
  width: 100%;
  display: flex;
  gap: 50px;
  padding: 40px;
  font-family: 'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0 auto;
  box-sizing: border-box;
  background: linear-gradient(145deg, #fdfdfd, #e8f7ff);
  border-radius: 20px;
  box-shadow: 0 15px 40px rgba(0,0,0,0.1);
}

.contaner {
display: flex;
 padding: 20px;
  gap: 10px;
  background: #e6dfdf48;
}
.left-img {
    flex: 1;

  background: rgba(255,255,255,0.8);
  border-radius: 15px;
  backdrop-filter: blur(6px);
  box-shadow: 0 5px 20px rgba(0,0,0,0.05);
   width: 50%;
  height: 75vh;
   


     
      gap: 5px;
       background: rgba(151, 144, 144, 0.18);
   
}


.right-detail {
 display: flex;
  flex-direction: column;
   padding: 0 20px 20px;
   width: 50%;
    gap: 15px ;


}
.discreptiom-detail {
  flex: 1;
  max-width: 100%;
  background: rgba(255,255,255,0.8);
  border-radius: 15px;
  padding: 20px;
  backdrop-filter: blur(6px);
  box-shadow: 0 5px 20px rgba(0,0,0,0.05);
  

}


.content-info {
  flex: 2;
  overflow-y: auto;
  max-height: 85vh;
  padding-left: 20px;
  scrollbar-width: thin;
  scrollbar-color:  #2563eb #e5e7eb;
}

.content-info::-webkit-scrollbar {
  width: 8px;
}
.content-info::-webkit-scrollbar-thumb {
  background-color:  #2563eb;
  border-radius: 10px;
}
.content-info::-webkit-scrollbar-track {
  background: #e5e7eb;
}

h1 {
  font-size: 2rem;
  margin-bottom: 10px;
  background: linear-gradient(90deg, #06b6d4, #3b82f6);
   background: #000000;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
}

.role {
  font-size: 1rem;
  color: #2563eb;
  margin-bottom: 20px;
  font-style: italic;
}

h3 {
  font-size: 1.2rem;
  margin-top: 20px;
  margin-bottom: 10px;
  color: #000000;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
}

.description {
  font-size: 1rem;
  line-height: 1.6;
  color: #334155;
}

.options-section {
  margin-top: 20px;
}

.options-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.options-item {
  background: linear-gradient(135deg, #d1fae5,  #bec5d3ff);
  color: #2563eb;
  padding: 6px 14px;
  border-radius: 5px;
  font-size: 0.9rem;
  font-weight: 600;
  box-shadow: 0 3px 12px rgba(16, 185, 106, 0.3);
  transition: transform 0.2s ease-in-out;
 
}

.options-item:hover {
  transform: scale(1.1);
}

.content-preview {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.content-item {
  border-radius: 10px;
  overflow: hidden;
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(5px);
  box-shadow: 0 5px 20px rgba(0,0,0,0.08);
  padding: 15px;
  transition: transform 0.3s ease;
}

.content-item:hover {
  transform: translateY(-3px);
}

.content-item p {
color: #334155;



}

.project-image-div {
  width: 100%;
  display: flex;
  justify-content: center;
}

.project-image {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 5px 25px rgba(0,0,0,0.12);
  transition: transform 0.3s ease;
}

.project-image:hover {
  transform: scale(1.03);
}

.project-video {
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 5px 25px rgba(0,0,0,0.12);
  max-height: 450px;
}

.link-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f0f4fdff;
  padding: 16px 20px;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.08);
  transition: transform 0.2s ease;
}

.link-card:hover {
  transform: translateY(-2px);
}

.link-info {
  display: flex;
  flex-direction: column;
}

.link-title {
  color: #2563eb;
  font-weight: 600;
  text-decoration: none;
  margin-bottom: 4px;
  transition: color 0.2s ease;
}

.link-title:hover {
  color: #2564ebaf;
  text-decoration: underline;
}

.link-domain {
  font-size: 0.9rem;
  color: #475569;
}

.link-icon {
  color: #334155;
  font-size: 1.2rem;
  text-decoration: none;
  margin-left: 12px;
  transition: color 0.2s ease;
}

.link-icon:hover {
  color: #2563eb;
}















/* شاشات أقل من 1024px (تابلت) */
@media (max-width: 1024px) {
  .project-detail {
    flex-direction: column;
    padding: 25px;
    gap: 30px;
     width: 100%;
  }

  .left-column {
    max-width: 100%;
    
  }

  .content-info {
    max-width: 100%;
    width: 100%;
    max-height: auto;
    padding-left: 0;
  }
}

/* شاشات أقل من 768px (موبايل) */
@media (max-width: 768px) {

.contaner{
display: flex;
 flex-direction: column;
  justify-items: center;
  margin-top: 40px;

}



.left-img {
    flex: 1;

  background: rgba(255,255,255,0.8);
  border-radius: 15px;
  backdrop-filter: blur(6px);
  box-shadow: 0 5px 20px rgba(0,0,0,0.05);
   width: 100%;
  
    overflow: hidden;


     
      gap: 5px;
       background: rgba(151, 144, 144, 0.18);
   
}


.right-detail {
 display: flex;
  flex-direction: column;
padding: 0;
   width: 100%;
    gap: 15px ;


}




  .project-detail {
    padding: 20px;
    gap: 20px;
  }

  h1 {
    font-size: 1.6rem;
    text-align: center;
  }

  h3 {
    font-size: 1rem;
  }

  .description {
    font-size: 0.95rem;
  }

  .options-list {
    gap: 8px;
  }

  .options-item {
    font-size: 0.8rem;
    padding: 5px 10px;
  }

  .project-image {
    max-height: 50vh;
  }

  .project-video {
    max-height: 250px;
  }

  .link-card {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .link-icon {
    align-self: flex-end;
  }
}

/* شاشات صغيرة جداً (أقل من 480px) */
@media (max-width: 480px) {
  .project-detail {
    padding: 15px;
    border-radius: 12px;
  }

  h1 {
    font-size: 1.4rem;
  }

  .description {
    font-size: 0.85rem;
    line-height: 1.4;
  }

  .options-item {
    padding: 4px 8px;
    font-size: 0.75rem;
  }

  .link-card {
    padding: 12px;
  }
}



}









`}</style>



<Footer />
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
    color: "#000000CF",
    fontWeight: "bold",
    fontSize: 25,
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

export default ProductDetails;


















