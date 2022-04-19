import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { FiPhone, FiMail } from "react-icons/fi"
import {
  A11y,
  Navigation,
  Pagination,
  Scrollbar
} from "swiper";

import {
  Categories,
  Description,
  Comments,
  Comment,
  Category,
  Contact
} from "../styles/Home";

import 'swiper/css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function Home() {
  return (
    <>
      <main>
        <Description>
          <div className="description">
            <h1>Lorem Ipsum dolor sit amet</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur 
              adipiscing elit. Aliquam non lectus.
            </p>
            <Link href="/products">Explorar Menu</Link>
          </div>
          <div className="logo">
            <img src="assets/logo.svg" alt="Bolo de Chocolate Confeitado" />
          </div>
        </Description>

        <Categories>
          <div>
            <h2>Nosso Menu</h2>

            <Swiper
              modules={[Navigation, Scrollbar]}
              navigation={true}
              spaceBetween={5}
              pagination={{ clickable: true }}
              breakpoints={{
                728: {
                  width: 400,
                  slidesPerView: 1,
                },
                1200: {
                  width: 1200,
                  slidesPerView: 4,
                },
              }}
            >
              <SwiperSlide>
                <Category>
                  <img
                    src="assets/categoryProduct.svg"
                    alt="Categoria de Bolos"
                  />
                  <div>
                    <strong>Bolos</strong>
                    <Link href="/products">Ver Mais</Link>
                  </div>
                </Category>
              </SwiperSlide>
              <SwiperSlide>
                <Category>
                  <img
                    src="assets/categoryProduct.svg"
                    alt="Categoria de Bolos"
                  />
                  <div>
                    <strong>Bolos</strong>
                    <Link href="/products">Ver Mais</Link>
                  </div>
                </Category>
              </SwiperSlide>
              <SwiperSlide>
                <Category>
                  <img
                    src="assets/categoryProduct.svg"
                    alt="Categoria de Bolos"
                  />
                  <div>
                    <strong>Bolos</strong>
                    <Link href="/products">Ver Mais</Link>
                  </div>
                </Category>
              </SwiperSlide>
              <SwiperSlide>
                <Category>
                  <img
                    src="assets/categoryProduct.svg"
                    alt="Categoria de Bolos"
                  />
                  <div>
                    <strong>Bolos</strong>
                    <Link href="/products">Ver Mais</Link>
                  </div>
                </Category>
              </SwiperSlide>
              <SwiperSlide>
                <Category>
                  <img
                    src="assets/categoryProduct.svg"
                    alt="Categoria de Bolos"
                  />
                  <div>
                    <strong>Bolos</strong>
                    <Link href="/products">Ver Mais</Link>
                  </div>
                </Category>
              </SwiperSlide>
              <SwiperSlide>
                <Category>
                  <img
                    src="assets/categoryProduct.svg"
                    alt="Categoria de Bolos"
                  />
                  <div>
                    <strong>Bolos</strong>
                    <Link href="/products">Ver Mais</Link>
                  </div>
                </Category>
              </SwiperSlide>
            </Swiper>
          </div>
        </Categories>

        <Comments>
          <div>
            <h2>
              <strong>Comentários</strong> 
              de quem já comprou conosco
            </h2>

            <Swiper
              className="depoimentsContainer"
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={20}
              breakpoints={{
                728: {
                  width: 728,
                  slidesPerView: 1,
                },
                1200: {
                  width: 1200,
                  slidesPerView: 2,
                },
              }}
              pagination={{ clickable: true }}
            >
              <SwiperSlide>
                <Comment>
                  Minha mãe frequenta o salão há anos e me levou um dia para conhecer.
                  Minha experiência foi incrível, eu continuo fazendo o a terapia capilar
                  e isso salvou o meu cabelo. Adoro todos os profissionais do Beautysalon.
                  <div>
                    <img
                      src="data:image/jpeg;base64,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"
                      alt="Foto de Usuario que deu uma opnião"
                    />
                    <span>Luna Falcão</span>
                  </div>
                </Comment>
              </SwiperSlide>
              <SwiperSlide>
                <Comment>
                  Minha mãe frequenta o salão há anos e me levou um dia para conhecer.
                  Minha experiência foi incrível, eu continuo fazendo o a terapia capilar
                  e isso salvou o meu cabelo. Adoro todos os profissionais do Beautysalon.
                  <div>
                    <img
                      src="data:image/jpeg;base64,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"
                      alt="Foto de Usuario que deu uma opnião"
                    />
                    <span>Luna Falcão</span>
                  </div>
                </Comment>
              </SwiperSlide>
              <SwiperSlide>
                <Comment>
                  <p>
                    Minha mãe frequenta o salão há anos e me levou um dia para conhecer.
                    Minha experiência foi incrível, eu continuo fazendo o a terapia capilar
                    e isso salvou o meu cabelo. Adoro todos os profissionais do Beautysalon.
                  </p>
                  <div>
                    <img
                      src="data:image/jpeg;base64,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"
                      alt="Foto de Usuario que deu uma opnião"
                    />
                    <span>Luna Falcão</span>
                  </div>
                </Comment>
              </SwiperSlide>
            </Swiper>
          </div>
        </Comments>

        <Contact>
          <div>
            <div>
              <h2>Entre em Contato Conosco</h2>
              <button>Entrar em Contato</button>
            </div>
            <ul>
              <li>
                <FiPhone />
                <span>(88) 9 9601-8788</span>
              </li>
              <li>
                <FiMail />
                <span>potecake@gmail.com</span>
              </li>
            </ul>
          </div>
        </Contact>
      </main>
    </>
  );
}