// or for Moment.js
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "assets/theme";
import DefaultLayout from "layouts/DefaultLayout";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import './assets/scss/index.scss';


export const UserContext = createContext();

export default function App() {
  const { pathname } = useLocation();
  const [user, setUser] = useState({ loggedIn: false });
  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LocalizationProvider dateAdapter={DateAdapter}> <DefaultLayout /></LocalizationProvider>
      </ThemeProvider>
    </UserContext.Provider>
  );
}
