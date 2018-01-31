// @flow
import React from 'react';

import type { ContainerConfig } from './types';

export default (Component, config: ContainerConfig) => {
  return class ComponentWrapper extends React.Component {
    static getFragments(query, props = {}) {
      const params = config.getInitialParams
        ? config.getInitialParams(props)
        : props;
      console.log('ComponentContainer.getFragments params are', params);

      const loaders = {};
      console.log(config, params);
      for (const key in config.loaders) {
        loaders[key] = config.loaders[key].call(null, query, params);
      }

      return loaders;
    }

    render() {
      console.log('ComponentContainer.render props are', props);

      return <div myprops={JSON.stringify(this.props)}>Wrapper</div>;
    }
  };
};
