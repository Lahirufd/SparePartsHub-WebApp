import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AdminDashboard.module.css';

const AdminDashboard = () => {
    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
            <h1 className={styles.header}>Admin Dashboard</h1>
            <div className={styles.cardsContainer}>
              <a href="items">
                <div className={styles.card}>
                    <img src="upload-edit-items.jpg" alt="Upload and Edit Items" className={styles.cardImage} />
                    <h2>Upload, Edit Items</h2>
                </div>
              </a>
              <a href="view-items">
                <div className={styles.card}>
                    <img src="items.jpg" alt="Items" className={styles.cardImage} />
                    <h2>Items</h2>
                </div>
              </a>
              <a href="orders">
                <div className={styles.card}>
                    <img src="orders.jpg" alt="Orders" className={styles.cardImage} />
                    <h2>Orders</h2>
                </div>
              </a>
              <a href="warrantyitems">
                <div className={styles.card}>
                    <img src="warranty-items.jpg" alt="Warranty Items" className={styles.cardImage} />
                    <h2>Warranty Items</h2>
                </div>
              </a>
              <a href="users">
                <div className={styles.card}>
                    <img src="users.jpg" alt="Users" className={styles.cardImage} />
                    <h2>Users</h2>
                </div>
              </a>
            </div>
            <Link to="/login">
              <button className={styles.logoutButton}>
                 Logout
              </button>
            </Link>
        </div>
        </div>
    );
};

export default AdminDashboard;
