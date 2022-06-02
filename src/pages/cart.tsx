import { useEffect, useRef, useState } from "react";
import { MdAdd, MdDelete, MdRemove } from "react-icons/md";
import { useCart } from "../context/CartContext";
import styles from "../styles/pages/Cart.module.scss";

import { formatCurrency } from "../utils/format";
import { messageAlert } from "../utils/messageAlert";

export default function Products() {
  const {
    cart,
    incrementProductAmount,
    decrementProductAmount,
    checkout
  } = useCart();

  const addressRef = useRef<HTMLInputElement>(null);
  const [userAddress, setUserAddress] = useState<string>("");

  useEffect(() => {
    const userAlreadyHasAddress = JSON.parse(localStorage.getItem("@address"));

    if (userAlreadyHasAddress) {
      setUserAddress(userAlreadyHasAddress);
    }
  }, []);

  function updateUserAddress() {
    localStorage.setItem("@address", JSON.stringify(userAddress));
  }

  function makeCheckout() {
    const userAddress = localStorage.getItem("@address");

    if (!userAddress) {
      messageAlert("Preencha o endereco");
    }

    checkout();
  }

  return (
    <>
      <div className={styles.userAddressContainer}>
        <input
          type="text"
          value={userAddress}
          ref={addressRef}
          onChange={e => setUserAddress(e.target.value)}
        />
      </div>

      <main className={styles.cart}>
        <section className={styles.products}>
          <h3>Meus Pedidos</h3>

          {cart.map(product => (
            <div key={product.id} className={styles.product}>
              <img src="/assets/product.svg" alt="Logo do produto" />

              <div className={styles.productInfo}>
                <div className={styles.description}>
                  <strong>{product.name}</strong>
                  <p>{formatCurrency(product.totalPrice)}</p>
                  <p>{product.quantity}x  {formatCurrency(product.pricePerUnity)}</p>
                </div>

                <div className={styles.cartControlls}>
                  <button onClick={() => incrementProductAmount(product.id)}>
                    <MdAdd size={18} />
                  </button>
                  <button onClick={() => decrementProductAmount(product.id)}>
                    {product.quantity > 1 ? <MdRemove size={18} /> : <MdDelete size={18} />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className={styles.cartData}>
          <button
            disabled={cart.length <= 0}
            onClick={makeCheckout}
            className={styles.finishCart}
          >
            Finalizar Compra
          </button>

          <div className={styles.foodPrices}>
            <h3>Descrição Pedidos</h3>
            {cart.map(product => (
              <li key={product.id}>
                <strong>{product.quantity}x {product.name}</strong>
                <span>{formatCurrency(product.totalPrice)}</span>
              </li>
            ))}
          </div>

          <h3 className={styles.foodTotalPrices}>
            <span>Valor Total:</span>
            <strong>
              {formatCurrency(cart.reduce(
                (prev, currentValue) =>
                  prev + currentValue.totalPrice, 0
              ))}
            </strong>
          </h3>
        </section>
      </main>
    </>
  );
}