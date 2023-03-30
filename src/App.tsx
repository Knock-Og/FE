import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { ThemeProvider } from "styled-components";
import { isDarkState } from "store/atoms";
import { GlobalStyle, defaultTheme, darkTheme } from "styles/theme";
import * as ROUTE from "routes";

const App = () => {
  const isDark = useRecoilValue(isDarkState);

  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : defaultTheme}>
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            {/* Admin */}
            <Route path="/admin" element={<ROUTE.Admin />}>
              <Route path="category" element={<ROUTE.AdminCategory />} />
              <Route path="login" element={<ROUTE.AdminLogin />} />
            </Route>

            {/* Main */}
            <Route path="/" element={<ROUTE.Main />} />

            {/* Bookmark */}
            <Route path="/bookmark" element={<ROUTE.Bookmark />}>
              <Route path=":folderName" element={<ROUTE.Bookmark />} />
            </Route>

            {/* Category */}
            <Route
              path="/category/:categoryName"
              element={<ROUTE.Category />}
            />

            {/* Detail */}
            <Route path="/post/:id" element={<ROUTE.Detail />} />

            {/* Login */}
            <Route path="/login" element={<ROUTE.Login />}>
              <Route path="findid" element={<ROUTE.FindId />} />
              <Route path="findid/code" element={<ROUTE.FindIdCode />} />
              <Route path="findpw" element={<ROUTE.FindPw />} />
              <Route path="findpw/code" element={<ROUTE.FindPwCode />} />
            </Route>

            {/* Modify */}
            <Route path="/modify" element={<ROUTE.Modify />} />

            {/* Mypage */}
            <Route path="/mypage/posts" element={<ROUTE.MyPost />} />

            {/* Searched */}
            <Route path="/search" element={<ROUTE.Searched />} />

            {/* Write */}
            <Route path="/write" element={<ROUTE.Write />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};

export default App;
