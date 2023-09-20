import { createBrowserRouter } from 'react-router-dom';

import Layout from '@components/Layout/Layout';
import PrivateLayout from '@components/Layout/PrivateLayout';
import PublicLayout from '@components/Layout/PublicLayout';
import Home from '@pages/Home';
import Intro from '@pages/Intro';
import Login from '@pages/Login';
import Mypage from '@pages/Mypage';
import NotFound from '@pages/NotFound';
import QuestionCreate from '@pages/QuestionCreate';
import QuestionEdit from '@pages/QuestionEdit';
import Vote from '@pages/Vote';

const router = createBrowserRouter([
  {
    element: <Layout />, // 공통 레이아웃 적용
    errorElement: <NotFound />,
    children: [
      {
        element: <PublicLayout />, // 공개 페이지에 레이아웃 적용
        children: [
          {
            path: '/intro',
            element: <Intro />,
          },
          {
            path: '/login',
            element: <Login />,
          },
        ],
      },
      {
        element: <PrivateLayout />, // 비공개 페이지에 레이아웃 적용
        children: [
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
    ],
  },
]);

export default router;
