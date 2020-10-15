const light = {
  bg: "#fafbfc",
  cardBG: "rgba(255, 255, 255, 1)",
  cardBoxShadow:
    "0 5px 10px rgba(154, 160, 185, 0.05), 0 15px 40px rgba(166, 173, 201, 0.2)",
  cardBoxHoverBG: "",
};

const dark = {
  bg: "#363942",
  cardBg: "#363942",
  cardBoxShadow: "0 -2px 10px rgba(0, 0, 0, .5)",
  cardBoxHoverBG: "",
};

const defaultTheme = {
  fontWeights: {
    body: 400,
    subheading: 500,
    link: 600,
    bold: 700,
    heading: 800,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.3,
    code: 1.6,
  },
};

export const lightTheme = { ...defaultTheme, ...light };
export const darkTheme = { ...defaultTheme, ...dark };
