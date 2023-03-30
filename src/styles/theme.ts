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
    transition: all 0.5s;
  }
`;

export const defaultTheme: DefaultTheme = {
  textColor: "#111",
  bgColor: "#fff",
  keyBlue: "#007FFF",
  grey: "#828282",
  darkGrey: "#121212",
  lightGrey: "#C5C5C5",
  veryLightGrey: "#f9f9f9",
};

export const darkTheme: DefaultTheme = {
  textColor: "#fff",
  bgColor: "#111",
};
