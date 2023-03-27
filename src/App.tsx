import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { ThemeProvider } from "styled-components";
import { isDarkState } from "store/atoms";
import { GlobalStyle, defaultTheme, darkTheme } from "styles/theme";
import SignUp from "routes/SignUp";
import Login from "routes/Login";
import Searched from "routes/Searched";
import Category from "routes/Category";
import MyPost from "routes/MyPost";
import Bookmark from "routes/Bookmark";

const App = () => {
  const isDark = useRecoilValue(isDarkState);
  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : defaultTheme}>
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route path="/bookmark" element={<Bookmark />}>
              <Route path=":folderName" element={<Bookmark />} />
            </Route>
            <Route path="/mypage/posts" element={<MyPost />} />
            <Route path="/category/:categoryName" element={<Category />} />
            <Route path="/search" element={<Searched />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};

export default App;
