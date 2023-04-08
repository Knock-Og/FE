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
            <Route path="/admin" element={<ROUTE.Admin />} />
            <Route path="/admin/category" element={<ROUTE.AdminCategory />} />
            <Route path="/admin/login" element={<ROUTE.AdminLogin />} />

            {/* Main */}
            <Route path="/" element={<ROUTE.Main />} />

            {/* Bookmark */}
            <Route path="/bookmark" element={<ROUTE.Bookmark />} />
            <Route path="/bookmark/:folderName" element={<ROUTE.Bookmark />} />

            {/* Category */}
            <Route
              path="/category/:categoryName"
              element={<ROUTE.Category />}
            />

            {/* Detail */}
            <Route path="/post/:postId" element={<ROUTE.Detail />} />

            {/* Login */}
            <Route path="/login" element={<ROUTE.Login />} />
            <Route path="/login/findid" element={<ROUTE.FindId />} />
            <Route path="/login/findpw" element={<ROUTE.FindPw />} />

            {/* Mypage */}
            <Route path="/mypage/posts" element={<ROUTE.MyPost />} />
            <Route path="/mypage" element={<ROUTE.Mypage />} />

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
