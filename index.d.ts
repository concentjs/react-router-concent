import { Component, FC, ReactNode } from 'react';
import * as H from 'history';

interface IAnyFn {
  (...args: any): any;
}

export const ROUTER_MODULE: '$$CONCENT_ROUTER';

type CRProps = {
  callUrlChangedOnInit?: boolean,
  connected?: (History: H.History) => void,
};
export class ConnectRouter extends Component<CRProps, {}> {}

type LinkProps = {
  className: string,
  style: { [key: string]: any },
  to: string,
  onClick: (to: string) => void,
};
export const Link: FC<LinkProps> = props => ReactNode;

export declare const history: {
  block: IAnyFn,
  createHref: IAnyFn,
  go: IAnyFn,
  goBack: IAnyFn,
  goForward: IAnyFn,
  listen: IAnyFn,
  push: IAnyFn,
  replace: IAnyFn,
  getRouterHistory: () => H.History
};

export function createHistoryProxy(history: H.History, callUrlChangedOnInit?: boolean): void;

declare type DefaultExport = {
  ROUTER_MODULE: typeof ROUTER_MODULE,
  ConnectRouter: typeof ConnectRouter,
  Link: typeof Link,
  history: typeof history,
  createHistoryProxy,
}

declare let defaultExport: DefaultExport;
export default defaultExport;