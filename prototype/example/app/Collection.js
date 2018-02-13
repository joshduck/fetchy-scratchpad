// @flow
import React from "react";
import { createContainer } from "../../src";

const Collection = props => {
  console.log("\n> Rendering Collection", props);
  return <div />;
};

export default createContainer(Collection, {
  getInitialParams: props => ({ id: "TODO" }),
  loaders: {
    collection: (query, { id }) => query.require("collection", { id })
  }
});
