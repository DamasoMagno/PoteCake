import { FaUtensils } from "react-icons/fa"

export type ProductProps = {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export function Product({ 
  name, 
  description, 
  price, 
  image, 
  category 
}: ProductProps) {
  return (
    <div className="max-w-sm">
      <img src={image} alt="Bolo de chocolate" className="w-full rounded-2xl" />
      <div>
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold">
            {name}
          </h3>
          <strong>R${price}</strong>
        </div>
        <p className="text-xs text-gray-500">
          {description}
        </p>
        <small className="mt-3 text-sm flex items-center gap-2">
          <FaUtensils color="#A3A3A4"/>
          {category}
        </small>
      </div>
    </div>
  );
}