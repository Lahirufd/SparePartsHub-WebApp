import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './AdminItemsPage.module.css';

const AdminItemsPage = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async (name = '') => {
    try {
      const response = await axios.get(`http://localhost:8081/items${name ? `?name=${name}` : ''}`);
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleSearch = () => {
    fetchItems(searchTerm);
  };

  const handleDeleteItem = async (itemId) => {
    if (window.confirm('Are you sure you want to delete this item and its associated orders?')) {
      try {
        // First, delete orders associated with the item
        const orderServiceUrl = `http://localhost:8082/orders/item/${itemId}`;
        const orderResponse = await axios.delete(orderServiceUrl);

        if (orderResponse.status === 200 || orderResponse.status === 204) {
          // Then, delete the item
          const itemServiceUrl = `http://localhost:8081/items/${itemId}`;
          const itemResponse = await axios.delete(itemServiceUrl);

          if (itemResponse.status === 200) {
            alert('Item and associated orders deleted successfully.');
            // Refresh the list of items
            fetchItems();
          } else {
            alert('Failed to delete item.');
          }
        } else {
          alert('Failed to delete associated orders.');
        }
      } catch (error) {
        console.error('Error deleting item:', error);
        alert('An error occurred while deleting the item. Please try again later.');
      }
    }
  };

  return (
    <div className={styles.itemsPageWrapper}>
      <div className={styles.itemsContainer}>
        <h1>Admin Items</h1>
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
              <p className={styles.itemId}>ID: {item.id}</p>
              <button
                onClick={() => handleDeleteItem(item.id)}
                className={styles.deleteButton}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        <a href="dashboard">
          <button className={styles.backButton}>Back</button>
        </a>
      </div>
    </div>
  );
};

export default AdminItemsPage;
