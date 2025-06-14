import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Users from './user/pages/Users';
import Places from './places/pages/Places';

const router = createBrowserRouter([
  {
    path: '/new',
    Component: Places,
  },
  {
    path: '*',
    Component: Users,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
