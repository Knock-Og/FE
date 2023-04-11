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
    /* transition: all 0.5s; */
    overflow-x:hidden;
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
  textwhite: "#fff",
  textblack: "#121212",
  textRed: "#ff0000",
  textGrey: "#5a5a5a",
  keyBlue: "#007FFF",
  grey: "#828282",
  darkGrey: "#121212",
  lightGrey: "#C5C5C5", 
  veryLightGrey: "#f9f9f9",
  greyLight: "#aeaeae",
  lightBlue: "#F5FAFF",
  redColor: "#FF0F00",

  bgBlue: "#007fff",
  bgColor: "#fff",
  bgLightBlue: "#F5FAFF",
  scrollColor: "#606060",

  fillWhite: "#fff",
  stroke: "#007FFF",
  borderColor: "#AEAEAE",
  pageBorder: "#DADDE6",
  borderBlue: "#007fff",
  placeholder: "#bdbdbd",
  blockBorder: "#000",
  greyBorder: "#f9f9f9",
};

export const darkTheme: DefaultTheme = {
  textColor: "#fff",
  bgColor: "#111",
};
