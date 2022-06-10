import Head from "next/head";
import { ChangeEvent, useEffect, useRef } from "react";
import axios from "axios";
import { MdAdd, MdDelete, MdRemove } from "react-icons/md";

import { messageAlert } from "../utils/messageAlert";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/formatCurrency";

import { Input } from "@components/Input";

import styles from "@styles/pages/Cart.module.scss";

export default function Products() {
  const {
    cart,
    incrementProductAmount,
    decrementProductAmount,
    checkout
  } = useCart();

  const userName = useRef<HTMLInputElement>(null);
  const userLastName = useRef<HTMLInputElement>(null);

  const userAddressNumber = useRef<HTMLInputElement>(null);
  const userAddress = useRef<HTMLInputElement>(null);
  const userCEP = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("@user"));

    if (!user) return;

    userName.current.value = user.name;
    userLastName.current.value = user.lastName;
    userAddressNumber.current.value = user.address.number;
    userAddress.current.value = user.address.name;
    userCEP.current.value = user.address.cep;
  }, []);

  async function getUserAddress(event: ChangeEvent<HTMLInputElement>) {
    let formatCep = "";

    if (event.target.value.length == 9) {
      const digitalPoint = event.target.value.slice(6, 9);
      const firstPoints = event.target.value.slice(0, 5);

      formatCep = firstPoints + "-" + digitalPoint;
    }

    try {
      const { data } = await axios.get(`https://viacep.com.br/ws/${formatCep}/json/`);

      if (data.localidade !== "Itapipoca") {
        userAddress.current.value = "";
        return messageAlert("Não entregamos fora de itapipoca");
      }

      userAddress.current.value = data.logradouro;
    } catch (error) {
      console.log("Está vindo aqui");
    }
  }

  function saveUserAddress() {
    const userInfo = {
      name: userName.current.value,
      lastName: userLastName.current.value,
      address: {
        name: userAddress.current.value,
        number: userAddressNumber.current.value,
        cep: userCEP.current.value,
      }
    }

    localStorage.setItem(
      "@user",
      JSON.stringify(userInfo)
    );
  }

  async function finishCart() {
    const user = JSON.parse(localStorage.getItem("@user"));

    if (!user) {
      return messageAlert("Preencha os dados");
    };

    checkout();
  }

  return (
    <>
      <Head>
        <title>PoteCake - Carrinho</title>
      </Head>

      <main className={styles.cart}>
        <section className={styles.userInfo}>
          <div className={styles.userName}>
            <Input
              placeholder="Nome"
              inputRef={userName}
            />
            <Input
              placeholder="Sobrenome"
              inputRef={userLastName}
            />
          </div>

          <div className={styles.userAddress}>
            <Input
              placeholder="Ensira um cep válido"
              onBlur={getUserAddress}
              inputRef={userCEP}
            />
            <Input
              placeholder="Número"
              type="number"
              inputRef={userAddressNumber}
            />
            <Input
              placeholder="Endereço"
              inputRef={userAddress}
              disabled
            />
          </div>

          <button onClick={saveUserAddress}>Salvar Dados</button>
        </section>

        <section className={styles.products}>
          {cart.map(product => (
            console.log(product.id),

            <div key={product.id} className={styles.product}>
              <img
                src="/assets/product.svg"
                alt={`Logo de um ${product.name}`}
              />

              <div className={styles.productInfo}>
                <div className={styles.description}>
                  <div>
                    <strong>{product.name}</strong>
                    <span>{formatCurrency(product.totalPrice)}</span>
                  </div>

                  <p>{product.quantity}x {formatCurrency(product.pricePerUnity)}</p>
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

          <footer>
            <h3 className={styles.foodTotalPrices}>
              <span>Valor Total:</span>
              <strong>
                {formatCurrency(cart.reduce(
                  (prev, currentValue) =>
                    prev + currentValue.totalPrice, 0
                ))}
              </strong>
            </h3>
            <button
              disabled={cart.length <= 0}
              className={styles.finishCart}
              onClick={finishCart}
            >
              Finalizar Compra
            </button>
          </footer>
        </section>
      </main>
    </>
  );
}