import loaders from "./loaders";
import Layout from "./Layout";
import { Runtime, Query } from "../src";

const resolveFromLoaders = (query, name, params) => {
  return loaders[name].call(null, query, params);
};

const runtime = new Runtime({
  resolver: resolveFromLoaders
});

const query = new Query(runtime);
const result = query.require("layout", { url: "/a" });

console.log(result);
query.waitForDeferred().then(() => {
  console.log("waitForDeferred");
  console.log(query);
  console.log(runtime.getRecords());
});

/*
const store = new Store();
const query = new Query();
const runtime = new Runtime({
  resolver: (name, params) => {
    const query = new Query();
    return loaders[name].call(null, query, params);
    //return Promise.resolve({ name, params });
  },
  store: store
});

console.log(runtime.execute("layout", { url: "/a" }));
*/
//const query = new Query();
//console.log(Layout.getFragments(query, { url: "/a" }));
