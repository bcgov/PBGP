import { createMuiTheme } from '@material-ui/core/styles';

export const Theme = createMuiTheme({

  /** Colors */
  palette: {
    primary: {
      main: '#0A70C4',
    },
    secondary: {
      main: '#0B81A2',
    },
    background: {
      default: '#FFFFFF',
    },
    text: {
      primary: '#333333',
      secondary: '#000000',
      disabled: '#6F6F6F',
    },
    info: {
      main: '#0A70C4',
    },
    warning: {
      main: '#FEBA35',
    },
    common: {
      white: '#FFFFFF',
      black: '#000000',
      lightGrey: '#F1F1F1',
      lighterGrey: '#fafafa',
      darkGrey: '#666666',
    },
    divider: '#DCDCDC',
  },

  /** Breakpoints */
  breakpoints: {
    values: {
      xs: 0,
      sm: 750,
      md: 1110,
      lg: 1430,
      xl: 2070,
    },
  },

  /** Typography */
  typography: {
    fontFamily: 'acumin-pro-semi-condensed, sans-serif;',
    h1: {
      fontSize: '48px',
      lineHeight: '54px',
      letterSpacing: 0,
      fontWeight: 700,
      '@media (max-width:1110px)': {
        fontSize: '34px',
        lineHeight: '42px',
      },
      '@media (max-width:750px)': {
        fontSize: '24px',
        lineHeight: '32px',
      },
    },
    h2: {
      fontSize: '48px',
      lineHeight: '56px',
      letterSpacing: '-1.50px',
      fontWeight: 700,
      '@media (max-width:1110px)': {
        fontSize: '42px',
        lineHeight: '50px',
      },
    },
    h3: {
      fontSize: '24px',
      lineHeight: '24px',
      letterSpacing: 0,
      fontWeight: 700,
      '@media (max-width:1110px)': {
        fontSize: '22px',
        lineHeight: '22px',
      },
      '@media (max-width:750px)': {
        fontSize: '20px',
        lineHeight: '20px',
      },
    },
    h4: {
      fontSize: '18px',
      lineHeight: '22px',
      letterSpacing: 0,
      fontWeight: 700,
      '@media (max-width:750px)': {
        fontSize: '17px',
        lineHeight: '20px',
      },
    },
    subtitle1: {
      fontSize: '24px',
      lineHeight: '32px',
      letterSpacing: 0,
      '@media (max-width:1110px)': {
        fontSize: '20px',
        lineHeight: '26px',
      },
      '@media (max-width:750px)': {
        fontSize: '16px',
        lineHeight: '24px',
      },
    },
    subtitle2: {
      fontSize: '18px',
      lineHeight: '28px',
      letterSpacing: '-0.25px',
      fontWeight: 700,
      '@media (max-width:750px)': {
        fontSize: '17px',
        lineHeight: '22px',
      },
    },
    body1: {
      fontSize: '18px',
      lineHeight: '28px',
      letterSpacing: 0,
      '@media (max-width:1110px)': {
        fontSize: '17px',
        lineHeight: '26px',
      },
      '@media (max-width:750px)': {
        fontSize: '16px',
        lineHeight: '24px',
      },
    },
    body2: {
      fontSize: '16px',
      lineHeight: '24px',
      letterSpacing: 0,
      '@media (max-width:1110px)': {
        fontSize: '15px',
        lineHeight: '22px',
      },
    },
    caption: {
      fontSize: '12px',
      lineHeight: '16px',
      letterSpacing: 0,
      fontWeight: 500,
    },
    overline: {
      fontSize: '12px',
      lineHeight: '18px',
      letterSpacing: '-0.5px',
      fontWeight: 500,
    },
    button: {
      fontSize: '18px',
      lineHeight: '18px',
      letterSpacing: 0,
      textTransform: 'capitalize',
      fontWeight: 700,
    },
  },

  /** Overrides */
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '#root': {
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        },
        ul: {
          padding: '0 0 0 1rem',
          margin: 0,
        },
        'textarea': {
          padding: `0 !important`,
        },
      },
    },
    MuiContainer: {
      root: {
        '@media (max-width:750px)': {
          paddingLeft: '10px',
          paddingRight: '10px',
        },
      },
    },
    MuiInputBase: {
      root: {
        backgroundColor: '#FFFFFF',
        overflow: "hidden",
      },
      marginDense: {
        height: "40px !important",
      },
    },
    MuiOutlinedInput: {
      input: {
        padding: '13px',
      },
      notchedOutline: {
        borderColor: '#666666',
      },
    },
    MuiCard: {
      root: {
        boxShadow: 'none',
        border: '1px solid #DCDCDC',
      },
    },
    MuiMenu: {
      list: {
        minWidth: 175,
      },
    },
    MuiMenuItem: {
      root: {
        fontSize: 16,
      },
    },
    MuiIconButton: {
      root: {
        padding: '8px',
      },
    },
    MuiDrawer: {
      paper: {
        width: '80vw',
      },
    },
    MuiLink: {
      root: {
        color: '#000000',
        width: 'fit-content',
        textDecoration: 'underline !important',
        '&:hover': {
          opacity: '0.75',
        },
      },
    },
    MuiSkeleton: {
      text: {
        transform: "none",
      },
    },
  },
});
