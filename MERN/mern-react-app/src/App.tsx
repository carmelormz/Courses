import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Users from './user/pages/Users';
import Places from './places/pages/Places';
import Root from './Root';

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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
