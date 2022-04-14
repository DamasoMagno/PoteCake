import styled from "styled-components";

export const Container = styled.header`
  background: #fff;
  padding: 1rem 0;
  width: 100%;
  position: sticky;
  position: -webkit-sticky;
  top: 0;
`;

export const Content = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  width: var(--screen-width);
  display: flex;
  align-items: center;
  justify-content: space-between;

  .logo {
    font-size: 1.5rem;
    cursor: pointer;
    color: rgba(0, 0, 0, 0.7);
    font-weight: 700;
    font-style: italic;

    strong {
      letter-spacing: -0.25rem;
      color: #7e392a;
      font-size: 1.85rem;
      position: relative;
    }
  }

  nav {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 2rem;

    @media (max-width: 728px) {
      display: none;
    }

    a {
      color: rgba(0, 0, 0, 0.6);
      transition: color 0.25s;
      font-weight: 600;

      &:hover,
      &.active {
        color: #7e392a;
      }
    }

    @media (max-width: 728px) {
      &.mobileMenu {
        position: fixed;
        background-color: #fafafa;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        a {
          margin: 0.15rem 0;
          width: 100%;
          font-size: 1.5rem;
          font-weight: bold;
          text-align: center;
          padding: 1rem;
          transition: background 0.25s;
        }
      }
    }
  }

  button {
    display: none;
    border: 0;
    background: transparent;

    @media (max-width: 728px) {
      &.openMenu {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    svg {
      width: 2rem;
      height: 2rem;
      color: #333;
    }
  }
`;
