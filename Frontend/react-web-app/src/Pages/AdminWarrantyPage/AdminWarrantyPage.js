import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./AdminWarrantyPage.module.css";

const AdminWarrantyPage = () => {
  const [warranties, setWarranties] = useState([]);
  const [userId, setUserId] = useState("");
  const [statusUpdate, setStatusUpdate] = useState({});

  const fetchWarranties = () => {
    let url = 'http://localhost:8083/wis-api/items';
    if (userId) {
      url += `/${userId}`;
    }
    axios.get(url)
      .then(response => setWarranties(response.data))
      .catch(error => console.error('Error fetching warranties:', error));
  };

  useEffect(() => {
    fetchWarranties();
  }, []);

  const handleUpdateStatus = (id, newStatus) => {
    const formData = new URLSearchParams();
    formData.append('status', newStatus);

    axios.patch(`http://localhost:8083/wis-api/items/${id}`, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .then(() => {
      alert("Status updated successfully!");
      fetchWarranties();
    })
    .catch((error) => {
      console.error("Error updating warranty status", error);
      alert("Failed to update status. Check console for details.");
    });
};


  const handleDeleteWarranty = (id) => {
    axios
      .delete(`http://localhost:8083/wis-api/items/${id}`)
      .then((response) => {
        alert("Warranty item deleted successfully!");
        fetchWarranties();
      })
      .catch((error) => {
        console.error("Error deleting warranty item", error);
      });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.title}>Warranty Items</h2>

        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Enter User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className={styles.searchInput}
          />
          <button onClick={fetchWarranties} className={styles.searchButton}>
            Search
          </button>
        </div>

        <div className={styles.warrantyGrid}>
          {warranties.map((warranty) => (
            <div key={warranty.id} className={styles.warrantyCard}>
              <p><strong>User ID:</strong> {warranty.userId}</p>
              <img
                src={`data:image/jpeg;base64,${warranty.picture}`}
                alt={warranty.name}
                className={styles.itemImage}
              />
              <p><strong>Description:</strong> {warranty.description}</p>
              <p><strong>Status:</strong> {warranty.status}</p>

              <div className={styles.statusUpdateContainer}>
                <select
                  className={styles.statusSelect}
                  value={statusUpdate[warranty.id] || warranty.status}
                  onChange={(e) => setStatusUpdate({
                    ...statusUpdate,
                    [warranty.id]: e.target.value
                  })}
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
                <button
                  onClick={() => handleUpdateStatus(warranty.id, statusUpdate[warranty.id] || warranty.status)}
                  className={styles.updateButton}
                >
                  Update Status
                </button>
              </div>

              <button
                onClick={() => handleDeleteWarranty(warranty.id)}
                className={styles.deleteButton}
              >
                Delete Item
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

export default AdminWarrantyPage;
