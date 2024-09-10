import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './UploadItemsPage.module.css';

const UploadSellingItem = () => {
    const [itemName, setItemName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [itemId, setItemId] = useState('');
    const [message, setMessage] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        if (isEditMode && itemId) {
            axios.get(`http://localhost:8081/is-api/items/${itemId}`)
                .then(response => {
                    const item = response.data;
                    setItemName(item.name);
                    setDescription(item.description);
                });
        }
    }, [itemId, isEditMode]);

    const onFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const onItemNameChange = (event) => {
        setItemName(event.target.value);
    };

    const onDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const onIdChange = (event) => {
        setItemId(event.target.value);
    };

    const onFormSubmit = async (e) => {
        e.preventDefault();
        setMessage('Processing...');

        const formData = new FormData();
        formData.append('name', itemName);
        formData.append('description', description);
        if (selectedFile) {
            formData.append('picture', selectedFile);
        }

        let response;
        if (isEditMode) {
            response = await axios.put(`http://localhost:8081/is-api/items/${itemId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        } else {
            response = await axios.post('http://localhost:8081/is-api/items', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        }

        console.log('Response:', response);
        setMessage(isEditMode ? 'Item updated successfully' : 'Item uploaded successfully');
        setItemName('');
        setDescription('');
        setSelectedFile(null);
        setItemId('');
        setIsEditMode(false);
    };

    return (
        <div className={styles.wrapper}>
        <div className={styles.container}>
        <h2 className={styles.header}>{isEditMode ? 'Edit Selling Item' : 'Upload Selling Item'}</h2>
        {message && <p className={styles.message}>{message}</p>}
        <form className={styles.form} onSubmit={onFormSubmit}>
          {isEditMode && (
            <div>
              <label className={styles.label} htmlFor="itemId">Item ID:</label>
              <input
                id="itemId"
                type="text"
                value={itemId}
                onChange={onIdChange}
                className={styles.input}
                placeholder="Enter ID to edit"
              />
            </div>
          )}
          <div>
            <label className={styles.label} htmlFor="itemName">Item Name:</label>
            <input
              id="itemName"
              type="text"
              value={itemName}
              onChange={onItemNameChange}
              className={styles.input}
              required
            />
          </div>
          <div>
            <label className={styles.label} htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={onDescriptionChange}
              className={styles.textarea}
              required
            />
          </div>
          <div>
            <label className={styles.label} htmlFor="picture">Image:</label>
            <input
              id="picture"
              type="file"
              onChange={onFileChange}
              className={styles.fileInput}
            />
          </div>
          <button type="submit1" className={styles.button}>{isEditMode ? 'Update Item' : 'Upload Item'}</button>
        </form>
        <div className={styles.horizontalButtonsContainer}>
          <button onClick={() => setIsEditMode(!isEditMode)} className={styles.switchModeButton}>
            {isEditMode ? 'Switch to Upload Mode' : 'Switch to Edit Mode'}
          </button>
          <a href="dashboard">
            <button className={styles.backButton}>Back</button>
          </a>
        </div>
      </div>
      </div>    
    );
};

export default UploadSellingItem;
