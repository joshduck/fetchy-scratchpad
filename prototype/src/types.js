// @flow

export type RequestDescriptor = {
  type: string,
  params: LoaderParams,
  deferred: boolean
};

export type RequestReference = {
  key: string
};

export type Query = {
  fetch: any => Promise<RequestReference>,
  defer: any => RequestReference
};

export type LoaderParams = {
  [string]: number | string | boolean | LoaderParams
};

export type Loader = (Query, LoaderParams) => Promise<*>;

export type ContainerConfig<T> = {
  getInitialParams?: ({ [string]: any }) => T,
  loaders: {
    [string]: (Query, T) => RequestReference
  }
};
/*
type A = { id: number };
const a: A = { id: 1 };
const b: LoaderParams = a;
*/
