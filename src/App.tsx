import { Global, ThemeProvider } from "@emotion/react";
import theme from "./shared/styles/theme";
import { RouterProvider } from "react-router-dom";
import router from "@/shared/router";
import GlobalStyles from "./shared/styles/global";
import { ChakraProvider } from "@chakra-ui/react";
import chakraTheme from "./shared/styles/chakra-theme";
function App() {
  return (
    <ChakraProvider theme={chakraTheme}>
      <ThemeProvider theme={theme}>
        <Global styles={GlobalStyles} />
        <RouterProvider router={router} />
      </ThemeProvider>
    </ChakraProvider>
  );
}

export default App;
