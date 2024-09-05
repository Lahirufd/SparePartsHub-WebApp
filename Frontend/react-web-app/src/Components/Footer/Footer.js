import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles['contact-info']}>
        <img src="logo.jpg" alt="Contact Info" className={styles['contact-info-pic']} />
        <h3>Contact Information</h3>
        <p>
          We at Thelee Group Pvt. Ltd. would love to hear from you! Please let us know if you have any questions or concerns and we will get back to you soon or you can directly contact us on.
        </p>
        <div className={styles['contact-logos']}>
          <a href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer">
            <img src="whatsapp-logo.png" alt="WhatsApp" />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <img src="facebook-logo.png" alt="Facebook" />
          </a>
          <a href="mailto:sales@gsauto.lk" target="_blank" rel="noopener noreferrer">
            <img src="gmail-logo.png" alt="Gmail" />
          </a>
        </div>
      </div>
      <div className={styles['quick-contact']}>
        <h3>Quick Contact</h3>
        <div className={styles['contact-section']}>
          <h4>Head Office</h4>
          <p>
            NO 131, Panchikawatta Road, Colombo 10, Sri Lanka.
            <br />
            Phone : +94 11 2344595 Fax : +94 11 2394496
            <br />
            Email : sales@gsauto.lk
          </p>
        </div>
        <div className={styles['contact-section']}>
          <h4>Mahara Branch</h4>
          <p>
            No 163/15, Kandy road, Mahara, Kadawatha, Sri Lanka.
            <br />
            Phone : +94 77 5906677 | +94 77 550 8122
            <br />
            Email : sales@gsauto.lk
          </p>
        </div>
        <div className={styles['social-links']}>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-whatsapp"></i>
          </a>
          <a href="mailto:sales@gsauto.lk" target="_blank" rel="noopener noreferrer">
            <i className="fas fa-envelope"></i>
          </a>
        </div>
      </div>
      <div className={styles['about-us']}>
        <h3>About Us</h3>
        <p>
          Thelee Group Pvt. Ltd. is a leading provider of high-quality spare parts for a wide range of vehicles. Our commitment to excellence and customer satisfaction sets us apart in the industry.
        </p>
        <img src="about-us.png" alt="About us" />
      </div>
    </footer>
  );
};

export default Footer;