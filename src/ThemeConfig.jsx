import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: (props) => ({
      "::-webkit-scrollbar": {
        width: "8px",
        height: "0",
      },

      "::-webkit-scrollbar-track": {
        background: "#6e6e6e4c",
      },

      /* Handle */
      "::-webkit-scrollbar-thumb": {
        background: "#5900ff5e",
        borderRadius: "1ex",
      },

      /* Handle on hover */
      "::-webkit-scrollbar-thumb:hover": {
        background: "#5900ff9d",
      },
      body: {
        bg: props.colorMode === "dark" ? "bg" : "bg",
      },
    }),
  },
  config: {
    disableTransitionOnChange: false,
  },
  semanticTokens: {
    colors: {
      error: "red.500",
      success: "green.500",
      textLight: {
        default: "white",
        _dark: "black",
      },
      primary: {
        default: "#6b6ef8",
        _dark: "white",
      },
      secondary: {
        default: "white",
        _dark: "#2c2c2c",
      },
      bg: {
        default: "#ffffff",
        _dark: "#1c1c1c",
      },
      accent1: {
        default: "#f0f0f7",
        _dark: "#252525",
      },
      accent2: {
        default: "#6b6ef8",
        _dark: "#5658cf",
      },
      accent3: {
        default: "#9e9fff",
        _dark: "#ffffff08",
      },
      frozen: {
        default: "#ffffff45",
        _dark: "#1c1c1c55",
      },
      frozen2: {
        default: "#ffffff73",
        _dark: "#ffffff16",
      },
      linearOpacity1: {
        default:
          "linear-gradient(319deg, rgba(91,83,218,1) 0%, rgba(137,137,255,1) 35%, rgba(255,255,255,1) 100%)",
        _dark:
          "linear-gradient(319deg, rgba(5,4,32,1) 0%, rgba(19,19,117,1) 42%, rgba(255,255,255,1) 100%)",
      },
      linearOpacity2: {
        default:
          "linear-gradient(330deg, rgba(158,159,255,1) 0%, rgba(187,187,255,1) 100%)",
        _dark:
          "linear-gradient(319deg, rgba(93,94,203,1) 0%, rgba(187,187,255,1) 100%)",
      },
    },
    shadows: {
      shadow1: {
        default: "0px 0px 14px rgba(0, 0, 0, 0.082)",
        _dark: "0px 0px 14px rgba(0, 0, 0, 0.13)",
      },
    },
  },
});

export default theme;
