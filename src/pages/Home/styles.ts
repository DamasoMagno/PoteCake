import styled from "styled-components";
import { SwiperSlide } from "swiper/react";

export const Description = styled.section`
  max-width: 1200px;
  width: var(--screen-width);
  padding: 3rem 0 3rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .description {
    h1 {
      max-width: 350px;
      color: #7e392a;
      font-size: 2.5rem;
    }

    p {
      margin: 1rem 0 2rem;
      width: 300px;
      line-height: 1.5rem;
      color: #767676;
    }

    a {
      background: #f2c029;
      border: 0;
      color: #fff;
      height: 3rem;
      padding: 0 2rem;
      display: flex;
      width: 50%;
      justify-content: center;
      align-items: center;
      transition: 250ms;
      border-radius: 0.25rem;

      &:hover {
        filter: brightness(0.9);
      }
    }
  }

  .logo {
    max-width: 528px;
    width: 80%;
    position: relative;

    img {
      width: 100%;
      height: 100%;
    }
  }

  @media (max-width: 760px) {
    flex-direction: column;
    align-items: center;

    div.description {
      order: 1;
      text-align: center;

      p {
        margin: 1rem auto 2rem;
      }

      a {
        margin: 0 auto;
      }
    }
  }
`;

export const Categories = styled.section`
  background: #fafafa;
  padding: 3.75rem 0;

  > div {
    max-width: 1200px;
    width: var(--screen-width);
    margin: 0 auto;

    h2 {
      color: #7e392a;
      font-size: 2.25rem;
      text-align: center;
      margin: 0 auto 3rem;

      @media (max-width: 768px) {
        text-align: left;
      }
    }

    div.swiper-button-next,
    div.swiper-button-prev {
      color: #fafafa;
    }
  }
`;

export const Category = styled.div`
  position: relative;

  img {
    width: 100%;
    height: 100%;
  }

  div {
    position: absolute;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    transition: 0.25s;
    bottom: 5px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    strong {
      color: #fafafa;
      font-size: 1.25rem;
    }

    a {
      background: transparent;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fafafa;
      border-radius: 0.25rem;
      height: 2rem;
      border: 1px solid #fafafa;
      padding: 0 1rem;
    }
  }

  &:hover div {
    height: 100%;
  }
`;

export const Comments = styled.section`
  padding: 3.75rem 0;

  > div {
    max-width: 1200px;
    width: var(--screen-width);
    margin: 0 auto;

    h2 {
      font-size: 2rem;
      text-align: center;
      font-weight: 700;
      margin: 0 auto 2rem;
      max-width: 400px;

      @media (max-width: 768px) {
        text-align: left;
        margin: 0;
      }

      strong {
        color: #7e392a;
      }
    }

    .depoimentsContainer {
      padding: 1rem 0.25rem 5rem;
      margin-top: 3rem;
    }
  }
`;

export const Comment = styled(SwiperSlide)`
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.08);
  padding: 2rem;
  color: #0f241d;
  border-radius: 0.25rem;
  text-align: justify;

  @media (max-width: 768px) {
    &:nth-child(2) {
      display: none;
    }
  }

  p {
    line-height: 1.5rem;
    color: rgba(15, 36, 29, 1);
  }

  div {
    margin-top: 1.5rem;
    display: flex;
    align-items: center;

    img {
      border-radius: 50%;
      width: 32px;
      height: 32px;
      margin-right: 0.5rem;
    }

    span {
      color: #767676;
    }
  }
`;

export const Contact = styled.footer`
  background: #733c30;
  padding: 3rem 0;

  > div {
    max-width: 1200px;
    width: var(--screen-width);
    margin: 0 auto;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
      gap: 3rem;
    }

    div {
      display: flex;
      flex-direction: column;
      max-width: 300px;
      width: 80%;

      h2 {
        font-size: 2rem;
        color: #fff;
        line-height: 2.5rem;
      }

      button {
        margin-top: 1rem;
        background: #f2c029;
        height: 3rem;
        padding: 0 1rem;
        border: 0;
        color: #fff;
        font-weight: bold;
        border-radius: 0.25rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1rem;

        svg {
          margin-right: 0.25rem;
        }
      }
    }

    ul {
      list-style: none;

      li {
        display: flex;
        align-items: center;
        color: #fafafa;
        margin-bottom: 1rem;

        &:last-child {
          margin-bottom: 0;
        }

        svg {
          color: #f2c029;
          margin-right: 0.5rem;
        }
      }
    }
  }
`;
