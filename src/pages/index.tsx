import Image from "next/image";
import { useContext, useEffect, useState } from "react";

import { api } from "../services/api";
import { Product as ProductType } from "../types/Product";
import { CartContext } from "../context/CartContext";

import { Product } from "../components/Product";

export default function Home() {
  const { addProductToCart, cart } = useContext(CartContext);

  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    api.get("/")
      .then(response => setProducts(response.data));
  }, []);

  async function searchProductByCategory(category: string) {
    try {
      const products = await api.get(`/categories?category=${category}`);
      console.log(products);
      setProducts([...products.data])
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <section className="bg-primary">
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

      <select onChange={e => searchProductByCategory(e.target.value)}>
        <option value="">Todos</option>
        <option value="Bolo">Bolo</option>
        <option value="Pizza">Pizza</option>
      </select>

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