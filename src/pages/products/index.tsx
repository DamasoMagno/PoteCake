import { MdSearch } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { MdAddShoppingCart } from "react-icons/md";
import { Header } from "../../components/Header";

import {
  Container,
  SearchAndFilter,
  ProductList,
  Product
} from "./styles";

export default function products() {
  return (
    <>
      <Header />

      <Container>
        <SearchAndFilter>
          <div>
            <input placeholder="Pesquisar Produto" />
            <MdSearch />
          </div>

          <div>
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
                <button>
                  <MdAddShoppingCart />
                  Carrinho
                </button>
              </div>
            </div>
          </Product>
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
                <button>
                  <MdAddShoppingCart />
                  Carrinho
                </button>
              </div>
            </div>
          </Product>
        </ProductList>
      </Container>
    </>
  );
}