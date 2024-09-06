import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './OrdersPage.module.css';

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [itemDetails, setItemDetails] = useState({});
    const [searchUserId, setSearchUserId] = useState('');
    const [selectedStatus, setSelectedStatus] = useState({});
    
    useEffect(() => {
        fetchOrders();
    }, []);

    useEffect(() => {
        if (orders.length > 0) {
            fetchItemsDetails();
        }
    }, [orders]);

    const fetchOrders = () => {
        let url = 'http://localhost:8082/orders';
        if (searchUserId) {
            url += `/${searchUserId}`;
        }
        axios.get(url)
            .then(response => setOrders(response.data))
            .catch(error => console.error('Error fetching orders:', error));
    };

    const fetchItemsDetails = () => {
        orders.forEach(order => {
            const itemId = order.itemId;
            axios.get(`http://localhost:8081/items/${itemId}`)
                .then(response => {
                    setItemDetails(prevDetails => ({
                        ...prevDetails,
                        [itemId]: response.data
                    }));
                })
                .catch(error => console.error('Error fetching item details:', error));
        });
    };

    const handleStatusChange = (orderId, status) => {
        setSelectedStatus({ ...selectedStatus, [orderId]: status });
    };

    const handleUpdateStatus = (orderId, newStatus) => {
        const formData = new URLSearchParams();
        formData.append('status', newStatus);
    
        axios.patch(`http://localhost:8082/orders/${orderId}`, formData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
        .then(() => {
          alert("Status updated successfully!");
          fetchOrders();
        })
        .catch((error) => {
          console.error("Error updating warranty status", error);
          alert("Failed to update status. Check console for details.");
        });
    };

    const handleDeleteOrder = (orderId) => {
        axios.delete(`http://localhost:8082/orders/${orderId}`)
            .then(() => {
                setOrders(orders.filter(order => order.id !== orderId));
            })
            .catch(error => console.error('Error deleting order:', error));
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h1 className={styles.title}>Orders Page</h1>
                <div className={styles.searchContainer}>
                    <input 
                        type="text" 
                        placeholder="Search by User ID" 
                        value={searchUserId}
                        onChange={(e) => setSearchUserId(e.target.value)} 
                        className={styles.searchInput}
                    />
                    <button onClick={fetchOrders} className={styles.searchButton}>Search</button>
                </div>
                <div className={styles.ordersGrid}>
                    {orders.map(order => (
                        <div key={order.id} className={styles.orderCard}>
                            <p>User ID: {order.userId}</p>
                            <p>Item ID: {order.itemId}</p>
                            <p>Item Name: {itemDetails[order.itemId]?.name || 'Loading...'}</p>
                            <p>Item Description: {itemDetails[order.itemId]?.description || 'Loading...'}</p>
                            {itemDetails[order.itemId]?.picture && (
                                <img 
                                    src={`data:image/jpeg;base64,${itemDetails[order.itemId].picture}`} 
                                    alt={itemDetails[order.itemId]?.name || 'Item Image'} 
                                    className={styles.itemImage}
                                />
                            )}
                            <p>Status: {order.status}</p>
                            <div className={styles.statusUpdateContainer}>
                            <select 
                                value={selectedStatus[order.id] || order.status} 
                                onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                className={styles.statusSelect}
                            >
                                <option value="Pending">Pending</option>
                                <option value="Accepted">Accepted</option>
                                <option value="Done">Done</option>
                            </select>
                            <button onClick={() => handleUpdateStatus(order.id)} className={styles.updateButton}>Update Status</button>
                            </div>
                            <button onClick={() => handleDeleteOrder(order.id)} className={styles.deleteButton}>Delete Order</button>
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

export default OrdersPage;
