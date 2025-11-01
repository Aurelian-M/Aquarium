
import styles from './AQUARIUM.module.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useNavigate } from 'react-router-dom';
import PurchasedFishGallery from '../adminComponents/PurchasedFishGalerry';
import AquariumCanvas from '../components/AquariumCanvas';

export default function AQUARIUM() {
  const navigate = useNavigate();

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.backgroundContainer}>
        <header className={styles.header}>
          <div className={styles.navBtn}>
            <button onClick={() => navigate(-1)}>Back</button>
            <button onClick={() => navigate('/mainweb')}>Home</button>
          </div>
          <h1>AQUARIUM</h1>
          <div className={styles.support}>
            <PurchasedFishGallery />
          </div>
        </header>
        <main>
          <AquariumCanvas />
        </main>
      </div>
    </DndProvider>
  );
}
