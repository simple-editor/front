import { Global, ThemeProvider } from "@emotion/react";
import theme from "./shared/styles/theme";
import { RouterProvider } from "react-router-dom";
import router from "@/shared/router";
import GlobalStyles from "./shared/styles/global";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={GlobalStyles} />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
