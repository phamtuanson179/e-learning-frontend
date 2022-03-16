import { UserContext } from 'App'
import ForgotPassword from 'pages/ForgotPassword';
import { useContext } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'


const useAuth = () => {
    const { user } = useContext(UserContext);
    return user && user.loggedIn
}

const ProtectedRoutes = () => {
    const location = useLocation();
    const isAuth = useAuth();
    // if (location.pathname === 'forgot-password')
    //     return <ForgotPassword />
    // else 
    return isAuth ? <Outlet /> : <Navigate to='/' replace state={{ from: location }} />
}


export default ProtectedRoutes;