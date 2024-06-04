import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    colors: {
      gray100: string;
      gray90: string;
      gray80: string;
      gray70: string;
      gray60: string;
      gray50: string;
      grey40: string;
      gray30: string;
      gray20: string;
      gray10: string;
      white: string;
      whiteOverlay: string;
      greyOverlay: string;
      point: string;
    };
    textStyles: {
      h1: SerializedStyles;
      h2: SerializedStyles;
      h3: SerializedStyles;
      h4: SerializedStyles;
      h5: SerializedStyles;
      h6: SerializedStyles;
      p: SerializedStyles;
      smallText1: SerializedStyles;
      smallText2: SerializedStyles;
    };
  }
}

export interface IThemeProps {
  theme: Theme;
}
