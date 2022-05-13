import { 
  createContext, 
  ReactNode, 
  useContext, 
  useState 
} from "react";
import { api } from "../services/api";

type ProductCart = {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

type CartContextProps = {
  cart: ProductCart[]
  addProductToCart: (id: string) => Promise<void>;
}

type CartProviderProps = {
  children: ReactNode;
}

export const CartContext = createContext({} as CartContextProps);

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<ProductCart[]>([]);

  async function addProductToCart(id: string) {
    try {
      const { data: product } = await api.get(`/${id}`);

      const cartHasProduct = cart.findIndex(
        productCard => productCard.id === product.id
      );

      if (cartHasProduct > -1) return;

      setCart(cart => [...cart,
      {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1
      }
      ]);

      localStorage.setItem(
        "@cart", 
        JSON.stringify(product)
      )
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <CartContext.Provider value={{ cart, addProductToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(){
  return useContext(CartContext);
}