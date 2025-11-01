
import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../context/ProductsContext";
import { addToCart, toggleLike } from "../utils/Actions";
import styles from "./SingleCard.module.css";

export default function SingleCard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const itemId = Number(id);

  const { state, dispatch, quantities, setQuantities } = useContext(ProductsContext);
  const product = state.items.find((item) => item.id === itemId);

  const [quantity, setQuantity] = useState<number>(quantities[itemId] || 1);

  useEffect(() => {
    if (product) {
      setQuantities((prev) => ({
        ...prev,
        [product.id]: quantity,
      }));
    }
  }, [quantity, product, setQuantities]);

  if (!product) {
    return (
      <div className={styles.notFound}>
        <button onClick={() => navigate(-1)} className={styles.backButton}>Back</button>
        <h2>Product not found</h2>
      </div>
    );
  }

  const handleAddToCart = () => {
    const isInCart = state.cart.find(c => c.id === product.id);
    if (isInCart) {
      dispatch({
        type: "MODIFY",
        payload: {
          itemId: product.id,
          quantity: quantity,
        }
      });
    } else {
      dispatch(addToCart(product, quantity));
    }
  };

  const handleToggleLike = () => {
    dispatch(toggleLike(product.id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.navButtons}>
      <button onClick={() => navigate('/fetchpage')} className={styles.backButton}>← To Main </button>
      <button onClick={() => navigate('/cart')} className={styles.backButton}> To Cart →</button>
     </div>
      <div className={styles.card}>
        <div className={styles.imageSection}>
          <img src={product.image} alt={product.name} className={styles.image} />

            <div className={styles.btns}>  
          <button
            onClick={handleToggleLike}
            className={`${styles.likeButton} ${product.liked ? styles.liked : ""}`}
          >
            {product.liked ? "★ Liked" : "☆ Like"}
          </button>

          <div className={styles.quantityRow}>
            <label className={styles.quantityLabel}>
              Quantity:
              <input
                type="number"
                min={1}
                max={product.quantity}
                value={quantity}
                onChange={(e) => {
                  const val = Math.min(Number(e.target.value), product.quantity);
                  setQuantity(val > 0 ? val : 1);
                }}
                className={styles.quantityInput}
              />
            </label>
            <button onClick={handleAddToCart} className={styles.cartButton}>
              Add to Cart
            </button>
          </div>
         </div>

        </div>

        <div className={styles.infoSection}>
          <h1 className={styles.title}>{product.name}</h1>
          <p className={styles.price}><strong>Price:</strong> {product.price} €</p>
          <p className={styles.stock}><strong>Available Stock:</strong> {product.quantity}</p>
           
          <p><b>Category:</b> {product.category}</p>
        {'age' in product && product.age && <p><b>Age:</b> {product.age}</p>}
        {'environment' in product && product.environment && <p><b>Environment:</b> {product.environment}</p>}
        {"temperature" in product && product.temperature && <p><b>Temperature:</b> {product.temperature}</p>}
        {"food" in product && product.food && <p><b>Food:</b> {product.food}</p>}

        {"maintenance" in product && product.maintenance && <p><b>Maintenance:</b> {product.maintenance}</p>} 
        {"light" in product && product.light && <p><b>Light:</b> {product.light}</p>}
        </div>
         
       
      </div>
    </div>
  );
}
