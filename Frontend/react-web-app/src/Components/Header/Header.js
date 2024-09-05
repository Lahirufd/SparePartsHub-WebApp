import React, { useState } from 'react';
import styles from './Header.module.css';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src="logo.jpg" alt="The Pits Logo" />
      </div>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <a href="/home" className={styles.navLink}>Home</a>
          </li>
          <li className={styles.navItem}>
            <a href="/about" className={styles.navLink}>About us</a>
          </li>
          <li
            className={`${styles.navItem} ${styles.dropdown}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <span className={styles.navLink}>Services</span>
            {isDropdownOpen && (
              <ul className={styles.dropdownMenu}>
                <li><a href="/items" className={styles.dropdownLink}>Buying Spare Parts</a></li>
                <li><a href="/sellingitems" className={styles.dropdownLink}>Selling Spare Parts</a></li>
                <li><a href="/warranty-items" className={styles.dropdownLink}>Claim Warranty</a></li>
                <li><a href="/repairitems" className={styles.dropdownLink}>Repair Spare Parts</a></li>
              </ul>
            )}
          </li>
          <li className={styles.navItem}>
            <a href="/contact" className={styles.navLink}>Contact us</a>
          </li>
          <li className={styles.navItem}>
            <a href="/profile" className={styles.navLink}>Profile</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;