import {
  Palette as MuiPallete,
  PaletteOptions as MuiPaletteOptions,
  TypeBackground as MuiTypeBackground,
} from "@mui/material/styles/createPalette";

declare module "@mui/material/styles/createPalette" {
  interface Palette extends MuiPallete {
    neutral: {
      dark: string;
      main: string;
      mediumMain: string;
      medium: string;
      light: string;
    };
  }

  interface PaletteOptions extends MuiPaletteOptions {
    neutral?: {
      dark: string;
      main: string;
      mediumMain: string;
      medium: string;
      light: string;
    };
  }
  interface TypeBackground extends MuiTypeBackground {
    alt: string;
  }
}

// declare module "@mui/material/styles/createPalette" {
//   interface PaletteTheme extends Palette {
//     neutral: {
// dark: string;
// main: string;
// mediumMain: string;
// medium: string;
// light: string;
//     };

//     mode: Mode;
//   }
// }
