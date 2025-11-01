import { Outlet, useNavigate } from "react-router-dom";
import styles from "./AdminPage.module.css"

export default function AdminPage() {
   const navigate = useNavigate()
 return (
  <div> 
    <div className={styles.adminHeader}>
      <h1>Admin Control Page</h1>
      <nav className={styles.navbar}>
      <button onClick={() => navigate('/mainweb')}>MainWebsite</button>  
      <button onClick={() => navigate('addproducts')}>Admin</button>  
      <button onClick={() => navigate('products')}>Products</button>
      <button onClick={() => navigate('users')}>Users</button>
      </nav>
    </div>  
        <hr/>
         <Outlet/>       
   </div> 
  );
}
