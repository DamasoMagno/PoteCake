import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { Product as ProductType } from "../types/Product";

import { Product } from "../components/Product";
import { Header } from "../components/Header";
import { CartContext } from "../context/CartContext";

export default function Home() {
  const { addProductToCart } = useContext(CartContext);

  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    api.get("/").then(response => setProducts(response.data.products));
  }, []);

  return (
    <>
      <section className="bg-primary">
        <Header />

        <div className="w-10/12 mx-auto flex flex-col lg:flex-row justify-between items-center py-19">
          <div>
            <h2 className="text-4xl sm:text-7xl text-white font-bold">
              A confeitaria da
              <strong className="block text-orange-700">
                Vizinhança
              </strong>
            </h2>
            <p className="mt-8 leading-6 text-gray-300 text-lg sm:text-xl max-w-sm">
              Na potecake, priorizamos a boa experiência
              de nossos clientes, com nossas comdias
            </p>
          </div>
          <Image
            src="/assets/logo.svg"
            alt="Imagem de um bolo de chocolate"
            width="400px"
            height="400px"
          />
        </div>
      </section>

      <main className="mx-auto my-8 w-10/12">
        <h2 className="text-2xl font-bold">Nosso Cardápio</h2>

        <div className="mt-4 grid gap-12 md:grid-cols-2 xl:grid-cols-4">
          {products.map(product => (
            <Product
              product={product}
              key={product.id}
              onClick={() => addProductToCart(product.id)}
            />
          ))}
        </div>
      </main>
    </>
  );
}