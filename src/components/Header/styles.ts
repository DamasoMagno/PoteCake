import styled, { css } from "styled-components";

export const Container = styled.header`
  background: #fff;
  padding: 1rem 0;
  width: 100%;

  .headerContent {
    margin: 0 auto;
    max-width: 1200px;
    width: var(--screen-width);
    display: flex;
    align-items: center;
    justify-content: space-between;

    .openMenu {
      background: transparent;
      border: 0;
      display: none;

      @media (max-width: 768px) {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      svg {
        width: 32px;
        height: 32px;
        color: #333;
      }
    }
  }
`;

type Navigation = {
  mobileMenuIsVisible: boolean;
};

export const Navigation = styled.nav<Navigation>`
  width: var(--screen-width);
  margin: 0 auto;
  display: none;

  .closeMenu {
    border: 0;
    background: transparent;
    align-self: flex-end;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      color: #000;
      width: 2rem;
      height: 2rem;
    }
  }

  @media(min-width: 768px){
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .closeMenu {
      display: none;
    }
  }

  a {
    color: rgba(0, 0, 0, 0.7);
    margin-right: 1.5rem;
    position: relative;

    &:hover {
      color: rgba(0, 0, 0, 1);
    }

    &:last-child {
      margin-right: 0;
    }
  }

  ${(props) => {
    return (
      props.mobileMenuIsVisible &&
      css`
        position: fixed;
        background-color: #fafafa;
        top: 0;
        z-index: 10;
        left: 0;
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;

        a {
          margin: .15rem 0;
          width: 100%;
          text-align: center;
          padding: 1rem;
          transition: background .25s;

          :hover {
            background: #c6c6c6;
          }
        }
      `
    );
  }}
`;
