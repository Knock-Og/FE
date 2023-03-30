import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { ThemeProvider } from "styled-components";
import { isDarkState } from "store/atoms";
import { GlobalStyle, defaultTheme, darkTheme } from "styles/theme";
import Login from "routes/Login";
import AdminLogin from "routes/AdminLogin";
import Searched from "routes/Searched";
import Category from "routes/Category";
import MyPost from "routes/MyPost";
import Bookmark from "routes/Bookmark";
import Admin from "routes/Admin";
import AdminCategory from "routes/AdminCategory";
import FindId from "routes/FindId";
import FindIdCode from "routes/FindIdCode";
import FindPw from "routes/FindPw";
import FindPwCode from "routes/FindPwCode";
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
            <Route path="/login/findid" element={<FindId />} />
            <Route path="/login/findid/code" element={<FindIdCode />} />

            <Route path="/login/findpw" element={<FindPw />} />
            <Route path="/login/findpw/code" element={<FindPwCode />} />

            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/category" element={<AdminCategory />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};

export default App;
