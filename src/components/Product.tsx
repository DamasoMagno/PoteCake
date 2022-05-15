import { ButtonHTMLAttributes } from "react";
import { FaUtensils } from "react-icons/fa"
import { Product } from "../types/Product";

interface ProductProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  product: Product
}

export function Product({ product, ...props }: ProductProps) {
  return (
    <button
      className="max-w-sm text-left"
      {...props}
    >
      <img
        src="assets/logo.svg"
        alt="Bolo de chocolate"
        className="w-full rounded-2xl"
      />
      <div>
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold">
            {product.name}
          </h3>
          <strong>R${product.price}</strong>
        </div>
        <p className="text-xs text-gray-500">
          {product.description}
        </p>
        <small className="mt-3 text-sm flex items-center gap-2">
          <FaUtensils color="#A3A3A4" />
          {product.category}
        </small>
      </div>
    </button>
  );
}