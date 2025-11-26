import { useNavigate } from 'react-router-dom';
import styles from '../styles/HomePage.module.css'; 

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>Campers of your dreams</h1>
        <h2 className={styles.subtitle}>You can find everything you want in our catalog</h2>
        <button 
          onClick={() => navigate('/catalog')}
          className={styles.ctaButton}
        >
          View Now
        </button>
      </div>
    </div>
  );
};

export default HomePage;