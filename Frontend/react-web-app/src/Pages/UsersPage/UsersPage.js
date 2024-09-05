import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './UsersPage.module.css';

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8080/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this account?')) {
      try {
        // Delete warranty items associated with the user
        const warrantyServiceUrl = `http://localhost:8083/wis-api/items/user/${userId}`;
        await axios.delete(warrantyServiceUrl);
  
        // Delete orders associated with the user
        const orderServiceUrl = `http://localhost:8082/orders/user/${userId}`;
        await axios.delete(orderServiceUrl);
  
        // Delete the user account
        const userServiceUrl = `http://localhost:8080/users/${userId}`;
        const userResponse = await axios.delete(userServiceUrl);
  
        if (userResponse.status === 200) {
          alert('User account has been deleted successfully.');
        } else {
          alert('Failed to delete user account.');
        }
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('An error occurred while deleting the user. Please try again later.');
      }
    }
  };
  

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.header}>View All Users</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Address</th>
            <th>Telephone</th>
            <th>Card Number</th>
            <th>Expiration Date</th>
            <th>CVV</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.address}</td>
              <td>{user.telNumber}</td>
              <td>{user.cardNumber}</td>
              <td>{user.expirationDate}</td>
              <td>{user.cvv}</td>
              <td>
                <button
                  className={styles.deleteButton}
                  onClick={() => deleteUser(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <a href="dashboard">
        <button className={styles.backButton}>Back</button>
      </a>
    </div>
  );
};

export default UsersPage;
