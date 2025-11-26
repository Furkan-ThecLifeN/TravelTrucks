import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCampers, clearItems } from '../redux/campersSlice';
import styles from '../styles/FilterSidebar.module.css';

const FilterSidebar = ({ setPage }) => {
  const dispatch = useDispatch();
  const [location, setLocation] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  
  const [equipment, setEquipment] = useState({
    AC: false,
    kitchen: false,
    TV: false,
    bathroom: false,
    transmission: false, 
  });

  const handleEquipmentChange = (key) => {
    setEquipment(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSearch = () => {
    dispatch(clearItems());
    setPage(1);
    
    const filters = {
        location,
        form: vehicleType,
        ...equipment 
    };

    dispatch(fetchCampers({ page: 1, filters }));
  };

  const getButtonClass = (type) => {
    return `${styles.filterCard} ${vehicleType === type ? styles.active : ''}`;
  };

  const getEquipmentClass = (key) => {
    return `${styles.filterCard} ${equipment[key] ? styles.active : ''}`;
  };

  return (
    <div className={styles.container}>
      
      <div>
        <label className={styles.label}>Location</label>
        <div className={styles.inputWrapper}>
            <span className={styles.icon}>📍</span>
            <input 
                type="text" 
                placeholder="Kyiv, Ukraine" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className={styles.input}
            />
        </div>
      </div>

      <div className={styles.filterGroupTitle}>Filters</div>

      <div>
        <h3 className={styles.filterSubtitle}>Vehicle equipment</h3>
        <div className={styles.filterGrid}>
            <button 
                onClick={() => handleEquipmentChange('AC')} 
                className={getEquipmentClass('AC')}
            >
                ❄️ AC
            </button>
            <button 
                onClick={() => handleEquipmentChange('transmission')} 
                className={getEquipmentClass('transmission')}
            >
                🕹 Automatic
            </button>
            <button 
                onClick={() => handleEquipmentChange('kitchen')} 
                className={getEquipmentClass('kitchen')}
            >
                🍳 Kitchen
            </button>
            <button 
                onClick={() => handleEquipmentChange('TV')} 
                className={getEquipmentClass('TV')}
            >
                📺 TV
            </button>
            <button 
                onClick={() => handleEquipmentChange('bathroom')} 
                className={getEquipmentClass('bathroom')}
            >
                🚿 Shower/WC
            </button>
        </div>
      </div>

      <div style={{marginTop: '24px'}}>
        <h3 className={styles.filterSubtitle}>Vehicle Type</h3>
        <div className={styles.filterGrid}>
            <button 
                onClick={() => setVehicleType('panelTruck')} 
                className={getButtonClass('panelTruck')}
            >
                Van
            </button>
            <button 
                onClick={() => setVehicleType('fullyIntegrated')} 
                className={getButtonClass('fullyIntegrated')}
            >
                Fully Integrated
            </button>
            <button 
                onClick={() => setVehicleType('alcove')} 
                className={getButtonClass('alcove')}
            >
                Alcove
            </button>
        </div>
      </div>

      <button onClick={handleSearch} className={styles.searchBtn}>
        Search
      </button>
    </div>
  );
};

export default FilterSidebar;