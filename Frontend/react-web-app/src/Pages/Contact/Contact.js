import React from 'react';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import styles from './Contact.module.css';

const Contact = () => {
  return (
    <div>
      <Header />
      <div className={styles.contactWrapper}>
        <div className={styles.contactContainer}>
          <h1>Contact Us</h1>
          <div className={styles.contactInfo}>
            <div className={styles.contactSection}>
              <h3>Head Office</h3>
              <img src="hoffice.jpg" alt="Head Office" className={styles.image} />
              <p>
                NO 131, Panchikawatta Road, Colombo 10, Sri Lanka.<br />
                Phone : +94 11 2344595<br />
                Fax : +94 11 2394496<br />
                Email : sales@gsauto.lk
              </p>
            </div>
            <div className={styles.contactSection}>
              <h3>Mahara Branch</h3>
              <img src="moffice.jpg" alt="Mahara Branch" className={styles.image} />
              <p>
                No 163/15, Kandy road, Mahara, Kadawatha, Sri Lanka.<br />
                Phone : +94 77 5906677 | +94 77 550 8122<br />
                Email : sales@gsauto.lk
              </p>
            </div>
            <div className={styles.contactSection}>
              <h3>Kelaniya Branch</h3>
              <img src="koffice.jpg" alt="Kelaniya Branch" className={styles.image} />
              <p>
                No 24 Kandy road, Dalugama, Kelaniya, Sri Lanka.<br />
                Phone : +94 11 2906335 | +94 112906283<br />
                Fax : +94 11 2906283<br />
                Email : sales@gsauto.lk
              </p>
            </div>
          </div>
          <div className={styles.contactForm}>
            <h2>Add Your Complains Here</h2>
            <form>
              <div className={styles.formGroup}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="complain">Complain</label>
                <textarea id="complain" name="complain" required></textarea>
              </div>
              <button type="submit2">Send Complain</button>
            </form>
          </div>
          <div className={styles.socialMedia}>
            <h2>Follow Us</h2>
            <div className={styles.socialIcons}>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <img src="facebook-logo.png" alt="Facebook" className={styles.socialIcon} />
              </a>
              <a href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer">
                <img src="whatsapp-logo.png" alt="WhatsApp" className={styles.socialIcon} />
              </a>
              <a href="mailto:sales@gsauto.lk" target="_blank" rel="noopener noreferrer">
                <img src="gmail-logo.png" alt="Email" className={styles.socialIcon} />
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
