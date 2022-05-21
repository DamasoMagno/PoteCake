import { MdSearch } from "react-icons/md";
import { Product } from "../components/Product";

export default function Menu() {
  return (
    <>
      <section className="flex items-center">
        <div>
          <input type="text" className="bg-transparent" />
          <MdSearch />
        </div>
        <div>
          <input type="text" className="bg-transparent" />
          <MdSearch />
        </div>
      </section>

      <main className="grid md:grid-cols-4">
        <Product 
          product={null} 
        />
      </main>
    </>
  );
}