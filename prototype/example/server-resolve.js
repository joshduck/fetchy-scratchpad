import loaders from './app/loaders';
import { Runtime, Query } from '../src';

const resolveFromLoaders = (query, name, params) => {
  return loaders[name].call(null, query, params);
};

const runtime = new Runtime({
  resolver: resolveFromLoaders
});

const query = new Query(runtime);
const result = query.require('layout', { url: '/a' });

console.log(result);
query.waitForDeferred().then(() => {
  console.log('waitForDeferred');
  console.log(query);
  console.log(runtime.getRecords());
});
