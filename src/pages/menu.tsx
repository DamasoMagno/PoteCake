import Head from "next/head";
import { ChangeEvent, useState } from "react";
import { MdSearch, MdArrowDropDown, MdDeliveryDining } from "react-icons/md";

import { FoodType } from "../types/Food";
import { CategoriesDocument, FoodsByCategoryDocument, FoodsByNameDocument, FoodsDocument } from "../generated/graphql";
import { useCart } from "../context/CartContext";
import { CategoryType } from "../types/Category";
import { client } from "../libs/apollo";

import { Food } from "@components/Food";
import { SectionTitle } from "@components/SectionTitle";
import { Input } from "@components/Input";

import styles from "@styles/pages/Menu.module.scss";

export default function Menu({ foods, categories }: any) {
  const { addProductToCart } = useCart();

  const [allFoods, setAllFoods] = useState<FoodType[]>(foods);
  const [category, setCategory] = useState("Todos");

  let timer = null;

  async function searchFoods(event: ChangeEvent<HTMLInputElement>) {
    const foodName = event.target.value;
    clearInterval(timer);

    timer = setTimeout(
      async () => {
        try {
          const { data } = await client.query({
            query: FoodsByNameDocument,
            variables: {
              name: foodName
            }
          });

          setAllFoods([...data.foods]);
        } catch (error) { }
      }, 500
    );
  }

  async function filterFoodsByCategory(event: ChangeEvent<HTMLSelectElement>) {
    const category = event.target.value;
    let allFoods = [];

    try {
      if (!category) {
        const { data } = await client.query({
          query: FoodsDocument,
        });

        allFoods = [...data.foods];
        setCategory("Todos");
      } else {
        const { data } = await client.query({
          query: FoodsByCategoryDocument,
          variables: {
            category
          }
        });

        allFoods = [...data.foods];
        setCategory(category);
      }

      setAllFoods(allFoods);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Head>
        <title>PoteCake - Cardápio</title>
      </Head>

      <main className={styles.container}>
        <section className={styles.filterFoods}>
          <Input
            placeholder="Pesquisar produto"
            icon={MdSearch}
            iconPosition="left"
            onChange={searchFoods}
          />

          <div className={styles.options}>
            <div className={styles.filter}>
              <select onChange={filterFoodsByCategory}>
                <option value="">Todos</option>
                {categories.map((category: CategoryType) => (
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

            <div>
              <MdDeliveryDining />
              <div>
                <h4>Entrega</h4>
                <span>30 - 40 min</span>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.menu}>
          <SectionTitle>{category}</SectionTitle>

          <div className={styles.foods}>
            {allFoods.map((food: FoodType) => (
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

export const getServerSideProps = async () => {
  const { data: { foods } } = await client.query({
    query: FoodsDocument,
  });

  const { data: { categories } } = await client.query({
    query: CategoriesDocument
  })

  return {
    props: {
      foods,
      categories
    }
  }
}