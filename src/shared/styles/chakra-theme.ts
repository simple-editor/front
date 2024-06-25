import { extendTheme } from "@chakra-ui/react";

const chakraTheme = extendTheme({
  colors: {
    gray: {
      100: "#000",
      90: "#1B1B1B",
      80: "#373737",
      70: "#525252",
      60: "#6E6E6E",
      50: "#898989",
      40: "#A5A5A5", // Note this typo correction: grey40 to gray40
      30: "#C0C0C0",
      20: "#DCDCDC",
      10: "#F7F7F7",
    },
    white: "#FFF",
    whiteOverlay: "rgba(255, 255, 255, 0.80)",
    greyOverlay: "rgba(0, 0, 0, 0.80)",
    point: "#2DD8B9",
  },
  textStyles: {
    h1: {
      fontFamily: "Pretendard",
      fontSize: "3rem", // 48px
      fontWeight: "bold",
      lineHeight: "52px",
    },
    h2: {
      fontFamily: "Pretendard",
      fontSize: "2.5rem", // 40px
      fontWeight: "bold",
      lineHeight: "44px",
    },
    h3: {
      fontFamily: "Pretendard",
      fontSize: "2rem", // 32px
      fontWeight: "bold",
      lineHeight: "36px",
    },
    h4: {
      fontFamily: "Pretendard",
      fontSize: "1.75rem", // 28px
      fontWeight: "bold",
      lineHeight: "32px",
    },
    h5: {
      fontFamily: "Pretendard",
      fontSize: "1.375rem", // 22px
      fontWeight: "bold",
      lineHeight: "28px",
    },
    h6: {
      fontFamily: "Pretendard",
      fontSize: "1.25rem", // 20px
      fontWeight: "bold",
      lineHeight: "24px",
    },
    p: {
      fontFamily: "Pretendard",
      fontSize: "1rem", // 16px
      fontWeight: "normal",
      lineHeight: "24px",
    },
    smallText1: {
      fontFamily: "Pretendard",
      fontSize: "0.875rem", // 14px
      fontWeight: "normal",
      lineHeight: "20px",
    },
    smallText2: {
      fontFamily: "Pretendard",
      fontSize: "0.75rem", // 12px
      fontWeight: "normal",
      lineHeight: "16px",
    },
  },
});

export default chakraTheme;
