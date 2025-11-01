
import { useContext, useEffect } from "react";
import NavButtons from "./NavButtons";
import Waves from "./Waves";
import { ProductsContext } from "../context/ProductsContext";
import { NavLink } from "react-router-dom";
import styles from "./FetchPage.module.css";
import { usePagination } from "../context/Paginationcontext";
import PaginationControls from "./PaginationControls";
import cartIcon from '../pictures/Icons/shopping-cart.png'
import { addToCart, toggleLike } from "../utils/Actions";
import type { Product } from "../context/ProductsReducer";


export default function FetchPage() {

  const { state, dispatch, quantities, setQuantities, category } = useContext(ProductsContext);
  const { currentPage, setCurrentPage, itemsPerPage, setTotalPages } = usePagination();
  const filteredItems = category ? state.items.filter(item => item.category === category) : state.items;

  useEffect(() => {
    const total = Math.ceil(filteredItems.length / itemsPerPage);
    setTotalPages(total);
  }, [filteredItems, itemsPerPage, setTotalPages]);

  useEffect(() => {
    setCurrentPage(1);
  }, [category]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);
  const categoryLabel = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : null;

  const handleAddToCart = (item: Product) => {
    dispatch(addToCart(item, quantities[item.id] || 1));
   
  }

    return (
      <div>
        <NavButtons />
        <Waves />

        <div className={styles.contentArea}>
          <PaginationControls />
          <h2 style={{ textAlign: 'center', marginTop: '1rem' }}>
            {category ? `Showing: ${categoryLabel}` : "Showing: All Products"}
          </h2>
          <div className={styles.fishContainer} >
            {currentItems.map((item) => (
              <div key={item.id} className={styles.fishCard}>
                <h2>{item.name}</h2>
                <img src={item.image} alt={item.name} />
                <p><b>Price:</b> {item.price} €</p>

                <div className={styles.quantityContainer}>
                  <button className={styles.likedBtn}
                    onClick={() => dispatch(toggleLike(item.id))}>
                    {item.liked ? "★" : "☆"}
                  </button>

                  <input
                    type="number"
                    min={1}
                    max={999}
                    step={1}
                    value={quantities[item.id] || 1}
                    onChange={(e) => {
                      const val = Math.min(Number(e.target.value), 999);
                      setQuantities((prev) => ({
                        ...prev,
                        [item.id]: val > 0 ? val : 1,
                      }));
                    }}
                    style={{ width: "60px" }}
                  />
                  <button disabled={item.quantity <= 0}
                    onClick={() => handleAddToCart(item)}>
                    <img src={cartIcon} />
                     {state.cart.some(cartItem => cartItem.id === item.id) && (
                   <span style={{ position: 'absolute', marginLeft: '0.3rem' }}>✅</span>
                    )}
                  </button>
                 
                </div>
                <NavLink to={`/item/${item.id}`}>Find out more...</NavLink>
              </div>
            ) )}
          </div>
        </div>
      </div>
    );
  } 

