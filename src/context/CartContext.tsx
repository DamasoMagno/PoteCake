import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { api } from "../services/api";
import { formatCurrency } from "../utils/format";
import { Product } from "../types/Product";

export type ProductCart = {
  id: string;
  name: string;
  pricePerUnity: number;
  quantity: number;
  totalPrice: number;
}

type CartContextProps = {
  cart: ProductCart[];
  addProductToCart(id: string): Promise<void>;
  incrementProductAmount(id: string): Promise<void>;
  decrementProductAmount(id: string): Promise<void>;
  checkout(): void;
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

  async function getProduct(id: string) {
    const { data: { product } } = await api.get(`/${id}`);

    const cartHasProduct = cart.findIndex(
      productCard => productCard.id === product.id
    );

    return {
      position: cartHasProduct,
      product
    }
  }

  async function addProductToCart(id: string) {
    try {
      const { position, product } = await getProduct(id);

      if (position > -1) {
        const products = cart.filter(productCard => productCard.id !== product.id);
        setCart([...products]);
        localStorage.setItem("@cart", JSON.stringify([...products]));

        return;
      }

      const newProduct = {
        id: product.id,
        name: product.name,
        pricePerUnity: product.price,
        totalPrice: product.price * 1,
        quantity: 1
      }

      setCart(cart => [...cart, newProduct]);

      localStorage.setItem("@cart", JSON.stringify([...cart, newProduct]));
    } catch (error) {
      console.log(error);
    }
  }

  async function incrementProductAmount(id: string) {
    try {
      const { position } = await getProduct(id);

      cart[position].quantity += 1;
      cart[position].totalPrice = cart[position].pricePerUnity * cart[position].quantity;

      setCart([...cart]);

      localStorage.setItem("@cart", JSON.stringify(cart));
    } catch (error) {
      console.log("Houve erro");
    }
  }

  async function decrementProductAmount(id: string) {
    try {
      const { position } = await getProduct(id);

      cart[position].quantity -= 1;

      if (cart[position].quantity < 1) {
        const newCart = cart.filter(
          currentProductsInCart => currentProductsInCart.id !== cart[position].id
        );

        setCart(newCart);

        localStorage.setItem("@cart", JSON.stringify(newCart));

        return;
      }

      cart[position].totalPrice = cart[position].pricePerUnity * cart[position].quantity;

      setCart([...cart]);

      localStorage.setItem("@cart", JSON.stringify([...cart]));
    } catch (error) {
      console.log("Houve erro")
    }
  }

  function checkout() {
    const userAddress = JSON.parse(localStorage.getItem("@address"));

    const message = `
      Endereço: ${userAddress}
      
      Descrição Pedidos 
      ${cart.map(product => `${product.quantity}x ${product.name}  ${formatCurrency(product.totalPrice)}`)}

      Total Pedido: ${`${formatCurrency(cart.reduce((acc, curent) => acc + curent.totalPrice, 0))}`}
    `;

    location.href = redirect(88996018788, message);

    localStorage.setItem("@cart", JSON.stringify([]));
    setCart([]);
  }

  function redirect(num: number, product: string) {
    const params = {
      baseURL: `https://api.whatsapp.com/send?`,
      number: `phone=${num}&`,
      cart: `text=${encodeURI(product)}&app_absent=0`
    }

    const url = `${params.baseURL}${params.number}${params.cart}`;

    return url;
  }

  return (
    <CartContext.Provider value={{
      cart,
      addProductToCart,
      incrementProductAmount,
      decrementProductAmount,
      checkout
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}