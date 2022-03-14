import CurCourses from "pages/CurCourses";
import Exam from "pages/Exam";
import ListExams from "pages/ListExams";
import { default as AllCourses } from "./pages/AllCourses";
import Setting from "./pages/Setting";
import SignInBasic from "./pages/SignIn";

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
    path: "list-exams",
    exact: true,
    name: "ListExams",
    component: <ListExams />,
  },
  {
    path: "sign-in",
    exact: true,
    name: "Course",
    component: <SignInBasic />,
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
    // render: (props) => { < Exam  {...props} /> },
    component: < Exam />,
  },
];

export default routes;
