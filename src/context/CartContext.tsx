import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import { api } from "../services/api";

type ProductCart = {
  id: string;
  name: string;
  pricePerUnity: number;
  quantity: number;
  totalPrice: number;
}

type CartContextProps = {
  cart: ProductCart[]
  addProductToCart: (id: string) => Promise<void>;
  addProductQuantity: (id: string) => Promise<void>;
  removeProductQuantity: (id: string) => Promise<void>;
  checkout: () => void;
}

type CartProviderProps = {
  children: ReactNode;
}

export const CartContext = createContext({} as CartContextProps);

export function CartProvider({ children }: CartProviderProps) {
  const router = useRouter();

  const [cart, setCart] = useState<ProductCart[]>([]);

  useEffect(() => {
    const productsInCart = JSON.parse(localStorage.getItem("@cart"));

    if (productsInCart) {
      setCart([...productsInCart]);
    }
  }, []);

  async function addProductToCart(id: string) {
    try {
      const { data: { product } } = await api.get(`/${id}`);
      const allProducts = [...cart];

      const cartHasProduct = cart.findIndex(
        productCard => productCard.id === product.id
      );

      if (cartHasProduct > -1) {
        toast(`${product.name} já foi adicioando ao carrinho`);

        return;
      };

      setCart(cart => [
        ...cart,
        {
          id: product.id,
          name: product.name,
          pricePerUnity: product.price,
          totalPrice: product.price * 1,
          quantity: 1
        }
      ]);

      localStorage.setItem("@cart", JSON.stringify(allProducts));

      router.push("/cart");
    } catch (error) {
      console.log(error);
    }
  }

  async function addProductQuantity(id: string) {
    try {
      const { data: { product } } = await api.get(`/${id}`);
      const allProducts = [...cart];

      const productInCart = allProducts.findIndex(
        productInCart => productInCart.id === product.id
      );

      const products = allProducts[productInCart];
      allProducts[productInCart].quantity = products.quantity + 1;
      allProducts[productInCart].totalPrice = products.pricePerUnity * products.quantity;

      setCart([...allProducts]);

      localStorage.setItem("@cart", JSON.stringify(allProducts));
    } catch (error) {
      console.log("Houve erro");
    }
  }

  async function removeProductQuantity(id: string) {
    try {
      const { data: { product } } = await api.get(`/${id}`);
      const allProducts = [...cart];

      const productInCart = allProducts.findIndex(
        productInCart => productInCart.id === product.id
      );

      const products = allProducts[productInCart];

      allProducts[productInCart].quantity = products.quantity - 1;

      if (allProducts[productInCart].quantity < 1) {
        const newCart = cart.filter(
          currentProductsInCart => currentProductsInCart.id !== allProducts[productInCart].id
        );

        setCart(newCart);

        localStorage.setItem("@cart", JSON.stringify(newCart));

        return;
      }

      allProducts[productInCart].totalPrice = products.pricePerUnity * products.quantity;

      setCart([...allProducts]);

      localStorage.setItem("@cart", JSON.stringify(allProducts));
    } catch (error) {
      console.log("Houve erro")
    }
  }

  function checkout() {
    const userAddress = JSON.parse(localStorage.getItem("@address"));

    const message = `
      endereço: ${userAddress}
      \n
      produto: ${JSON.stringify(cart.map(product => {
      return {
        nome: product.name
      }
    }))}
    `;

    localStorage.setItem("@cart", JSON.stringify([]));
    setCart([]);

    window.location.href = redirect(88996018788, message);
  }

  function redirect(num: number, product: string){
    const params = {
      baseURL: `https://web.whatsapp.com/send?`,
      number: `phone=${num}`,
      cart: `text=${encodeURI(product)}&app_absent=0`
    }
    
    const url = `${params.baseURL}${params.number}${params.cart}`;

    return url;
  }

  return (
    <CartContext.Provider value={{
      cart,
      addProductToCart,
      addProductQuantity,
      removeProductQuantity,
      checkout
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}