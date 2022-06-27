import Head from "next/head";
import { ChangeEvent, useState } from "react";
import { MdSearch, MdArrowDropDown } from "react-icons/md";

import {
  CategoriesDocument,
  FoodsByCategoryDocument,
  FoodsByNameDocument,
  FoodsDocument
} from "../generated/graphql";
import { client } from "@libs/apollo";
import { useCart } from "@contexts/CartContext";

import { Food } from "@interfaces/Food";
import { Category } from "@interfaces/Category";

import { FoodCard } from "@components/FoodCard";
import { SectionTitle } from "@components/SectionTitle";
import { Input } from "@components/Input";

import styles from "@styles/pages/Menu.module.scss";

interface MenuProps {
  foods: Food[]
  categories: Category[]
}

export default function Menu({ foods, categories }: MenuProps) {
  const { addProductToCart } = useCart();

  const [allFoods, setAllFoods] = useState<Food[]>(foods);
  const [category, setCategory] = useState<string>("Todos");

  let timer = null;

  async function searchFoods(event: ChangeEvent<HTMLInputElement>) {
    const food = event.target.value;

    clearInterval(timer);

    timer = setTimeout(async () => {
      try {
        const { data } = await client.query({
          query: FoodsByNameDocument,
          variables: {
            name: food
          }
        });

        setAllFoods([...data.foods]);
      } catch (error) { }
    }, 500);
  }

  async function filterFoodsByCategory(event: ChangeEvent<HTMLSelectElement>) {
    const category = event.target.value;
    let foods = [];

    try {
      if (!category) {
        const { data } = await client.query({
          query: FoodsDocument,
        });

        foods = [...data.foods];
        setCategory("Todos");
      } else {
        const { data } = await client.query({
          query: FoodsByCategoryDocument,
          variables: {
            category
          }
        });

        foods = [...data.foods];
        setCategory(category);
      }

      setAllFoods(foods);
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

                {categories.map(category => (
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
          </div>
        </section>

        <section className={styles.menu}>
          <SectionTitle>{category}</SectionTitle>

          <div className={styles.foods}>
            {allFoods.map(food => (
              <FoodCard
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
  const [foodsQuery, categoriesQuery] = await Promise.all([
    client.query({
      query: FoodsDocument
    }),

    client.query({
      query: CategoriesDocument
    }),
  ]);

  return {
    props: {
      foods: foodsQuery.data.foods,
      categories: categoriesQuery.data.categories
    }
  }
}