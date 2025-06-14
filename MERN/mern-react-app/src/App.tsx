import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Users from './user/pages/Users';
import Places from './places/pages/Places';
import Root from './Root';
import UserPlaces from './places/pages/UserPlaces';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      {
        index: true,
        Component: Users,
      },
      {
        path: '/places/new',
        Component: Places,
      },
      {
        path: '/:uid/places',
        Component: UserPlaces,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
