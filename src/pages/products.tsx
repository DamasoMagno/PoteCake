import { MdSearch } from "react-icons/md";
import { MdAddShoppingCart } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";

import {
  Container,
  SearchAndFilter,
  ProductList,
  Product
} from "../styles/Products";

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
                  Adicionar
                </button>
              </div>
            </div>
          </Product>
        </ProductList>
      </Container>
    </>
  );
}