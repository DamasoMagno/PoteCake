import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  width: var(--screen-width);
  margin: 0 auto;
`;

export const SearchAndFilter = styled.div`
  display: flex;
  margin: 2rem 0 3rem;
  align-items: center;

  div {
    width: 300px;
    background-color: #f0efef;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;

    & + div {
      margin-left: 0.5rem;
    }

    input,
    select {
      background: transparent;
      margin-right: 0.5rem;
      width: 100%;
      outline: 0;
      border: 0;
      font-size: 1rem;
      padding: 0.25rem 0.5rem;
    }

    svg {
      color: rgba(107, 107, 107, 0.25);
      width: 24px;
      height: 24px;
    }

    select {
      -webkit-appearance: none;
    }
  }
`;

export const ProductList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media(max-width: 768px){
    grid-template-columns: 1fr;
  }
`;

export const Product = styled.div`
  display: flex;
  border: 1px solid rgba(232, 232, 232, 1)  ;
  border-radius: .5rem;
  background: #FDFDFD;

  img {
    width: 30%;
    object-fit: cover;
  }

  .description {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1rem 1.25rem;

    div.productInformation {
      h3 {
        text-transform: uppercase;
        font-size: 1.25rem;
      }

      p {
        color: #383838;
        margin-top: .5rem;
        font-size: .85rem;
      }
    }

    div.addProductCart {
      margin-top: 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: baseline;

      button {
        background: #733C30;
        color: #FFF;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 0;
        border-radius: .25rem;
        padding: .25rem 1rem;
        font-size: 1rem;

        svg {
          margin-right: .25rem;
        }
      }
    }
  }
`;
