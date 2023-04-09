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
    font-family: 'SUIT';
    font-weight: 400;
  }
  p,button,label,h1,h2,h3,h4,h5,h6,em,span{
    font-family: 'SUIT';
    font-weight: 400;
    font-size:16px;
  }
  body {
    color: ${({ theme }) => theme.textColor};
    background-color: ${({ theme }) => theme.bgColor};
    transition: all 0.5s;
  }
  button{
    padding:0;
  }
  
  @font-face {
    font-family: 'SUIT-Bold';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_suit@1.0/SUIT-Bold.woff2') format('woff2');
    font-weight: Bold;
    font-style: normal;
  }
  @font-face {
    font-family: 'SUIT-SemiBold';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_suit@1.0/SUIT-SemiBold.woff2') format('woff2');
    font-weight: SemiBold;
    font-style: normal;
  }
  @font-face {
    font-family: 'SUIT-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_suit@1.0/SUIT-Regular.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'SUIT-Medium';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_suit@1.0/SUIT-Medium.woff2') format('woff2');
    font-weight: Medium;
    font-style: normal;
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
  greyLight: "#aeaeae",
  lightBlue: "#F5FAFF",
  redColor: "#FF0F00",
  borderColor: "#AEAEAE",
  scrollColor: "#606060",
};

export const darkTheme: DefaultTheme = {
  textColor: "#fff",
  bgColor: "#111",
};
