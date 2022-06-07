import { ButtonHTMLAttributes, useEffect, useState } from "react";
import { FaUtensils } from "react-icons/fa";
import { MdRemoveShoppingCart } from "react-icons/md";
import { FiShoppingCart } from "react-icons/fi";

import { useCart } from "../../context/CartContext";
import { FoodType } from "../../types/Food";
import { formatCurrency } from "../../utils/formatCurrency";

interface FoodProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  food: Omit<FoodType, "category">;
}

import styles from "./styles.module.scss";

export function Food({ food, ...props }: FoodProps) {
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
      <img src="assets/product.svg" className={styles.foodImage} />

      <div className={styles.foodInfo}>
        <div className={styles.description}>
          <h3>{food.name}</h3>
          <p>{food.description}</p>
          { /* 
          <small>
            <FaUtensils />
            {food.category}
          </small>*/ }

        </div>

        <div className={styles.price}>
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
          <strong>{formatCurrency(food.price)}</strong>
        </div>
      </div>
    </div>
  );
}