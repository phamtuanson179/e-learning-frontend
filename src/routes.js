import React from 'react';
import Home from './pages/Home'
import Course from './pages/Courses'
import SignInBasic from './pages/SignIn';

// const Home = React.lazy(() => import('./pages/Home'))
// const Course = React.lazy(() => import('./pages/Course'))

const routes = [
  { path: '/', exact: true, name: 'Home', component: < Course /> },
  { path: 'home', exact: true, name: 'Home', component: < Course /> },
  { path: 'course', exact: true, name: 'Course', component: <Course /> },
  { path: 'sign-in', exact: true, name: 'Course', component: <SignInBasic /> },




];

export default routes;
