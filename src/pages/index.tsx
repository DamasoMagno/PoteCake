import Head from "next/head";
import Image from "next/image";

import { client } from "src/libs/apollo";
import { useCart } from "../context/CartContext";
import { ProductsDocument } from "../generated/graphql";
import { ProductsQuery } from "../types/FoodQuery";

import { Food } from "@component/Food";
import { SectionTitle } from "@component/SectionTitle";

import styles from "@styles/pages/Home.module.scss";

export default function Home({ foods }: ProductsQuery) {
  const { addProductToCart } = useCart();

  return (
    <>
      <Head>
        <title>PoteCake</title>
      </Head>

      <section className={styles.hero}>
        <div className={styles.content}>
          <div>
            <h2>
              A confeitaria da
              <strong>
                Vizinhança
              </strong>
            </h2>
            <p>
              Priorizamos a boa experiência
              de nossos clientes, com nossas comidas
            </p>
          </div>
          <Image
            src="/assets/logo.svg"
            alt="Imagem de um bolo de chocolate"
            width="400px"
            height="300px"
          />
        </div>
      </section>

      <main className={styles.menu}>
        <SectionTitle>Nosso Cardápio</SectionTitle>

        <div className={styles.products}>
          {foods.map(food => (
            <Food
              food={food}
              key={food.id}
              onClick={() => addProductToCart(food.id)}
            />
          ))}
        </div>
      </main>
    </>
  );
}

export const getServerSideProps = async () => {
  const { data } = await client.query({
    query: ProductsDocument
  });

  return {
    props: {
      foods: data.products
    }
  }
}