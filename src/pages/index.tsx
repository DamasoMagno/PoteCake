import Image from "next/image";
import { useContext, useEffect, useState } from "react";

import { api } from "../services/api";
import { Product as ProductType } from "../types/Product";
import { CartContext } from "../context/CartContext";

import { Product } from "../components/Food";

import styles from "../styles/pages/Home.module.scss";

export default function Home() {
  const { addProductToCart } = useContext(CartContext);

  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    api.get("/")
      .then(response => setProducts(response.data));
  }, []);

  async function searchProductByCategory(category: string) {
    try {
      const products = await api.get(`/categories?category=${category}`);
      setProducts([...products.data])
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <section className={styles.heroContainer}>
        <div className={styles.content}>
          <div>
            <h2>
              A confeitaria da
              <strong>
                Vizinhança
              </strong>
            </h2>
            <p>
              Na potecake, priorizamos a boa experiência
              de nossos clientes, com nossas comdias
            </p>
          </div>
          <Image
            src="/assets/logo.svg"
            alt="Imagem de um bolo de chocolate"
            width="350px"
            height="300px"
          />
        </div>
      </section>

      <main className={styles.menu}>
        <h2>
          <span/>
          Nosso Cardápio
        </h2>

        <div className={styles.products}>
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