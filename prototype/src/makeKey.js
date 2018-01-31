// @flow

import type { LoaderParams } from './types';

export default (name: string, params: LoaderParams) =>
  `key-${name}-${JSON.stringify(params)}`;
