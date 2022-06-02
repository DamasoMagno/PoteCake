import { ButtonHTMLAttributes, useEffect, useState } from "react";
import { FaUtensils } from "react-icons/fa";
import { MdAddShoppingCart, MdRemoveShoppingCart } from "react-icons/md";
import { FiShoppingCart } from "react-icons/fi";
import { useCart } from "../../context/CartContext";

import { Product } from "../../types/Product";
import { formatCurrency } from "../../utils/format";
interface ProductProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  product: Product
}

import styles from "./styles.module.scss";

export function Product({ product, ...props }: ProductProps) {
  const { cart } = useCart();

  const [productInCart, setProductInCart] = useState(false);

  useEffect(() => {
    const productAlreadyInsertedInCart = cart.some(
      productInCart => productInCart.id === product.id
    );

    if (productAlreadyInsertedInCart) {
      setProductInCart(true);
    } else {
      setProductInCart(false);
    }
  }, [cart]);

  return (
    <div className={styles.foodCartContainer}>
      <img src="assets/product.svg" className={styles.foodImage}/>
      
      <div className={styles.foodInfo}>
        <div className={styles.description}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <small>
            <FaUtensils color="#A3A3A4" />
            {product.category}
          </small>
        </div>

        <div className={styles.price}>
          <button {...props}>
            {!productInCart ?
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
          <strong>{formatCurrency(product.price)}</strong>
        </div>
      </div>
    </div>
  );
}