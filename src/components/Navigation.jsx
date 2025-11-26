import { NavLink } from 'react-router-dom';
import styles from '../styles/Navigation.module.css';

const Navigation = () => {
  const buildLinkClass = ({ isActive }) => 
    isActive ? `${styles.link} ${styles.activeLink}` : styles.link;

  return (
    <header className={styles.header}>
      <NavLink to="/" className={styles.logo}>
        Travel<span style={{color: '#E44848'}}>Trucks</span>
      </NavLink>

      <nav className={styles.nav}>
        <NavLink to="/" className={buildLinkClass}>
          Home
        </NavLink>
        <NavLink to="/catalog" className={buildLinkClass}>
          Catalog
        </NavLink>
      </nav>
    </header>
  );
};

export default Navigation;