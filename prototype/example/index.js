import loaders from "./loaders";
import Layout from "./Layout";
import { Runtime, Store, Query } from "../src";

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
//const query = new Query();
//console.log(Layout.getFragments(query, { url: "/a" }));
