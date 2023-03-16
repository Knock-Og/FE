import { DefaultTheme, createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
  ${reset};

  * {
    box-sizing : border-box;
  }

  a {
    text-decoration : none;
    color:inherit;
  }
  
  body {
    color: ${({ theme }) => theme.textColor};
    background-color: ${({ theme }) => theme.bgColor};
  }
`;

export const defaultTheme: DefaultTheme = {
  textColor: "#111",
  bgColor: "#fff",
};

export const darkTheme: DefaultTheme = {
  textColor: "#fff",
  bgColor: "#111",
};
