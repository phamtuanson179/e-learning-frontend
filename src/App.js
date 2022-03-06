import { useEffect } from "react";
// or for Moment.js
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider'

// react-router components
import { Routes, Route, Navigate, useLocation, BrowserRouter } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Material Kit 2 React themes
import theme from "assets/theme";

// Material Kit 2 React routes
import routes from "routes";
import Home from "pages/Home";
import DefaultLayout from "layouts/DefaultLayout";
import './assets/scss/index.scss'

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
