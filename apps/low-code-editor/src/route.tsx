import { createBrowserRouter } from 'react-router-dom';
import CanvasRender from './CanvasEditor/SimulatorRender';
import App from './app';
// import CanvasEditor from './CanvasEditor';

export const routes: any = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/editor-render',
    element: <CanvasRender />,
  },
]);

// export default function Router() {
//   return <RouterProvider router={router} />;
// }
