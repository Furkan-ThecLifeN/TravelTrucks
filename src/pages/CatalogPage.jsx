import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampers } from '../redux/campersSlice';
import CamperCard from '../components/CamperCard';
import FilterSidebar from '../components/FilterSidebar';
import styles from '../styles/CatalogPage.module.css'; 

const CatalogPage = () => {
  const dispatch = useDispatch();
  const { items, isLoading } = useSelector(state => state.campers);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if(items.length === 0) {
        dispatch(fetchCampers({ page: 1 }));
    }
  }, [dispatch, items.length]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    dispatch(fetchCampers({ page: nextPage }));
  };

  return (
    <div className={styles.container}>
      
      <div className={styles.sidebarWrapper}>
        <FilterSidebar setPage={setPage} />
      </div>
      
      <div className={styles.contentWrapper}>
        
        <div className={styles.camperList}>
          {items.map((camper) => (
            <CamperCard key={camper.id} camper={camper} />
          ))}
        </div>

        {items.length > 0 && !isLoading && (
          <button 
            onClick={handleLoadMore}
            className={styles.loadMoreBtn}
          >
            Load More
          </button>
        )}
        
        {isLoading && <p className={styles.loadingText}>Loading...</p>}
      </div>
    </div>
  );
};

export default CatalogPage;