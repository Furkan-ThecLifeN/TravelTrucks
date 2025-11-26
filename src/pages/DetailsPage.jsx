import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCamperById } from '../redux/campersSlice';
import BookingForm from '../components/BookingForm';
import styles from '../styles/DetailsPage.module.css';

const DetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentItem, isLoading } = useSelector(state => state.campers);

  useEffect(() => {
    dispatch(fetchCamperById(id));
  }, [dispatch, id]);

  const renderStars = (rating) => {
    return "★".repeat(Math.round(rating)) + "☆".repeat(5 - Math.round(rating));
  };

  if (isLoading || !currentItem) return <div className={styles.container}>Loading details...</div>;

  return (
    <div className={styles.container}>
      
      <div className={styles.header}>
        <h1 className={styles.title}>{currentItem.name}</h1>
        <div className={styles.ratingLocation}>
          <span className={styles.stars}>★ {currentItem.rating}</span>
          <span>({currentItem.reviews?.length} Reviews)</span>
          <span>• {currentItem.location}</span>
        </div>
        <div className={styles.price}>€{currentItem.price.toFixed(2)}</div>
      </div>

      <div className={styles.gallery}>
        {currentItem.gallery?.map((img, idx) => (
          <img 
            key={idx} 
            src={typeof img === 'object' ? img.original : img} 
            alt={currentItem.name} 
          />
        ))}
      </div>

      <div className={styles.description}>
        {currentItem.description}
      </div>

      <div className={styles.contentWrapper}>
        
        <div className={styles.infoColumn}>
          
          <div className={styles.featuresSection}>
            <h3 className={styles.sectionTitle}>Features</h3>
            <ul className={styles.featureList}>
                <li className={styles.featureBadge}>Transmission: {currentItem.transmission}</li>
                <li className={styles.featureBadge}>Engine: {currentItem.engine}</li>
                {currentItem.AC && <li className={styles.featureBadge}>❄️ AC</li>}
                {currentItem.kitchen && <li className={styles.featureBadge}>🍳 Kitchen</li>}
                {currentItem.TV && <li className={styles.featureBadge}>📺 TV</li>}
                {currentItem.bathroom && <li className={styles.featureBadge}>🚿 Bathroom</li>}
            </ul>
          </div>

          <div className={styles.featuresSection}>
            <h3 className={styles.sectionTitle}>Vehicle Details</h3>
            <ul className={styles.featureList} style={{flexDirection: 'column', gap: '8px'}}>
                <li><strong>Form:</strong> {currentItem.form}</li>
                <li><strong>Length:</strong> {currentItem.length}</li>
                <li><strong>Width:</strong> {currentItem.width}</li>
                <li><strong>Height:</strong> {currentItem.height}</li>
                <li><strong>Tank:</strong> {currentItem.tank}</li>
                <li><strong>Consumption:</strong> {currentItem.consumption}</li>
            </ul>
          </div>

          <div className={styles.reviewsSection}>
            <h3 className={styles.sectionTitle}>Reviews</h3>
            {currentItem.reviews?.length > 0 ? (
                currentItem.reviews.map((review, idx) => (
                    <div key={idx} className={styles.reviewItem}>
                        <div className={styles.reviewerHeader}>
                            <div className={styles.avatar}>
                                {review.reviewer_name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <div className={styles.reviewerName}>{review.reviewer_name}</div>
                                <div className={styles.stars}>{renderStars(review.reviewer_rating)}</div>
                            </div>
                        </div>
                        <p>{review.comment}</p>
                    </div>
                ))
            ) : (
                <p>No reviews yet.</p>
            )}
          </div>
        </div>

        <div className={styles.formColumn}>
            <h3 className={styles.formTitle}>Book your campervan now</h3>
            <p className={styles.formSubtitle}>Stay connected! We are always ready to help you.</p>
            <BookingForm />
        </div>

      </div>
    </div>
  );
};

export default DetailsPage;