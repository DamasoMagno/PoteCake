import { ButtonHTMLAttributes } from "react";
import { FaUtensils } from "react-icons/fa";
import { MdAddShoppingCart, MdRemoveShoppingCart } from "react-icons/md";

import { Product } from "../types/Product";
import { formatCurrency } from "../utils/format";

interface ProductProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  product: Product
  remove: boolean;
}

export function Product({ product, remove, ...props }: ProductProps) {
  return (
    <div className="max-w-sm flex flex-col justify-between">
      <div>
        <img
          src="assets/logo.svg"
          alt="Bolo de chocolate"
          className="w-full rounded-2xl"
        />
        <div>
          <h3 className="text-xl font-bold">
            {product.name}
          </h3>
          <p className="text-xs mt-2.5 text-gray-500">
            {product.description}
          </p>
          <small className="mt-3 text-sm flex items-center gap-2">
            <FaUtensils color="#A3A3A4" />
            {product.category}
          </small>
        </div>
      </div>


      <div className="flex items-center justify-between mt-4">
        <button
          className="
            flex items-center justify-center gap-2 
            bg-primary text-white 
            border-none 
            rounded-base
            px-4 
            h-8
            hover:bg-orange-600
            text-base
            mt-2
          "
          {...props}
        >
          {!remove ? (
            <>
              <MdAddShoppingCart />
              Carrinho
            </>

          ) : (
            <>
              <MdRemoveShoppingCart />
              Remover
            </>
          )}
        </button>
        <strong>{formatCurrency(product.price)}</strong>
      </div>
    </div>
  );
}