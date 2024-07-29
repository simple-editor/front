import { css } from "@emotion/react";

const theme = {
  colors: {
    gray100: "#000",
    gray90: "#1B1B1B",
    gray80: "#373737",
    gray70: "#525252",
    gray60: "#6E6E6E",
    gray50: "#898989",
    grey40: "#A5A5A5",
    gray30: "#C0C0C0",
    gray20: "#DCDCDC",
    gray10: "#F7F7F7",
    white: "#FFF",
    whiteOverlay: "rgba(255, 255, 255, 0.80)",
    greyOverlay: "rgba(0, 0, 0, 0.80)",
    point: "#2DD8B9",
  },
  textStyles: {
    h1: css`
      font-family: "Pretendard";
      font-size: 3rem; // 48px
      font-style: normal;
      font-weight: 700;
      line-height: 3.25rem; // 52px
    `,
    h2: css`
      font-family: "Pretendard";
      font-size: 2.5rem; // 40px
      font-style: normal;
      font-weight: 700;
      line-height: 2.75rem; // 44px; /* 110% */
    `,
    h3: css`
      font-family: "Pretendard";
      font-size: 2rem; // 32px
      font-style: normal;
      font-weight: 700;
      line-height: 2.25rem; // 36px; /* 112.5% */
    `,
    h4: css`
      font-family: "Pretendard";
      font-size: 1.75rem; // 28px
      font-style: normal;
      font-weight: 700;
      line-height: 2rem; // 32px; /* 114.286% */
    `,
    h5: css`
      font-family: "Pretendard";
      font-size: 1.375rem; // 22px
      font-style: normal;
      font-weight: 700;
      line-height: 1.75rem; // 28px; /* 127.273% */
    `,
    h6: css`
      font-family: "Pretendard";
      font-size: 1.25rem; // 20px
      font-style: normal;
      font-weight: 700;
      line-height: 1.5rem; // 24px; /* 120% */
    `,
    p: css`
      font-family: "Pretendard";
      font-size: 1rem; // 16px
      font-style: normal;
      font-weight: 400;
      line-height: 1.5rem; // 24px; /* 150% */
    `,
    smallText1: css`
      font-family: "Pretendard";
      font-size: 0.875rem; // 14px
      font-style: normal;
      font-weight: 400;
      line-height: 1.25rem; // 20px; /* 142.857% */
    `,
    smallText2: css`
      font-family: "Pretendard";
      font-size: 0.75rem; // 12px
      font-style: normal;
      font-weight: 400;
      line-height: 1rem; // 16px
    `,
  },
};

export default theme;
