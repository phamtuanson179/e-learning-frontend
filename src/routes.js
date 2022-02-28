import CurCourses from "pages/CurCourses";
import ManagerInfo from "./pages/ManagerInfo";
import { default as AllCourses, default as Course } from "./pages/AllCourses";
import SignInBasic from "./pages/SignIn";
import Exam from "pages/Exam";

// const Home = React.lazy(() => import('./pages/Home'))
// const Course = React.lazy(() => import('./pages/Course'))

const routes = [
  {
    path: "/",
    exact: true,
    name: "Home",
    component: <CurCourses />,
  },
  {
    path: "current-courses",
    exact: true,
    name: "CurCourses",
    component: <CurCourses />,
  },
  {
    path: "all-courses",
    exact: true,
    name: "AllCourses",
    component: <AllCourses />,
  },
  {
    path: "sign-in",
    exact: true,
    name: "Course",
    component: <SignInBasic />,
  },
  {
    path: "manager-info",
    exact: true,
    name: 'ManagerInfo',
    component: <ManagerInfo />
  },
  {
    path: "exam",
    exact: true,
    name: 'Exam',
    component: <Exam />
  },


];

export default routes;
