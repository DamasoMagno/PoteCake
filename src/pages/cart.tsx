import Head from "next/head";

import { ChangeEvent, useEffect, useState } from "react";
import { MdAdd, MdArrowDropDown, MdDelete, MdRemove } from "react-icons/md";

import { useCart } from "@contexts/CartContext";

import { formatCurrency } from "@utils/formatCurrency";
import { alertMessage } from "@utils/alert";

import { User } from "@interfaces/User";

import { Input } from "@components/Input";
import { Button } from "@components/Button";

import styles from "@styles/pages/Cart.module.scss";

export default function Products() {
  const {
    cart,
    incrementProductAmount,
    decrementProductAmount,
    checkout,
    setPaymentMethod
  } = useCart();

  const [userName, setUserName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userCep, setUserCep] = useState("");
  const [userNumberAdress, setUserNumberAddress] = useState("");
  const [userAddress, setUserAddress] = useState("");

  useEffect(() => {
    const user: User = JSON.parse(localStorage.getItem("@user"));

    if (user) {
      setUserName(user.name)
      setUserLastName(user.lastName)
      setUserCep(user.address.cep)
      setUserNumberAddress(user.address.number)
      setUserAddress(user.address.name)
    }

  }, []);

  async function getUserAddress(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.value.length < 8) {
      return setUserAddress("");
    };

    try {
      const response = await fetch(`https://viacep.com.br/ws/${event.target.value}/json/`);
      const { localidade, logradouro } = await response.json();

      if (localidade !== "Itapipoca") {
        setUserAddress("");

        alertMessage({
          message: "Não entregamos fora de Itapipoca",
          icon: "❌"
        });

        return;
      }

      setUserAddress(logradouro);
    } catch (error) {
      console.log(error);
    }
  }

  function saveUserAddress() {
    const userInfo: User = {
      name: userName,
      lastName: userLastName,
      address: {
        name: userAddress,
        number: userNumberAdress,
        cep: userCep
      }
    }

    let fieldsNotValid = false;

    for (const field in userInfo) {
      if (typeof userInfo[field] === "object") {
        Object.keys(userInfo[field]).forEach(
          attr => {
            if (!userInfo[field][attr]) fieldsNotValid = true;
          })
      }

      if (!userInfo[field]) fieldsNotValid = true;
    }

    if (fieldsNotValid) {
      alertMessage({
        message: "Preencha todos os campos",
        icon: "❗"
      });

      return;
    }

    localStorage.setItem(
      "@user",
      JSON.stringify(userInfo)
    );

    alertMessage({
      message: "Dados salvos com sucesso",
      icon: "✔"
    });
  }

  async function finishCart() {
    const user = JSON.parse(localStorage.getItem("@user"));

    if (!user) {
      return alertMessage({
        message: "Preencha os dados",
        icon: "❗"
      });
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
          <Input
            placeholder="Nome"
            value={userName}
            onChange={e => setUserName(e.target.value)}
          />

          <Input
            placeholder="Sobrenome"
            value={userLastName}
            onChange={e => setUserLastName(e.target.value)}
          />

          <Input
            placeholder="Ensira um cep válido"
            onBlur={getUserAddress}
            value={userCep}
            type="number"
            onChange={e => setUserCep(e.target.value)}
          />

          <div className={styles.address}>
            <Input
              placeholder="Endereço"
              disabled
              value={userAddress}
            />
            <Input
              placeholder="Número"
              type="number"
              value={userNumberAdress}
              onChange={e => setUserNumberAddress(e.target.value)}
            />
          </div>

          <div className={styles.filter}>
            <select onChange={e => setPaymentMethod(e.target.value)}>
              <option value="Débito">Débito</option>
              <option value="Crédito">Crédito</option>
              <option value="Dinehro">Dinheiro</option>
            </select>
            <MdArrowDropDown size={32} />
          </div>

          <Button
            label="Salvar Dados"
            onClick={saveUserAddress}
            disabled={!userCep}
          />
        </section>

        <section className={styles.products}>
          <h3>Meus Pedidos</h3>

          {cart.map(product => (
            <div
              key={product.id}
              className={styles.product}
            >
              <img
                src={product.image}
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
            <strong className={styles.foodTotalPrices}>
              <span>Valor Total:</span>
              <p>
                {formatCurrency(cart.reduce(
                  (prev, currentValue) =>
                    prev + currentValue.totalPrice, 0
                ))}
              </p>
            </strong>

            <Button
              label="Finalizar Compra"
              onClick={finishCart}
              disabled={cart.length <= 0}
              type="button"
            />
          </footer>
        </section>
      </main>
    </>
  );
}