import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import styles from './PurchasedItemsPage.module.css';

const PurchasedItemsPage = () => {
  const [orders, setOrders] = useState([]);
  const [items, setItems] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  const fetchOrders = async () => {
    try {
      const ordersResponse = await axios.get(`http://localhost:8082/orders/${userId}`);
      setOrders(ordersResponse.data);
      fetchItems(ordersResponse.data.map(order => order.itemId));
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchItems = async (itemIds) => {
    try {
      const itemsPromises = itemIds.map(id => axios.get(`http://localhost:8081/items/${id}`));
      const itemsResponses = await Promise.all(itemsPromises);
      setItems(itemsResponses.map(response => response.data));
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:8082/orders/${orderId}`);
      setOrders(orders.filter(order => order.id !== orderId));
      alert('Order deleted successfully!');
    } catch (error) {
      console.error('Error deleting order:', error);
      alert('Failed to delete order.');
    }
  };

  return (
    <div>
      <Header />
      <div className={styles.purchasedItemsPageWrapper}>
        <div className={styles.purchasedItemsContainer}>
          <h1>Purchased Items</h1>
          <div className={styles.purchasedItemsGrid}>
            {orders.map(order => {
              const item = items.find(item => item.id === order.itemId);
              return (
                item && (
                  <div key={order.id} className={styles.purchasedItemCard}>
                    {item.picture && (
                      <img
                        src={`data:image/jpeg;base64,${item.picture}`}
                        alt={item.name}
                        className={styles.purchasedItemImage}
                      />
                    )}
                    <h3 className={styles.purchasedItemName}>{item.name}</h3>
                    <p className={styles.purchasedItemDescription}>{item.description}</p>
                    <div className={styles.statusBox}>
                      {order.status}
                    </div>
                    <button onClick={() => handleDeleteOrder(order.id)} className={styles.deleteButton}>
                      Delete
                    </button>
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PurchasedItemsPage;
