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
  p,button,label,h1,h2,h3,h4,h5,h6,em,span,li{
    font-family: 'SUIT';
    font-weight: 400;
    font-size:16px;
  }
  body {
    /* min-width : 1440px; */
    color: ${({ theme }) => theme.textColor};
    background-color: ${({ theme }) => theme.bgColor};
   
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
  bgColor: "#fff",
  bgwhite: "#fff",
  bgLightBlue: "#F5FAFF",
  bglightblack: "#fff",
  bgBlue: "#007FFF",
  bgGrey: "#f9f9f9",
  delBtn: "#007FFF",
  textColor: "#121212",
  textBlue: "#007FFF",
  textRed: "#ff0000",
  textGray:"#aeaeae",
  redLightColor: "#EC1A22",
  greenColor: "#24CE57",
  textwhite: "#fff",
  borderColor: "#AEAEAE",
  borderWrite: "#DADDE6",
  borderGray: "#AEAEAE",
  fillGrey: "#C5C5C5",
  fillblack: "#121212",
  fillWhite: "#fff",
  radius: "#fff",
  search: "#5a5a5a",
  alarm: "#AEAEAE",
  placeholder: "#bdbdbd",
  scrollColor: "#AEAEAE",
};

export const darkTheme: DefaultTheme = {
  bgColor: "#121212",
  bgwhite: "#2F2F2F",
  bgLightBlue: "#272727",
  bglightblack: "#232323",
  bgBlue: "#007FFF",
  bgGrey: "#2F2F2F",
  textColor: "#fff",
  textBlue: "#fff",
  textRed: "#ff0000",
  textGray: "#fff",
  textwhite: "#fff",
  redLightColor: "#fff",
  greenColor: "#fff",
  borderColor: "#414141",
  borderGray: "#fff",
  borderWrite: "#414141",
  radius: "#2F2F2F",
  delBtn: "#2F2F2F",
  fillGrey: "#ACACAC",
  fillblack: "#fff",
  fillWhite: "#2F2F2F",
  search: "#ACACAC",
  alarm: "#272727",
  placeholder: "#ACACAC",
  scrollColor: "#ACACAC",
};
