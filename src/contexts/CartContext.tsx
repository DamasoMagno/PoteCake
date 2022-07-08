import { createContext, FC, useContext, useEffect, useState } from "react";
import { MdDelete, MdDone } from "react-icons/md";

import { client } from "src/libs/apollo";
import { GetFoodByIdDocument } from "src/generated/graphql";

import { User } from "@interfaces/User";
import { ProductCart } from "@interfaces/ProductCart";

import { foodOrderFormatted } from "@utils/formatFoodOrder";
import { alertMessage } from "@utils/alert";


interface CartContextProps {
  cart: ProductCart[];
  setPaymentMethod: (method: string) => void;
  addProductToCart(id: string): Promise<void>;
  incrementProductAmount(id: string): Promise<void>;
  decrementProductAmount(id: string): Promise<void>;
  checkout(): void;
}

export const CartContext = createContext({} as CartContextProps);

export const CartProvider: FC = ({ children }) => {
  const [cart, setCart] = useState<ProductCart[]>([]);
  const [paymentMethod, setPaymentMethod] = useState("Dinheiro");

  useEffect(() => {
    const productsInCart = JSON.parse(localStorage.getItem("@cart"));

    if (!productsInCart) return;

    setCart([...productsInCart]);
  }, []);

  async function getProduct(id: string) {
    try {
      const { data: { food } } = await client.query({
        query: GetFoodByIdDocument,
        variables: {
          id
        }
      });

      const productFound = cart.findIndex(
        productCard => productCard.id === food.id
      );

      return {
        position: productFound,
        food
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function addProductToCart(id: string) {
    try {
      const { position, food } = await getProduct(id);

      if (position > -1) {
        const products = cart.filter(productCard => productCard.id !== food.id);
        setCart([...products]);


        alertMessage({
          message: "Produto removido",
          icon: "🗑"
        });

        localStorage.setItem("@cart", JSON.stringify([...products]));

        return;
      }

      const newProduct = {
        id: food.id,
        name: food.name,
        image: food.image.url,
        pricePerUnity: food.price,
        totalPrice: food.price * 1,
        quantity: 1
      }

      setCart(cart => [...cart, newProduct]);


      alertMessage({
        message: "Produto adicionado ao carrinho",
        icon: "🛒"
      });

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
      console.log(error);
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
    const user: User = JSON.parse(localStorage.getItem("@user"));

    const userOrder = foodOrderFormatted(
      {
        name: user.name,
        lastName: user.lastName,
        address: user.address,
        paymentMethod,
        cart
      }
    );

    location.href = redirect(userOrder);

    localStorage.setItem("@cart", JSON.stringify([]));
    setCart([]);
  }

  function redirect(order: string) {
    if (!process.env.NEXT_PUBLIC_PHONE_NUMBER) return;

    const params = {
      baseURL: `https://api.whatsapp.com/send?`,
      number: `phone=${process.env.NEXT_PUBLIC_PHONE_NUMBER}&`,
      cart: `text=${encodeURI(order)}&app_absent=0`
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
      checkout,
      setPaymentMethod
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);