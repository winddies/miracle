import { createBrowserRouter } from 'react-router-dom';
import App from './app';
import CanvasRender from './page/CanvasEditor/SimulatorRender';
import PreviewRender from './page/Preview';
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
