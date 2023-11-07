import { createBrowserRouter } from 'react-router-dom';
import LinkPage from './pages/LinkPage';
import ProfilePage from './pages/ProfilePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LinkPage />
  },
  {
    path: '/profile',
    element: <ProfilePage />
  }
]);
