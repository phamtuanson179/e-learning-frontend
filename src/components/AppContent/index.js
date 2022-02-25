import Card from '@mui/material/Card';
import Courses from 'pages/Courses';
import Home from 'pages/Home';
import React from 'react';
import { Route, Routes } from 'react-router-dom'
import router from '../../routes'
const AppContent = () => {
  return (
    <>
      <Routes>
        {
          router.map((route, idx) => {
            return (
              route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  element={route.component}
                />
              )
            )
          })
        }
        <Route path='' exact element={<Courses />} />
      </Routes>
    </>

  )
}

export default AppContent