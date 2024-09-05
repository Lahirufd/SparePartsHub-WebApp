import React, { useState } from 'react';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import axios from 'axios';
import styles from './WarrantyItemsPage.module.css';

function WarrantyItemsPage() {
    const [picture, setPicture] = useState(null);
    const [description, setDescription] = useState('');

    const handlePictureChange = (e) => {
        setPicture(e.target.files[0]);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage
        const formData = new FormData();
        formData.append('picture', picture);
        formData.append('description', description);
        formData.append('userId', userId); // Use 'userId' as the parameter name

        try {
            await axios.post('http://localhost:8083/wis-api/items', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Warranty item uploaded successfully!');
        } catch (error) {
            console.error('There was an error uploading the item!', error);
        }
    };

    return (
        <div>
            <Header />
            <main className={styles.main}>
                <h2>Upload Warranty Item</h2>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="picture">Picture:</label>
                        <input type="file" id="picture" onChange={handlePictureChange} required />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="description">Description:</label>
                        <textarea id="description" value={description} onChange={handleDescriptionChange} required />
                    </div>
                    <button type="submit" className={styles.submitButton}>Submit</button>
                </form>
            </main>
            <Footer />
        </div>
    );
}

export default WarrantyItemsPage;
