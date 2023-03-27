import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { ThemeProvider } from "styled-components";
import { isDarkState } from "store/atoms";
import { GlobalStyle, defaultTheme, darkTheme } from "styles/theme";
import Login from "routes/Login";
import Temp from "routes/Temp";
import Admin from "routes/Admin"
import Category from "routes/Category";
const App = () => {
  const isDark = useRecoilValue(isDarkState);
  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : defaultTheme}>
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route path="/temp" element={<Temp />} />
            <Route path="/" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/category" element={<Category />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};

export default App;
