// @flow
import React from "react";

import { ContainerConfig } from "./types";

export default (Component, config: ContainerConfig) => {
  return class {
    static getFragments(query, props = {}) {
      const params = config.getInitialParams
        ? config.getInitialParams(props)
        : props;

      const loaders = {};
      console.log(config, params);
      for (const key in config.loaders) {
        loaders[key] = config.loaders[key].call(null, query, params);
      }

      return loaders;
    }
  };
};
