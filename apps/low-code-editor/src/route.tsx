import { createBrowserRouter } from 'react-router-dom';
import CanvasRender from './CanvasEditor/SimulatorRender';
import PreviewRender from './Preview';
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
  {
    path: '/preview/:id',
    element: <PreviewRender />,
  },
]);

// export default function Router() {
//   return <RouterProvider router={router} />;
// }
