import { Component, FC, ReactNode } from 'react';
import * as H from 'history';

interface IAnyFn {
  (...args: any): any;
}

export const ROUTER_MODULE: '$$CONCENT_ROUTER';

type CRProps = {
  callUrlChangedOnInit?: boolean,
  /**
   * 相比 callUrlChangedOnInit，这个是实时的，没有延迟，方便做一些更方便的清理操作动作
   */
  onUrlChange?: (param: any, action: any) => void;
  connected?: (History: H.History) => void,
};
export class ConnectRouter extends Component<CRProps, {}> { }

type LinkProps = {
  className: string,
  style: { [key: string]: any },
  to: string,
  onClick: (to: string) => void,
};

export const Link: FC<LinkProps>;

export declare const history: {
  block: H.History['block'],
  createHref: H.History['createHref'],
  go: H.History['go'],
  goBack: H.History['goBack'],
  goForward: H.History['goForward'],
  listen: H.History['listen'],
  push: H.History['push'],
  replace: H.History['replace'],
  getRouterHistory: () => H.History,
  location: Location,
};

export function createHistoryProxy(history: H.History, callUrlChangedOnInit?: boolean, onUrlChange?: CRProps['onUrlChange']): void;
export function configureRoute(config?: { module?: string, onUrlChanged?: string }): void;
export interface IRouterState<T extends any = any> {
  hash: string,
  key: string,
  pathname: string,
  search: string,
  state: T,
}

export interface IOnUrlChangedCb {
  (param: any, action: H.Action, history: H.History): void;
}

export function getModuleName(): string;

export function getUrlChangedEvName(): string;

export function getLatestCallInfo(): { callByApi: boolean, time: number };


declare type DefaultExport = {
  getModuleName: typeof getModuleName;
  getUrlChangedEvName: typeof getUrlChangedEvName;
  ConnectRouter: typeof ConnectRouter,
  Link: typeof Link,
  history: typeof history,
  createHistoryProxy: typeof createHistoryProxy,
  configureRoute: typeof configureRoute,
  getLatestCallInfo: typeof getLatestCallInfo,
  IRouterState: IRouterState,
  IOnUrlChangedCb: IOnUrlChangedCb,
}

declare let defaultExport: DefaultExport;
export default defaultExport;
