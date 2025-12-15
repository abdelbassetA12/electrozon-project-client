import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [allProducts, setAllProducts] = useState([]);
   const apiUrl = process.env.REACT_APP_API_URL; // قراءة الرابط من .env
  const [filteredResults, setFilteredResults] = useState([]);
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);

  useEffect(() => {
    axios.get(`${apiUrl}/api/products/all`)
      .then(res => setAllProducts(res.data))
      .catch(err => console.error('❌ فشل تحميل المنتجات:', err));
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredResults([]);
      return;
    }

    const results = allProducts.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category?.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredResults(results.slice(0, 10));
  }, [searchQuery, allProducts]);

  return (
    <SearchContext.Provider value={{
      searchQuery,
      setSearchQuery,
      filteredResults,
      showSearchOverlay,
      setShowSearchOverlay,
    }}>
      {children}
    </SearchContext.Provider>
  );
};
