import { Global, ThemeProvider } from "@emotion/react";
import theme from "./styles/theme";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import GlobalStyles from "./styles/global";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={GlobalStyles} />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
