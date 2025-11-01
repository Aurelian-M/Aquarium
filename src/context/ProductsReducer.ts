
interface BaseItem {
  id: number;
  name: string;
  image: string;
  price: number;
  liked: boolean;
  quantity: number;
}

export interface Fish extends BaseItem {
  category: 'fishes';
  age: string;
  environment: string;
  food: string;
  temperature: string;
}

export interface Plant extends BaseItem {
  category: 'plants';
  maintenance: string;
  temperature: string;
  light: string;
}

export interface Food extends BaseItem {
  category: 'food';
  type: string;
}

export type Category = 'fishes' | 'plants' | 'food' | null;


export type Product = Fish | Plant | Food;

export interface CartItem extends BaseItem {
  category: 'fishes' | 'plants' | 'food';
}

export interface Purchase extends CartItem{}

export interface State {
  items: Product[]
  cart: CartItem[]
  purchase: Purchase[]
   showlist: boolean;
}


export type Action =
  | { type: "FETCH"; payload: Fish[] | Plant[] | Food[] }
  | { type: "ADD"; payload: { item: Product; quantity: number } }
  | { type: "REMOVE"; payload: number }
  | { type: "MODIFY"; payload: { itemId: number; quantity: number } }
  | { type: "TOGGLE_LIKE"; payload: { itemId: number } }
  | { type: "CLEAR" }
  | { type: "BUY"; payload: { item: Product; quantity: number } }
  | { type: "TOGGLE_LIST" };

export const initialState: State = { items: [], cart: [], purchase: [], showlist: false };

export function reducer(state: State, action: Action) {

  switch (action.type) {

    case "FETCH":
      return { ...state, items: action.payload };

    case "ADD": {
      const { item, quantity } = action.payload;
      const itemInStore = state.items.find(p => p.id === item.id);
      const alreadyInCart = state.cart.find(c => c.id === item.id);

      if (!itemInStore || itemInStore.quantity < quantity) {
        alert("Not enough stock");
        return state;  
      }

      const updatedItems = state.items.map(p =>p.id === item.id
          ? { ...p, quantity: p.quantity - quantity }
          : p
      );

      let updatedCart;

      if (alreadyInCart) {
        updatedCart = state.cart.map(c =>
          c.id === item.id
            ? { ...c, quantity: c.quantity + quantity }
            : c
        );
      } else {
        updatedCart = [...state.cart, { ...item, quantity }];
      }

      return {
        ...state,
        items: updatedItems,
        cart: updatedCart,
      };
    }
    case "TOGGLE_LIKE":
      {
        const { itemId } = action.payload;

        return {
          ...state,
          items: state.items.map(e =>
            e.id === itemId ? { ...e, liked: !e.liked } : e
          ),
          cart: state.cart.map(e =>
            e.id === itemId ? { ...e, liked: !e.liked } : e
          )
        };
      }

    case "TOGGLE_LIST":
     return {
       ...state,
       showlist: !state.showlist,
       };

    case "REMOVE": {
      const itemToRemove = state.cart.find(c => c.id === action.payload);

      if (!itemToRemove) return state;

      const updatedItems = state.items.map(p =>
        p.id === itemToRemove.id
          ? { ...p, quantity: p.quantity + itemToRemove.quantity }
          : p
      );

      const updatedCart = state.cart.filter(c => c.id !== action.payload);

      return {
        ...state,
        items: updatedItems,
        cart: updatedCart,
      };
    }

    case "MODIFY": {
      const { itemId, quantity } = action.payload;
      const cartItem = state.cart.find(c => c.id === itemId);
      const storeItem = state.items.find(p => p.id === itemId);

      if (!cartItem || !storeItem) return state;

      const delta = quantity - cartItem.quantity;

      if (delta > 0 && storeItem.quantity < delta) {
        alert("Not enough stock for update");
        return state;
      }

      const updatedCart = state.cart.map(c =>
        c.id === itemId ? { ...c, quantity } : c
      );

      const updatedItems = state.items.map(p =>
        p.id === itemId
          ? { ...p, quantity: p.quantity - delta }
          : p
      );

      return {
        ...state,
        items: updatedItems,
        cart: updatedCart,
      };
    }

    case "CLEAR": {
      const restoredItems = state.items.map(item => {
        const inCart = state.cart.find(c => c.id === item.id);
        if (!inCart) return item;
        return {
          ...item,
          quantity: item.quantity + inCart.quantity
        };
      });

      return {
        ...state,
        items: restoredItems,
        cart: [],
      };
    }

     case "BUY": {
      const { item, quantity } = action.payload;
      console.log("Buying item:", item); 

      const itemInStore = state.items.find(p => p.id === item.id);
      const alreadyPurchased = state.purchase.find(c => c.id === item.id);

      if (!itemInStore || itemInStore.quantity < quantity) {
        alert("Not enough stock");
        return state;  
      }

      const updatedItems = state.items.map(p =>p.id === item.id
          ? { ...p, quantity: p.quantity - quantity }
          : p
      );

      let updatedPurchase;

      if (alreadyPurchased) {
        updatedPurchase = state.purchase.map(c =>
          c.id === item.id
            ? { ...c, quantity: c.quantity + quantity }
            : c
        );
      } else {
        updatedPurchase = [...state.purchase, { ...item, quantity }];
      }

      return {
        ...state,
        items: updatedItems,
        purchase: updatedPurchase,
      };
    }

    default:
      return state;
  }
}