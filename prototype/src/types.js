// @flow

export type SubqueryDescriptor = {
  type: string,
  params: LoaderParams,
  deferred: boolean,
  key: string
};

export type Query = {
  fetch: any => Promise<SubqueryDescriptor>,
  defer: any => SubqueryDescriptor
};

export type LoaderParams = {
  [string]: number | string | boolean | LoaderParams
};

export type Loader = (Query, LoaderParams) => Promise<*>;

/*
type A = { id: number };
const a: A = { id: 1 };
const b: LoaderParams = a;
*/
