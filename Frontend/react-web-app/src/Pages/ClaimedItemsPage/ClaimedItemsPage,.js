import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import styles from './ClaimedItemsPage.module.css';

const ClaimedItemsPage = () => {
  const [claimedItems, setClaimedItems] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userId) {
      fetchClaimedItems();
    }
  }, [userId]);

  const fetchClaimedItems = async () => {
    try {
      const response = await axios.get(`http://localhost:8083/wis-api/items/${userId}`);
      setClaimedItems(response.data);
    } catch (error) {
      console.error('Error fetching claimed items:', error);
    }
  };

  const handleDeleteClaimedItem = async (claimedItemId) => {
    try {
      await axios.delete(`http://localhost:8083/wis-api/items/${claimedItemId}`);
      setClaimedItems(claimedItems.filter(item => item.id !== claimedItemId));
      alert('Claimed item deleted successfully!');
    } catch (error) {
      console.error('Error deleting claimed item:', error);
      alert('Failed to delete claimed item.');
    }
  };

  return (
    <div>
      <Header />
      <div className={styles.claimedItemsPageWrapper}>
        <div className={styles.claimedItemsContainer}>
          <h1>Claimed Warranty Items</h1>
          <div className={styles.claimedItemsGrid}>
            {claimedItems.map(item => (
              <div key={item.id} className={styles.claimedItemCard}>
                {item.picture && (
                  <img
                    src={`data:image/jpeg;base64,${item.picture}`}
                    alt={item.name}
                    className={styles.claimedItemImage}
                  />
                )}
                <h3 className={styles.claimedItemName}>{item.name}</h3>
                <p className={styles.claimedItemDescription}>{item.description}</p>
                <div className={styles.statusBox}>
                  {item.status}
                </div>
                <button onClick={() => handleDeleteClaimedItem(item.id)} className={styles.deleteButton}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ClaimedItemsPage;
