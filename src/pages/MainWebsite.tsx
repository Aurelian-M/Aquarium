import styles from './MainWebsite.module.css'
import Waves from '../components/Waves'
import '../components/Waves.css'
import { useAuth } from "../context/authContext";
import { useLocation, useNavigate } from 'react-router-dom';
import SliderSearchbar from '../components/SliderSearchbar';
import { useEffect } from 'react';
import NavButtons from '../components/NavButtons';
import Comments from '../CommentsComponents/Comments';


export default function MainWebsite() {

  const { user, logout } = useAuth();
  const navigate = useNavigate()

  useEffect(() => {
    const hash = window.location.hash;
    if (hash === "#info") {
      const el = document.getElementById("info");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#comments") {
      const el = document.getElementById("comments");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <div className={styles.main_website_wrapper}>

      <section className={styles.headSection}>
        <div className={styles.welcome}>
          <button className={`${styles.btnLogout}`} onClick={() => {
            logout();
            navigate("/")
          }}>
            {(user?.role === "admin" || user?.role === "user") ? "Logout" : "Login"} </button>
          <h1>
            Welcome {user?.username || "visitor"}!
            {(user?.role === "admin" || user?.role === "user") && ` (${user.role})`} 👋
          </h1>
        </div>
        {user?.role === "guest" && (

          <p>Enjoy browsing our fish shop. No discounts, but still awesome stuff!</p>
        )}

        {user?.role === "hater" && (
          <p>Feel free to look around and leave your salty comments 😈</p>
        )}

        {user?.role === "user" && (
          <p>Thanks for registering! You get access to discounts and your own aquarium.</p>
        )}

        {user?.role === "admin" && (
          <p>Admin mode activated. You have full control.</p>
        )}
      </section>

      <section className={styles.sliderSection}>
        <SliderSearchbar />
      </section>

      <section className={styles.middleTitle}>
        <h1>The Fishy Shop..</h1>
      </section>

      <section className={styles.infoSection}>
        <div className={styles.info} id='info'>
          <div className={styles.infoBackground}>
            <svg
              width="100"
              height="100%"
              viewBox="0 0 50 800"
              preserveAspectRatio="none"
              style={{
                position: 'absolute', left: '40%', top: '-3rem', height: '410', zIndex: 1,
                transform: 'rotate(160deg)',
                transformOrigin: 'center',
              }}
            >
              <path
                d="M 0 0 
      C 70 -20, 0 -40, 20 300 
       C 30 500, 50 700, -20 900 
       L 50 900 
      L 60 0 Z"
                fill="rgba(93, 167, 253, 1)"
              />
            </svg>

            <svg
              width="110"
              height="100%"
              viewBox="0 0 50 800"
              preserveAspectRatio="none"
              style={{
                position: 'absolute', left: '42%', top: '-3rem', height: '410', zIndex: 0,
                transform: 'rotate(160deg)',
                transformOrigin: 'center',
              }}
            >
              <path
                d="M 0 0 
      C 70 -20, 0 -40, 20 300 
       C 30 500, 50 700, -20 900 
       L 50 900 
       L 60 0 Z"
                fill="rgba(52,152,249,0.6)"
              />
            </svg>

            <svg
              width="170"
              height="100%"
              viewBox="0 0 50 800"
              preserveAspectRatio="none"
              style={{
                position: 'absolute', left: '42%', top: '-3rem', height: '410', zIndex: -1,
                transform: 'rotate(160deg)',
                transformOrigin: 'center',
              }}
            >
              <path
                d="M 0 0 
      C 70 -20, 0 -40, 20 300 
       C 30 500, 50 700, -20 900 
       L 50 900 
       L 50 0 Z"
                fill="white"

              />
            </svg>
          </div>

          <div className={styles.infoText}>
            <div>
              <h2>As a Guest:</h2>
              <p> You can use out website but unfortunatelly you cannot receive any discount. </p>
              <p>To receive any discount you need to be registered</p>
            </div>
            <div style={{ marginLeft: '1rem' }}>
              <h2> As a Hater:</h2>
              <p> You can only "hate hate hate" . But nothing will change!</p>
            </div>
            <div >
              <h2> As a User:</h2>
              <p> You are in out data base and you will receive any discounts, if available!</p>
            </div>
            <div style={{ marginLeft: '5rem' }}>
              <h2>As a Admin:</h2>
              <p>Full control of the website. Responsable with the database updates</p>
              <p>Only you can change things oin our virtual Aquarium!</p>
            </div>
          </div>
        </div>
      </section>
      
       <section className={styles.middleTitle}>
        <h1>..and nothing fishy here!</h1>
      </section>

      <section className={styles.commentsSection} id='comments'>
        <Comments />
      </section>

      <NavButtons />
      <Waves />
    </div>
  )
}

