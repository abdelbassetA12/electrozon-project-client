import React, { useContext } from 'react';
import { SearchContext } from '../context/SearchContext';
import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard'; // استدعاء مكون الكارد



function SearchOverlay() {
  const {
    searchQuery,
    setSearchQuery,
    filteredResults,
    setShowSearchOverlay
  } = useContext(SearchContext);

  const navigate = useNavigate();

  return (
    <div style={styles.overlay}>
      <style>{`
 

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

   

    
 
 
        
 





      


       
 
         
       `}</style>
      <div style={styles.container}>
        <div style={styles.header}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="🔍 ابحث..."
            style={styles.input}
            autoFocus
          />
          <button
            onClick={() => {
              setShowSearchOverlay(false);
              setSearchQuery('');
            }}
            style={styles.closeBtn}
          >
            ✕
          </button>
        </div>

        <div style={styles.productsGrid}>
          {filteredResults.length > 0 ? (
            filteredResults.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))
          ) : (
            

             <div className="empty-state">
  <div className="empty-icon">🛒</div>
  <h3>لا توجد نتائج </h3>
  <p>لم يتم العثور على نتائج بحت     </p>
</div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
   
    top: 70,
    left: 0,
    right: 0,
    bottom: 0,
    background: '#000',
    color: '#fff',
    zIndex: 9999,
    overflowY: 'auto',
  },
  container: {
    maxWidth: 1200,
    margin: 'auto',
    padding: 20,
   
  },
  header: {
    display: 'flex',
    gap: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    borderRadius: 6,
    border: 'none',
    outline: 'none',
  },
  closeBtn: {
    background: 'transparent',
    border: 'none',
    color: 'white',
    fontSize: 24,
    cursor: 'pointer',
  },
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', // نفس عرض الكارد
    gap: 20,
  },
};

export default SearchOverlay;










