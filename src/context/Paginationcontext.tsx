import { createContext, useContext, useState, type ReactNode } from "react";

type SetPage = React.Dispatch<React.SetStateAction<number>>;

interface PaginationContextType {
  currentPage: number;
  setCurrentPage: SetPage;
  itemsPerPage: number;
  totalPages: number;
  setTotalPages: SetPage;
   goToNextPage: () => void;
  goToPrevPage: () => void;
}

const PaginationContext = createContext<PaginationContextType | undefined>(undefined);

export const PaginationProvider = ({ children }: { children: ReactNode }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5;
   
    const goToNextPage = () => {
  setCurrentPage((prev) => Math.min(prev + 1, totalPages));
};

const goToPrevPage = () => {
  setCurrentPage((prev) => Math.max(prev - 1, 1));
};

  return (
    <PaginationContext.Provider
      value={{ currentPage, setCurrentPage, 
               itemsPerPage, totalPages, setTotalPages,
               goToNextPage, goToPrevPage  }}
        >
      {children}
    </PaginationContext.Provider>
  );
};

export const usePagination = () => {
  const context = useContext(PaginationContext);
  if (!context) {
    throw new Error("usePagination must be used within PaginationProvider");
  }
  return context;
};
