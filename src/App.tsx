import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { ThemeProvider } from "styled-components";
import { isDarkState } from "store/atoms";
import { GlobalStyle, defaultTheme, darkTheme } from "styles/theme";
import SignUp from "routes/SignUp";

const App = () => {
  const isLight = useRecoilValue(isDarkState);
  return (
    <>
      <ThemeProvider theme={isLight ? defaultTheme : darkTheme}>
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};

export default App;
