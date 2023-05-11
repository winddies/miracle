import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import 'reflect-metadata';
import { routes } from './route';

import './style/index.less';

const app = document.getElementById('app');
// 创建根节点
const root = createRoot(app as HTMLElement);
// 将 app 渲染到 root
root.render(<RouterProvider router={routes} />);
