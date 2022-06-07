import Head from "next/head";
import { ChangeEvent, useState } from "react";
import { MdSearch, MdArrowDropDown } from "react-icons/md";

import { CategoriesDocument, ProductsDocument } from "src/generated/graphql";
import { useCart } from "../context/CartContext";
import { client } from "src/libs/apollo";

import { Food } from "@component/Food";
import { SectionTitle } from "@component/SectionTitle";

import styles from "@styles/pages/Menu.module.scss";
import { gql } from "@apollo/client";

export default function Menu({ foods, categories }: any) {
  const { addProductToCart } = useCart();

  const [products, setProducts] = useState(foods);
  const [categoriesN, setCategories] = useState(categories);

  async function searchProduct(event: ChangeEvent<HTMLSelectElement>) {
    const category = event.target.value;

    try {
      if (!category) return;

      const data = await client.query({
        query: gql`{
          products(
            where: { 
              categories_some: {
                slug: "${category}"
              } 
            }
          ){
            id
            image {
              url
            }
            name
            description
            price
          }
        }`
      });

      setProducts([...data.data.products])
    } catch (error) {

    }
  }

  return (
    <>
      <Head>
        <title>PoteCake - Cardápio</title>
      </Head>

      <main className={styles.container}>
        <section className={styles.filterFoods}>
          <div className={styles.search}>
            <MdSearch size={24} />
            <input placeholder="Procurar produto" />
          </div>

          <div className={styles.filter}>
            <select onChange={searchProduct}>
              <option value="">Todos</option>
              {categoriesN.map(category => (
                <option
                  value={category.name}
                  key={category.id}
                >
                  {category.name}
                </option>
              ))}
            </select>
            <MdArrowDropDown size={32} />
          </div>
        </section>

        <section className={styles.menu}>
          <SectionTitle>Todos</SectionTitle>

          <div className={styles.foods}>
            {products.map(food => (
              <Food
                food={food}
                key={food.id}
                onClick={() => addProductToCart(food.id)}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export const getServerSideProps = async ({ ctx }) => {
  const { data: { products } } = await client.query({
    query: ProductsDocument,
  });

  const { data: { categories } } = await client.query({
    query: CategoriesDocument
  })

  return {
    props: {
      foods: products,
      categories: categories
    }
  }
}