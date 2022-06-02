import { useEffect, useState } from "react";
import { MdArrowBackIos, MdArrowDownward, MdArrowDropDown, MdArrowForward, MdSearch } from "react-icons/md";
import { Product } from "../components/Food";
import { useCart } from "../context/CartContext";
import { api } from "../services/api";

import { Product as ProductType } from "../types/Product";

import styles from "../styles/pages/Menu.module.scss";

export default function Menu() {
  const { addProductToCart } = useCart();

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
      <main className={styles.container}>
        <section className={styles.filterOptionsContainer}>
          <div>
            <input placeholder="Procurar produto"/>
            <MdSearch size={24}/>
          </div>
          <div>
            <select>
              <option>Bolo</option>
            </select>
            <MdArrowDropDown size={24}/>
          </div>
        </section>

        <section className={styles.productsContainer}>
          {products.map(product => (
            <Product
              product={product}
              key={product.id}
              onClick={() => addProductToCart(product.id)}
            />
          ))}
        </section>
      </main>
    </>
  );
}