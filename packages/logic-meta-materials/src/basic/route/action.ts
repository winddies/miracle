import { ILogicAction } from '@miracle/react-core';

// interface IConfig {
//   url: string;
// }

export default class RouteTo implements ILogicAction {
  value: string | null = null;

  targetOutportId = '';
  do() {}
}
