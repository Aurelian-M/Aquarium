// actions.ts
import type { Product, Action } from "../context/ProductsReducer";

export function addToCart(item: Product, quantity: number): Action {
  return { type: "ADD", payload: { item, quantity } };
}

export function toggleLike(itemId: number): Action {
  return { type: "TOGGLE_LIKE", payload: { itemId } };
}

export function modifyQuantity(itemId: number, quantity: number): Action {
  return { type: "MODIFY", payload: { itemId, quantity } };
}

export function removeItem(itemId: number): Action {
  return { type: "REMOVE", payload: itemId };
}

export function buy(item: Product, quantity: number): Action {
  return { type: "BUY", payload: { item, quantity } };
}