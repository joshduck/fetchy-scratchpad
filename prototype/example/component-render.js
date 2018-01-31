// @flow

import { renderToString } from 'react-dom/server';
import React from 'react';
import { Runtime, Query } from '../src';

import loaders from './app/loaders';
import Layout from './app/Layout';

const resolveFromLoaders = (query, name, params) => {
  return loaders[name].call(null, query, params);
};

const runtime = new Runtime({ resolver: resolveFromLoaders });
const query = new Query(runtime);
const fragments = Layout.getFragments(query, { url: '/a' });

query.waitForRequired().then(() => {
  console.log(renderToString(<Layout {...fragments} />));
});
