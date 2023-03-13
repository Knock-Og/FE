import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { CookiesProvider } from "react-cookie";
import { RecoilRoot } from "recoil";
import { StyledEngineProvider } from "@mui/material";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StyledEngineProvider injectFirst>
    <CookiesProvider>
      <QueryClientProvider client={new QueryClient()}>
        <RecoilRoot>
          <App />
        </RecoilRoot>
      </QueryClientProvider>
    </CookiesProvider>
  </StyledEngineProvider>
);
