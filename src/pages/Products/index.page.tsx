import { MdSearch } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { MdAddShoppingCart } from "react-icons/md";

import {
  Container,
  SearchAndFilter,
  ProductList,
  Product
} from "./styles";
import { Header } from "../../components/Header/index.page";

export default function Products() {
  return (
    <>
      <Container>
        <SearchAndFilter>
          <div>
            <input placeholder="Pesquisar Produto" />
            <MdSearch />
          </div>

          <div className="filter">
            <select placeholder="Categoria">
              <option>Bolos</option>
            </select>
            <IoIosArrowDown />
          </div>
        </SearchAndFilter>

        <ProductList>
          <Product>
            <img
              src="/assets/product.svg"
              alt="Bolo de chocolate"
            />
            <div className="description">
              <div className="productInformation">
                <h3>Bolo de Chocolate</h3>
                <p>
                  Este bolo e de chocolate e nao
                  esta queimado isso é mau passado : )
                </p>
              </div>
              <div className="addProductCart">
                <strong>
                  R$70.00
                </strong>
              </div>
            </div>
          </Product>
        </ProductList>
      </Container>
    </>
  );
}