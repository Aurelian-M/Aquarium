
import styles from "./CartPage.module.css";
import { useContext, useEffect } from "react";
import { ProductsContext } from "../context/ProductsContext";
import { modifyQuantity, toggleLike } from "../utils/Actions";
import { useNavigate, NavLink } from "react-router-dom";

import { useAuth } from "../context/authContext";
import { savePurchase } from "../utils/Purchases";
import { isRealUser } from "../context/types";

export default function CartPage() {
  const { state, dispatch, setQuantities } = useContext(ProductsContext);
   const { user, token } = useAuth();
  const totalPrice = state.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const navigate = useNavigate()


  const handleBuy = async () => {
    if (!isRealUser(user) || !token) {
    console.error("User not authenticated or not a 'RealUser'. Cannot save purchase.");
    navigate("/login");
    return;
  }

    const allPurchasesSuccessful = await Promise.all(
      state.cart.map((item) =>
        savePurchase(user.id, item.id, item.quantity, token)
      )
    );

    if (allPurchasesSuccessful.every(result => result)) {
      dispatch({ type: "CLEAR" });
      console.log("All purchases completed and saved to the database.");
    } else {
      console.error("One or more purchases failed to save.");
    }
  };
useEffect(() => {
  console.log("🧾 Purchase updated:", state.purchase);
}, [state.purchase]);

  return (
    <div className={styles.container}>
      <button onClick={() => navigate('/fetchpage')} className={styles.backButton}>← To Main </button>
      <h1 className={styles.heading}>🛒 Your Cart</h1> 
      <hr className={styles.divider} />

      {state.cart.length === 0 ? (
        <p className={styles.empty}>Your cart is empty.</p>
      ) : (
        state.cart.map((item) => (
          <div key={item.id} className={styles.itemCard}>
            <div className={styles.imageWrapper}>
              <img src={item.image} alt={item.name} className={styles.image} />
               <NavLink to={`/item/${item.id}`}>Find out more...</NavLink>
            </div>

            <div className={styles.details}>
              <div className={styles.headerRow}>
                <h2 className={styles.title}>{item.name}</h2>
                <button
                  className={`${styles.likeButton} ${item.liked ? styles.liked : ""}`}
                  onClick={() => dispatch(toggleLike(item.id))}
                >
                  {item.liked ? "★" : "☆"}
                </button>
              </div>

              <p><strong>Price:</strong> {item.price} €</p>
              <p><strong>Quantity:</strong> {item.quantity}</p>

              <div className={styles.controls}>
                <label>Update Quantity:</label>
                <input
                  type="number"
                  value={item.quantity}
                  min={1}
                  onChange={(e) => {
                    const newQty = Math.max(1, Number(e.target.value));
                    dispatch(modifyQuantity(item.id, newQty));
                    setQuantities((prev) => ({
                      ...prev,
                      [item.id]: newQty
                    }));
                  }}
                  className={styles.quantityInput}
                />
                <button
                  className={styles.removeButton}
                  onClick={() => {
                    dispatch({ type: 'REMOVE', payload: item.id });
                    setQuantities((prev) => {
                      const newQuantities = { ...prev };
                      delete newQuantities[item.id];
                      return newQuantities;
                    });
                  }}
                >
                  ❌ 
                </button>
              </div>
            </div>
          </div>
        ))
      )}

      <hr className={styles.divider} />
      <div className={styles.total}>
        <h2>Total: {totalPrice.toFixed(2)} €</h2>
      </div>

      {state.cart.length > 0 && (
       <div>
       <button className={styles.clearButton} onClick={() => dispatch({ type: 'CLEAR' })}>
          🧹 Clear Cart
        </button>
        <button className={styles.buyButton} onClick={handleBuy}>
          Buy
        </button> 
      </div> 
      )}
    </div>
  );
}
