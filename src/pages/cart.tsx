import { useEffect, useState } from "react";
import { MdAdd, MdDelete, MdEdit, MdRemove, MdSave } from "react-icons/md";
import { useCart } from "../context/CartContext";

import { Header } from "../components/Header";

export default function Products() {
  const {
    cart,
    addProductQuantity,
    removeProductQuantity,
    checkout
  } = useCart();

  const [userAddress, setUserAddress] = useState<string>("");
  const [allowEditUserAddress, setAllowEditUserAddress] = useState<boolean>(false);

  useEffect(() => {
    const userAlreadyHasAddress = JSON.parse(localStorage.getItem("@address"));

    if (userAlreadyHasAddress) {
      setUserAddress(userAlreadyHasAddress);
    }
  }, []);

  function updateUserAddress() {
    if (allowEditUserAddress) {
      localStorage.setItem("@address", JSON.stringify(userAddress));
    }

    setAllowEditUserAddress(!allowEditUserAddress);
  }

  return (
    <>
      <Header />

      <div className="w-10/12 mx-auto flex mt-4 bg-gray-300 pl-1 pr-4 rounded-sm">
        <input
          type="text"
          className="w-full py-2 px-4 mr-2 bg-transparent outline-none"
          disabled={!allowEditUserAddress}
          value={userAddress}
          onChange={e => setUserAddress(e.target.value)}
        />

        <button onClick={updateUserAddress}>
          {allowEditUserAddress ? <MdSave /> : <MdEdit />}
        </button>
      </div>

      <main className="grid md:grid-cols-2 gap-4 w-10/12 mx-auto mt-8">
        <section>
          {cart.length > 0 ? (
            cart.map(product => (
              console.log(product),

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
                    <strong className="text-base">{product.name}</strong>
                    <p className="text-gray-400 text-sm">R$ {product.totalPrice}</p>
                    <p className="mt-4 text-primary font-bold text-base">{product.quantity}x R$ {product.pricePerUnity}</p>
                  </div>

                  <div className="flex flex-col gap-4 justify-center">
                    <button
                      onClick={() => addProductQuantity(product.id)}
                      className="bg-orange-200 flex justify-center items-center rounded-lg p-2 transition-all duration-200 hover:bg-orange-300"
                    >
                      <MdAdd size={18} color="#A46254" />
                    </button>
                    <button
                      onClick={() => removeProductQuantity(product.id)}
                      className="bg-orange-200 flex justify-center items-center rounded-lg p-2 transition-all duration-200 hover:bg-orange-300"
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

        <section>
          <button
            className="bg-primary text-base text-white"
            disabled={cart.length <= 0}
            onClick={checkout}
          >
            Finalizar Compra
          </button>
        </section>
      </main>
    </>
  );
}