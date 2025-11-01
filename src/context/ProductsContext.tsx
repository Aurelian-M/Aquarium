import { createContext, useEffect, useReducer, useState } from "react";
import { initialState, reducer, type Action, type State, type Category} from "./ProductsReducer";

export interface ContextType {
    state: State ;
    dispatch: React.Dispatch<Action>;
    quantities: { [petId: number]: number };
    setQuantities: React.Dispatch<React.SetStateAction<{ [petId: number]: number }>>;
    category: Category
    setCategory: React.Dispatch<React.SetStateAction<Category>>;
}

export const ProductsContext = createContext<ContextType>({} as ContextType);

export default function ContextProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [quantities, setQuantities] = useState<{ [petId: number]: number }>({});
  const [category, setCategory] = useState<Category>(null);

useEffect(() => {
  const fetchData = async () => {
    try {
      console.log("📡 Starting fetch...");
   
    const res = await fetch("http://localhost:3001/api/products");

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log("🔁 Data fetched:", data);

      dispatch({ type: "FETCH", payload: data }); 
    } catch (err) {
      console.error("❌ Fetch error:", err);
    } finally {
      console.log("✅ Fetch completed");
    }
  };

  fetchData();
}, []);  

  return (
    <ProductsContext.Provider value={{ state, dispatch, quantities, setQuantities, category, setCategory}}>
      {children}
    </ProductsContext.Provider>
  );
}