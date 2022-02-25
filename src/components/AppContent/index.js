import { Navigate, Route, Routes } from "react-router-dom";
import router from "../../routes";
const AppContent = () => {
  return (
    <>
      <Routes>
        {router.map((route, idx) => {
          return (
            route.component && (
              <Route
                key={idx}
                path={route.path}
                exact={route.exact}
                element={route.component}
              />
            )
          );
        })}
        <Route path='/' element={<Navigate to='/current-courses' />} />
      </Routes>
    </>
  );
};

export default AppContent;
