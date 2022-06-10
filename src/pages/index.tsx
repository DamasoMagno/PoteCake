import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import { client } from "../libs/apollo";
import { useCart } from "../context/CartContext";
import { FoodsDocument } from "../generated/graphql";
import { ProductsQuery } from "../types/FoodQuery";

import { Food } from "@components/Food";
import { SectionTitle } from "@components/SectionTitle";

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
              A confetaria da
              <strong>Vizinhança</strong>
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
        <div>
          <SectionTitle>Nossa Cardápio</SectionTitle>
          <Link href="/menu">
            <span>ver todos</span>
          </Link>
        </div>

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
  const { data: { foods } } = await client.query({
    query: FoodsDocument
  });

  return {
    props: {
      foods,
    }
  }
}