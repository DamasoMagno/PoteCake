import { useEffect, useState } from "react";
import { MdAdd, MdDelete, MdEdit, MdRemove, MdSave } from "react-icons/md";
import { useCart } from "../context/CartContext";

import { formatCurrency } from "../utils/format";

export default function Products() {
  const {
    cart,
    incrementProductAmount,
    decrementProductAmount,
    checkout
  } = useCart();

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

  return (
    <>
      <div className="w-10/12 mx-auto">
        <input
          type="text"
          className="w-full py-2 px-4 mr-2 bg-transparent border-2 focus:border-red-500"
          value={userAddress}
          onChange={e => setUserAddress(e.target.value)}
        />
      </div>

      <main className="grid md:grid-cols-2 gap-4 w-10/12 mx-auto mt-8">
        <section className="order-2 md:order-1">
          {cart.length > 0 ? (
            cart.map(product => (
              <div
                key={product.id}
                className="flex items-center gap-2 bg-product rounded-lg p-4 mb-2"
              >
                <img
                  src="/assets/product.svg"
                  alt="Logo do produto"
                  className="w-32 rounded-lg"
                />

                <div className="flex justify-between w-full">
                  <div>
                    <strong className="text-base">
                      {product.name}
                    </strong>
                    <p className="text-gray-400 text-sm">
                      {formatCurrency(product.totalPrice)}
                    </p>
                    <p className="mt-4 text-primary font-bold text-base">
                      {product.quantity}x  {formatCurrency(product.pricePerUnity)}
                    </p>
                  </div>

                  <div className="flex flex-col gap-4 justify-center">
                    <button
                      onClick={() => incrementProductAmount(product.id)}
                      className="
                        bg-orange-200 
                        flex justify-center items-center 
                        rounded-lg 
                        p-2 
                        transition-all duration-200 
                        hover:bg-orange-300
                      "
                    >
                      <MdAdd size={18} color="#A46254" />
                    </button>
                    <button
                      onClick={() => decrementProductAmount(product.id)}
                      className="
                        bg-orange-200 
                        flex justify-center items-center
                        rounded-lg ]
                        p-2 
                        transition-all duration-200 
                        hover:bg-orange-300
                      "
                    >
                      {product.quantity > 1 ? (
                        <MdRemove size={18} color="#A46254" />
                      ) : (
                        <MdDelete size={18} color="#A46254" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-gray-200 w-full h-72 rounded-lg flex justify-center items-center">
              <strong>Nenhum item adicionado ao carrinho</strong>
            </div>
          )}
        </section>

        <section className="bg-product order-1 md:order-2 px-4 py-4">
          <button
            className="bg-primary text-base text-white rounded-4 w-full py-2 rounded-lg"
            disabled={cart.length <= 0}
            onClick={checkout}
          >
            Finalizar Compra
          </button>

          <div className="my-8">
            <h3 className="mb-1">Descrição Pedidos</h3>
            {cart.map(product => (
              <li
                className="list-none w-full flex justify-between mb-2"
                key={product.id}
              >
                <strong>{product.quantity}x {product.name}</strong>
                <span>{formatCurrency(product.totalPrice)}</span>
              </li>
            ))}
          </div>

          <h3 className="flex justify-between">
            <span className="list-none">Valor Total:</span>
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