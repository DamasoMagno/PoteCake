import { MdSearch } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";

export default function Products() {
  return (
    <div className="flex flex-col max-w-screen-xl mx-auto">
      <div className="flex items-center">
        <div
          className="
            rounded-xl 
            bg-white text-gray-600 
            flex items-center justify-between 
            px-4 py-2
          "
        >
          <input placeholder="Pesquisar Produto" className="outline-none" />
          <MdSearch />
        </div>

        <div
          className="
            ml-4 
            text-gray-900 bg-white
            flex items-center  
            px-4 py-2 gap-2 
            rounded-xl
          "
        >
          <select placeholder="Categoria" className="border-0 appearance-none">
            <option>Bolos</option>
          </select>
          <IoIosArrowDown />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4"></div>
    </div>
  );
}