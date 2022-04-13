import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  :root {
    --screen-width: 87.848vw;
  }

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  html {
    @media(max-width: 1024px){
      font-size: 93.5%;
    }

    @media(max-width: 768px){
      font-size: 93.5%;
    }
  }

  a {
    text-decoration: none;
  }

  button {
    cursor: pointer;
  }

  [disabled]{
    cursor: not-allowed;
  }
`;
