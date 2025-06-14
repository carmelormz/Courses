import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Users from './user/pages/Users';
import Root from './Root';
import UserPlaces from './places/pages/UserPlaces';
import NewPlace from './places/pages/NewPlace';

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
        Component: NewPlace,
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
