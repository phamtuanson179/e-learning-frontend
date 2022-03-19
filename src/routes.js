import CurCourses from "pages/CurCourses";
import Error404 from "pages/Error/Error404";
import Exam from "pages/Exam";
import ForgotPassword from "pages/ForgotPassword";
import ListExams from "pages/ListExams/ListExams";
import { default as AllCourses } from "./pages/AllCourses";
import Setting from "./pages/Setting";

// const Home = React.lazy(() => import('./pages/Home'))
// const Course = React.lazy(() => import('./pages/Course'))

const routes = [
  // {
  //   path: "/",
  //   exact: true,
  //   name: "Home",
  //   component: <CurCourses />,
  // },
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
    path: "list-exams",
    exact: true,
    name: "ListExams",
    component: <ListExams />,
  },
  {
    path: "setting",
    exact: true,
    name: "Setting",
    component: <Setting />,
  },
  {
    path: "exam",
    exact: true,
    name: "Exam",
    component: <Exam />,
  },
  {
    path: "forgot-password",
    exact: true,
    name: "ForgotPassword",
    component: <ForgotPassword />,
  },
  {
    path: "error-404",
    exact: true,
    name: "error404",
    component: <Error404 />,
  },
];

export default routes;
