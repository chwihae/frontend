import { createBrowserRouter } from 'react-router-dom';

import Layout from '@components/Layout/Layout';
import Home from '@pages/Home';
import Intro from '@pages/Intro';
import Login from '@pages/Login';
import Mypage from '@pages/Mypage';
import NotFound from '@pages/NotFound';
import QuestionCreate from '@pages/QuestionCreate';
import QuestionEdit from '@pages/QuestionEdit';
import SignUp from '@pages/SignUp';
import Vote from '@pages/Vote';

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Intro />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/question',
        children: [
          { index: true, element: <QuestionCreate /> },
          { path: 'edit/:id', element: <QuestionEdit /> },
        ],
      },
      {
        path: '/vote/:id',
        element: <Vote />,
      },
      {
        path: '/mypage',
        element: <Mypage />,
      },
    ],
  },
]);

export default router;
