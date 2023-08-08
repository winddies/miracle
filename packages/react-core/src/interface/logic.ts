import { X6NodeType } from '@miracle/constants';
import { FormSchema } from './form';

export interface IFlowNode {
  id: string;
  data: Record<string, any>;
  shape: string;
  x: number;
  y: number;
  ports: any;
}

export interface IFlowEdge {
  id: string;
  shape: string;
  source: { cell: string; port: string };
  target: { cell: string; port: string };
}

export interface IFlowMeta {
  nodes: IFlowNode[];
  edges: IFlowEdge[];
}

export interface ILogicFlow {
  events?: {
    [name: string]: IFlowMeta;
  };
}

// export interface IActionResult {
//   success: () => void;
//   failed: () => void;

// }

export interface ILogicAction {
  targetOutportId: string;
  do: (...args: any) => any;
}

export interface IOutPort {
  id: string;
  name: string;
  label: string;
}

export interface ILogicMaterial {
  name: string;
  title: string;
  type: X6NodeType;
  action: new () => ILogicAction;
  resourceConfig: {
    [name: string]: any;
  };
  outPorts: IOutPort[];
  propSetFields?: FormSchema;
}
