// @flow

import Layout from "./app/Layout";
import { Runtime, Query } from "../src";

const resolveFromNetwork = (query, name, params) => {
  console.log("resolveFromNetwork", name);
  return Promise.resolve({ mock: "Mock" });
};

const runtime = new Runtime({ resolver: resolveFromNetwork });
const query = new Query(runtime);

console.log("> Layout.getFragments", Layout.getFragments(query, { url: "/a" }));
console.log("> runtime.getRecords()", runtime.getRecords());

query.waitForRequired().then(() => {
  console.log("> runtime.getRecords()", runtime.getRecords());
});
