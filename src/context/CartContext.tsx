"use client";
import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
  image: string;
  color?: string;
  size?: string;
};

type CartState = { items: CartItem[] };
type Action =
  | { type: "ADD"; payload: CartItem }
  | { type: "SET_QTY"; id: string; qty: number; color?: string; size?: string }
  | { type: "REMOVE"; id: string; color?: string; size?: string }
  | { type: "CLEAR" }
  | { type: "HYDRATE"; state: CartState };

const initialState: CartState = { items: [] };
const KEY = (i: Pick<CartItem, "id" | "color" | "size">) =>
  `${i.id}|${i.color ?? ""}|${i.size ?? ""}`;

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "HYDRATE":
      return action.state;

    case "ADD": {
      const k = KEY(action.payload);
      const found = state.items.find(i => KEY(i) === k);
      const items = found
        ? state.items.map(i =>
            KEY(i) === k ? { ...i, qty: i.qty + action.payload.qty } : i
          )
        : [...state.items, action.payload];
      return { ...state, items };
    }

    case "SET_QTY": {
      const k = KEY(action);
      const items = state.items
        .map(i => (KEY(i) === k ? { ...i, qty: Math.max(1, action.qty) } : i))
        .filter(i => i.qty > 0);
      return { ...state, items };
    }

    case "REMOVE": {
      const k = KEY(action);
      return { ...state, items: state.items.filter(i => KEY(i) !== k) };
    }

    case "CLEAR":
      return { ...state, items: [] };

    default:
      return state;
  }
}

const CartCtx = createContext<{
  state: CartState;
  add: (item: CartItem) => void;
  setQty: (id: string, qty: number, color?: string, size?: string) => void;
  remove: (id: string, color?: string, size?: string) => void;
  clear: () => void;
}>({
  state: initialState,
  add: () => {},
  setQty: () => {},
  remove: () => {},
  clear: () => {},
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Hydrate desde localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("tbv_cart");
      if (raw) {
        const parsed = JSON.parse(raw) as CartState;
        if (parsed && Array.isArray(parsed.items)) {
          dispatch({ type: "HYDRATE", state: parsed });
        }
      }
    } catch {}
  }, []);

  // Persistencia
  useEffect(() => {
    try {
      localStorage.setItem("tbv_cart", JSON.stringify(state));
    } catch {}
  }, [state]);

  const api = useMemo(
    () => ({
      state,
      add: (item: CartItem) => dispatch({ type: "ADD", payload: item }),
      setQty: (id: string, qty: number, color?: string, size?: string) =>
        dispatch({ type: "SET_QTY", id, qty, color, size }),
      remove: (id: string, color?: string, size?: string) =>
        dispatch({ type: "REMOVE", id, color, size }),
      clear: () => dispatch({ type: "CLEAR" }),
    }),
    [state]
  );

  return <CartCtx.Provider value={api}>{children}</CartCtx.Provider>;
}

export const useCart = () => useContext(CartCtx);
