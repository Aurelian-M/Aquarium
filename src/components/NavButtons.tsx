
import { useContext } from 'react';
import styles from '../pages/MainWebsite.module.css'
import { useLocation, useNavigate } from "react-router-dom";
import { ProductsContext } from '../context/ProductsContext';
import { useAuth } from '../context/authContext';


export default function NavButtons() {
  const navigate = useNavigate()
  const location = useLocation();
  const isMainWeb = location.pathname === "/mainweb";
  const isFetchPage = location.pathname === "/fetchpage";
  const { state, dispatch, setCategory } = useContext(ProductsContext);
  const { user } = useAuth();

  const handleInfoClick = () => {

    if (isMainWeb) {
      const el = document.getElementById("info");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
    else if (isFetchPage) {
      navigate('/mainweb')
    }
  };
  let buttonText = "Info";
  if (isFetchPage) {
    buttonText = "Back to Home";
  }

  const handleCommentsForm = () => {
    if (!isMainWeb) {
    navigate('/mainweb#comments') }
   else if (isMainWeb) {
      const el = document.getElementById("comments");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }
  
  return (
    <div>
      <div style={{ position: 'fixed', bottom: '4rem', left: '20%', zIndex: 10 }}>
        <div className={styles.fishButtonWrapper}>
          <button className={styles.fishtyShopButton}
            onClick={() => { setCategory(null); navigate('/fetchpage') }}
          >
            Fishes?!
          </button>
          <div className={styles.fishDropdown}>
            <div className={styles.circleItem} title="Fishes" onClick={() => {
              setCategory('fishes'); navigate('/fetchpage')
            }}>🐟</div>
            <div className={styles.circleItem} title="Aquatic Plants" onClick={() => {
              setCategory('plants'); navigate('/fetchpage')
            }}>🪸</div>
            <div className={styles.circleItem} title="Fish Food" onClick={() => {
              setCategory('food'); navigate('/fetchpage')
            }}>🦐</div>
          </div>
        </div>
      </div>

      <button
        className={`${styles.fishtyShopButton} ${styles.btn2}`}
        onClick={handleInfoClick}
      >
        {buttonText}
      </button>

      <div style={{ position: 'fixed', bottom: '4rem', left: '40%', zIndex: 10 }}>
        <div className={styles.fishButtonWrapper}>
          <button className={styles.fishtyShopButton} onClick={handleCommentsForm}>
            Comments Contact Us
          </button>
          <div className={styles.fishDropdownC}>
            <div className={styles.circleItem} title="comments"
             onClick={() => {handleCommentsForm(); dispatch({ type: "TOGGLE_LIST" })}}  
             >💬</div>
            <div className={styles.circleItem} title="contact form"
             onClick={handleCommentsForm}>✉️</div>
          </div>
        </div>
      </div>
      <button className={`${styles.fishtyShopButton} ${styles.btn4}`}
        onClick={() => navigate('/aquarium')} >
        Aquarium
      </button>
      <button className={`${styles.fishtyShopButton} ${styles.btn5}`}
        onClick={() => navigate('/admin')}
        disabled={user?.role !== 'admin'}
        title={user?.role !== 'admin' ? 'Admin access only' : ''}
      >
        Admin
      </button>
      <button className={`${styles.fishtyShopButton} ${styles.btn6}`}
        onClick={() => navigate('/cart')}>
        Cart
        {state.cart.length > 0 && <span style={{
          position: 'absolute',
          top: '0.7rem', right: '.2rem', fontSize: '1.2rem', border: '2px solid blue',
          backgroundColor: 'white', padding: '.3rem', borderRadius: '50%',
          color: 'blue', width: '2rem', height: '2rem'
        }}> {state.cart.length} </span>}
      </button>
    </div>
  )
}
