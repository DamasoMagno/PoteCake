import { ButtonHTMLAttributes, useEffect, useState } from "react";
import { MdRemoveShoppingCart } from "react-icons/md";
import { FiShoppingCart } from "react-icons/fi";

import { useCart } from "@contexts/CartContext";
import { Food } from "@interfaces/Food";
import { formatCurrency } from "@utils/formatCurrency";

interface FoodProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  food: Food;
}

import styles from "./styles.module.scss";

export function FoodCard({ food, ...props }: FoodProps) {
  const { cart } = useCart();

  const [foodHasInCart, setFoodhasInCart] = useState(false);

  useEffect(() => {
    const productAlreadyInsertedInCart = cart.some(
      foodCart => foodCart.id === food.id
    );

    if (productAlreadyInsertedInCart) {
      setFoodhasInCart(true);
    } else {
      setFoodhasInCart(false);
    }
  }, [cart]);

  return (
    <div className={styles.foodCartContainer}>
      <img
        src={food.image.url}
        className={styles.foodImage}
      />

      <div className={styles.foodInfo}>
        <div className={styles.description}>
          <h3>{food.name}</h3>
          <p>{food.description}</p>
        </div>

        <div className={styles.price}>
          <strong>{formatCurrency(Number(food.price))}</strong>

          <button
            className={foodHasInCart ? styles.remove : null}
            {...props}
          >
            {!foodHasInCart ?
              (
                <>
                  <FiShoppingCart />
                  Adicionar
                </>
              ) : (
                <>
                  <MdRemoveShoppingCart />
                  Remover
                </>
              )}
          </button>
        </div>
      </div>
    </div>
  );
}