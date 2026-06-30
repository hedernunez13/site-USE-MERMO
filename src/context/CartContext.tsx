import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import type { CartItem, Product, ProductColor, Coupon } from "@/types";
import { findCoupon } from "@/data/content";

interface CartState {
  items: CartItem[];
  coupon: Coupon | null;
}

type Action =
  | { type: "ADD"; product: Product; color: ProductColor; quantity: number }
  | { type: "REMOVE"; id: string; colorName: string }
  | { type: "SET_QTY"; id: string; colorName: string; quantity: number }
  | { type: "APPLY_COUPON"; coupon: Coupon }
  | { type: "REMOVE_COUPON" }
  | { type: "CLEAR" }
  | { type: "HYDRATE"; state: CartState };

const STORAGE_KEY = "mermo.cart";

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "HYDRATE":
      return action.state;
    case "ADD": {
      const existing = state.items.find(
        (i) =>
          i.product.id === action.product.id &&
          i.color.name === action.color.name,
      );
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i === existing
              ? { ...i, quantity: i.quantity + action.quantity }
              : i,
          ),
        };
      }
      return {
        ...state,
        items: [
          ...state.items,
          {
            product: action.product,
            color: action.color,
            quantity: action.quantity,
          },
        ],
      };
    }
    case "REMOVE":
      return {
        ...state,
        items: state.items.filter(
          (i) => !(i.product.id === action.id && i.color.name === action.colorName),
        ),
      };
    case "SET_QTY":
      return {
        ...state,
        items: state.items.map((i) =>
          i.product.id === action.id && i.color.name === action.colorName
            ? { ...i, quantity: Math.max(1, action.quantity) }
            : i,
        ),
      };
    case "APPLY_COUPON":
      return { ...state, coupon: action.coupon };
    case "REMOVE_COUPON":
      return { ...state, coupon: null };
    case "CLEAR":
      return { items: [], coupon: null };
    default:
      return state;
  }
}

interface CartContextValue extends CartState {
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, color: ProductColor, quantity?: number) => void;
  removeItem: (id: string, colorName: string) => void;
  setQty: (id: string, colorName: string, quantity: number) => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  clear: () => void;
  count: number;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
}

const CartContext = createContext<CartContextValue | null>(null);

const FREE_SHIPPING_THRESHOLD = 299;
const SHIPPING_COST = 29.9;

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [], coupon: null });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: "HYDRATE", state: JSON.parse(raw) });
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const subtotal = useMemo(
    () => state.items.reduce((acc, i) => acc + i.product.price * i.quantity, 0),
    [state.items],
  );

  const discount = useMemo(() => {
    if (!state.coupon) return 0;
    if (state.coupon.minPurchase && subtotal < state.coupon.minPurchase) return 0;
    return state.coupon.type === "percent"
      ? (subtotal * state.coupon.value) / 100
      : 0;
  }, [state.coupon, subtotal]);

  const shipping = useMemo(() => {
    if (state.items.length === 0) return 0;
    if (state.coupon?.code === "FRETEGRATIS") return 0;
    return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  }, [subtotal, state.items.length, state.coupon]);

  const value: CartContextValue = {
    ...state,
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    addItem: (product, color, quantity = 1) => {
      dispatch({ type: "ADD", product, color, quantity });
      setIsOpen(true);
    },
    removeItem: (id, colorName) => dispatch({ type: "REMOVE", id, colorName }),
    setQty: (id, colorName, quantity) =>
      dispatch({ type: "SET_QTY", id, colorName, quantity }),
    applyCoupon: (code) => {
      const coupon = findCoupon(code);
      if (coupon) {
        dispatch({ type: "APPLY_COUPON", coupon });
        return true;
      }
      return false;
    },
    removeCoupon: () => dispatch({ type: "REMOVE_COUPON" }),
    clear: () => dispatch({ type: "CLEAR" }),
    count: state.items.reduce((acc, i) => acc + i.quantity, 0),
    subtotal,
    discount,
    shipping,
    total: Math.max(0, subtotal - discount) + shipping,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart deve ser usado dentro de CartProvider");
  return ctx;
}
