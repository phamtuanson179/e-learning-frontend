import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import router from "../../routes";
import Error404 from '../../pages/Error/Error404';
import checkLogin from '../../utils/checkLogin'
import SignIn from '../../pages/SignIn';
import ProtectedRoutes from "ProtectedRoutes";
const AppContent = () => {
  const navigate = useNavigate()
  return (
    <>
      <Routes>
        {/* <Route element={<ProtectedRoutes />}> */}
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
        {/* </Route> */}

        <Route path='/' element={<SignIn />} />
        <Route path='*' element={<Error404 />} />
      </Routes>
    </>
  );
};

export default AppContent;
