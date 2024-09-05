import React, { useState, useEffect } from 'react';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import styles from './ItemsPage.module.css';

const ItemsPage = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async (name = '') => {
    try {
      const response = await fetch(`http://localhost:8081/items${name ? `?name=${name}` : ''}`);
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleSearch = () => {
    fetchItems(searchTerm);
  };

  const handleBuy = async (itemId) => {
    const userId = localStorage.getItem('userId');
    await fetch(`http://localhost:8082/orders?userId=${userId}&itemId=${itemId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, itemId }),
    });
    alert('Item purchased successfully!');
  };
  
  

  return (
    <div className={styles.itemsPageWrapper}>
      <Header />
      <div className={styles.itemsContainer}>
        <h1>Items</h1>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search for items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch} className={styles.searchButton}>Search</button>
        </div>
        <div className={styles.itemsGrid}>
          {items.map(item => (
            <div key={item.id} className={styles.itemCard}>
              {item.picture && (
                <img
                  src={`data:image/jpeg;base64,${item.picture}`}
                  alt={item.name}
                  className={styles.itemImage}
                />
              )}
              <h3 className={styles.itemName}>{item.name}</h3>
              <p className={styles.itemDescription}>{item.description}</p>
              <button onClick={() => handleBuy(item.id)} className={styles.buyButton}>Buy</button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ItemsPage;
