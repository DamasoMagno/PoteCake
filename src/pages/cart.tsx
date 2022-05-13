import { useEffect, useState } from "react";
import { 
  MdAdd, 
  MdEdit, 
  MdRemove, 
  MdSave 
} from "react-icons/md";
import { Header } from "../components/Header";

export default function Products() {
  const [currentPrice, setCurrentPrice] = useState<number>(250);
  const [userAddress, setUserAddress] = useState<string>("");
  const [allowEditUserAddress, setAllowEditUserAddress] = useState<boolean>(false);

  const priceByProduct = 250;

  useEffect(() => {
    const userAlreadyHasAddress = JSON.parse(localStorage.getItem("@address"));

    if (userAlreadyHasAddress) {
      setUserAddress(userAlreadyHasAddress);
    }
  }, []);

  function addItemInCart() {
    setCurrentPrice(currentPrice + priceByProduct);
  }

  function removeItemFromCart() {
    if (currentPrice <= 0) return;
    setCurrentPrice(currentPrice - priceByProduct);
  }

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
          className={`
            w-full py-2 px-4 mr-2 bg-transparent outline-none
            ${!allowEditUserAddress && "cursor-not-allowed"}
          `}
          disabled={!allowEditUserAddress}
          value={userAddress}
          onChange={e => setUserAddress(e.target.value)}
        />

        <button onClick={updateUserAddress}>
          {allowEditUserAddress ? <MdSave /> : <MdEdit />}
        </button>
      </div>

      <main className="grid md:grid-cols-2 gap-4 w-10/12 mx-auto mt-4">
        <section>
          <div className="flex items-center gap-2 bg-product rounded-lg p-4">
            <img
              src="/assets/product.svg"
              alt="Logo do produto"
              className="w-36 rounded-lg"
            />

            <div className="flex justify-between w-full">
              <div>
                <strong className="text-base">Pizza de Chocolate</strong>
                <p className="text-gray-400 text-sm">R${currentPrice}</p>
                <p className="mt-4 text-primary font-bold text-base">2x R$ 250.00</p>
              </div>

              <div className="flex flex-col gap-4 justify-center">
                <button
                  onClick={addItemInCart}
                  className="bg-orange-200 flex justify-center items-center rounded-lg p-2 transition-all duration-200 hover:bg-orange-300"
                >
                  <MdAdd size={18} color="#A46254" />
                </button>
                <button
                  onClick={removeItemFromCart}
                  className="bg-orange-200 flex justify-center items-center rounded-lg p-2 transition-all duration-200 hover:bg-orange-300"
                >
                  <MdRemove size={18} color="#A46254"/>
                </button>
              </div>
            </div>
          </div>
        </section>

        <section>
          <button className="bg-primary text-base text-white">Finalizar Compra</button>
        </section>
      </main>
    </>
  );
}