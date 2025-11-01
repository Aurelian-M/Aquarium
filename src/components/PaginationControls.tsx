
import { usePagination } from "../context/Paginationcontext";
import styles from './FetchPage.module.css'

export default function PaginationControls() {
  const {
    currentPage,
    totalPages,
    setCurrentPage,
    goToNextPage,
    goToPrevPage,
  } = usePagination();

  // Don't render pagination if there's only 1 page
  if (totalPages <= 1) return null;

  return (
    <div className={styles.pagination}>
      <button onClick={goToPrevPage} disabled={currentPage === 1}>
        ←
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={currentPage === page ? styles.activePage : ""}
        >
          {page}
        </button>
      ))}

      <button onClick={goToNextPage} disabled={currentPage === totalPages}>
        →
      </button>
    </div>
  );
}
