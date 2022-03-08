// or for Moment.js
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CssBaseline from "@mui/material/CssBaseline";
// @mui material components
import { ThemeProvider } from "@mui/material/styles";
// Material Kit 2 React themes
import theme from "assets/theme";
import DefaultLayout from "layouts/DefaultLayout";
import { useEffect } from "react";
// react-router components
import { useLocation } from "react-router-dom";
import './assets/scss/index.scss';





export default function App() {
  const { pathname } = useLocation();

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);



  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={DateAdapter}> <DefaultLayout /></LocalizationProvider>
    </ThemeProvider>
  );
}
