import { createContext, FC, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MdDelete, MdDone } from "react-icons/md";
import { gql } from "@apollo/client";

import { client } from "src/libs/apollo";

import { formatCurrency } from "@utils/formatCurrency";

interface ProductCart {
  id: string;
  name: string;
  pricePerUnity: number;
  quantity: number;
  totalPrice: number;
}

interface CartContextProps {
  cart: ProductCart[];
  addProductToCart(id: string): Promise<void>;
  incrementProductAmount(id: string): Promise<void>;
  decrementProductAmount(id: string): Promise<void>;
  checkout(): void;
}

export const CartContext = createContext({} as CartContextProps);

const GET_FOOD_BY_ID = gql`
  query GetFood ($id: String!) {
    food ( where: { id: $id } ) {
      id
      image {
        url
      }
      name
      description
      price
    }
  }
`;

export const CartProvider: FC = ({ children }) => {
  const [cart, setCart] = useState<ProductCart[]>([]);

  useEffect(() => {
    const productsInCart = JSON.parse(localStorage.getItem("@cart"));

    if (!productsInCart) return;

    setCart([...productsInCart]);
  }, []);

  async function getProduct(id: string) {
    try {
      const { data: { food } } = await client.query({
        query: gql`{
          food ( where: { id: "${id}" } ) {
           id
           image {
             url
           }
           name
           description
           price
         }
       }`
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

        toast(
          "Produto removido",
          {
            type: "warning",
            autoClose: 1000,
            icon: <MdDelete />,
            theme: "colored",
            bodyStyle: {
              fontSize: "1.25rem"
            },
            closeButton: true
          }
        )

        localStorage.setItem("@cart", JSON.stringify([...products]));

        return;
      }

      const newProduct = {
        id: food.id,
        name: food.name,
        pricePerUnity: food.price,
        totalPrice: food.price * 1,
        quantity: 1
      }

      setCart(cart => [...cart, newProduct]);

      toast(
        "Produto adicionado ao carrinho",
        {
          type: "success",
          autoClose: 1000,
          icon: <MdDone />,
          theme: "colored",
          bodyStyle: {
            fontSize: "1.25rem"
          },
          closeButton: true
        }
      )

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
    const user = JSON.parse(localStorage.getItem("@user"));

    const message = `
      Nome: ${user.name}

      Rua: ${user.address.name} 
      Número: ${user.address.number}
      
      Descrição Pedidos 
      ${cart.map(product => {
      return `${product.quantity}x ${product.name}  ${formatCurrency(product.totalPrice)}`
    })}

      Total Pedido: 
      ${formatCurrency(
      cart.reduce((initialCartValue, food) => initialCartValue + food.totalPrice, 0)
    )}
    `;

    location.href = redirect(message);

    setTimeout(() => {
      localStorage.setItem("@cart", JSON.stringify([]));

      setCart([]);
    }, 2500);
  }

  function redirect(product: string) {
    const params = {
      baseURL: `https://api.whatsapp.com/send?`,
      number: `phone=${process.env.NEXT_PUBLIC_PHONE_NUMBER}&`,
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

export const useCart = () => useContext(CartContext);