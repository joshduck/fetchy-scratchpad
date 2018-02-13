// @flow
import React from "react";
import { createContainer } from "../../src";
import Collection from "./Collection";

const Layout = props => {
  const { layout, collections } = props.layout;
  console.log("\n> Rendering layout", props);
  return (
    <div>
      <h1>Layout for path {layout.url}.</h1>
      <ul>
        {collections.map((collection, index) => (
          <li key={index}>
            <Collection runtime={props.runtime} collection={collection} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default createContainer(Layout, {
  getInitialParams: props => ({
    url: props.url,
    page: props.page || 1
  }),
  loaders: {
    layout: (query, { url, page }) => query.require("layout", { url, page })
  }
});
