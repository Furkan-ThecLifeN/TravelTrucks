import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleFavorite } from '../redux/campersSlice';
import styles from '../styles/CamperCard.module.css';

const CamperCard = ({ camper }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.campers.favorites);
  
  const isFav = favorites.some(fav => fav.id === camper.id);

  // --- DÜZELTME BURADA BAŞLIYOR ---
  // Galerinin ilk elemanını alıyoruz
  const firstImage = camper.gallery?.[0];
  
  // Eğer gelen veri bir 'object' ise (örn: {original: "url"}), .original key'ini kullan.
  // Eğer direkt 'string' ise kendisini kullan.
  const imageUrl = typeof firstImage === 'object' ? firstImage.original : firstImage;
  // --- DÜZELTME BURADA BİTİYOR ---

  return (
    <div className={styles.card}>
      <img 
        src={imageUrl} // Düzelttiğimiz değişkeni buraya veriyoruz
        alt={camper.name} 
        className={styles.image} 
      />
      
      <div className={styles.content}>
        <div className={styles.header}>
            <h2 className={styles.title}>{camper.name}</h2>
            <div className={styles.priceSection}>
                <span className={styles.price}>€{camper.price.toFixed(2)}</span>
                
                <button 
                    onClick={() => dispatch(toggleFavorite(camper))} 
                    className={styles.favButton}
                    aria-label="Add to favorites"
                >
                    <svg 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill={isFav ? "#E44848" : "none"} 
                        stroke={isFav ? "#E44848" : "#101828"} 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                    >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                </button>
            </div>
        </div>
        
        <div className={styles.ratingLocation}>
            <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>
                ★ {camper.rating} ({camper.reviews?.length} Reviews)
            </span>
            <span>📍 {camper.location}</span>
        </div>

        <p className={styles.description}>
            {camper.description}
        </p>

        <div className={styles.categories}>
            <span className={styles.categoryBadge}>
                {camper.transmission === 'automatic' ? '🕹 Automatic' : '⚙️ Manual'}
            </span>
            <span className={styles.categoryBadge}>⛽ {camper.engine}</span>
            {camper.AC && <span className={styles.categoryBadge}>❄️ AC</span>}
            {camper.kitchen && <span className={styles.categoryBadge}>🍳 Kitchen</span>}
            {camper.TV && <span className={styles.categoryBadge}>📺 TV</span>}
            {camper.bathroom && <span className={styles.categoryBadge}>🚿 Bathroom</span>}
        </div>
        
        <Link 
            to={`/catalog/${camper.id}`} 
            className={styles.showMoreBtn}
            target="_blank" 
            rel="noopener noreferrer"
        >
            Show more
        </Link>
      </div>
    </div>
  );
};

export default CamperCard;