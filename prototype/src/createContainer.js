// @flow
import React from "react";

import type { ContainerConfig, RequestReference } from "./types";

const referencesMatch = (a: ?RequestReference, b: ?RequestReference) => {
  return a && b && a.key === b.key;
};

export default (Component, config: ContainerConfig) => {
  return class ComponentWrapper extends React.Component {
    static getFragments(query, props = {}) {
      const params = config.getInitialParams
        ? config.getInitialParams(props)
        : props;
      console.log("ComponentContainer.getFragments");

      const loaders = {};
      for (const prop in config.loaders) {
        loaders[prop] = config.loaders[prop].call(null, query, params);
      }

      return loaders;
    }

    hasLoader(name) {
      return Object.hasOwnProperty.call(config.loaders, name);
    }

    getValuesForRefs(props) {
      console.log("ComponentContainer.getValuesForRefs");
      const values = {};

      for (const name in props) {
        if (this.hasLoader(name)) {
          const ref = props[name];
          values[name] = this.props.runtime.getValueForRef(props[name]);
        }
      }

      console.log(values);
      return values;
    }

    /*
    updateSubscriptionsForRefs(props) {
      console.log("ComponentContainer.updateSubscriptionsForRefs");
      const { values } = this.state;

      for (const name in props) {
        if (this.hasLoader(name)) {
          const ref = props[name];
          console.log("ComponentContainer.getDataForProps ", name);
          if (!referencesMatch(this._refs[name], ref)) {
            console.log("Need to update", name);
            console.log(this.props.runtime.getValueForRef(props[name]));
            // We no longer have a valid value
            values[name] = undefined;
            this.subscribeToRef(name, ref);
          }
        }
      }

      this.setState({ values });
    }

    unsubscribeFromRef(name) {
      if (this._refs[name]) {
        console.log("remove subscription for", name);
      }
    }

    subscribeToRef(name, ref) {
      console.log(this.props.runtime);
      this.unsubscribeFromRef(name);
      console.log("create subscription for", name, ref);
    }

    updateValueForRef(name, ref) {
      // Check ref is still valid for prop.
      // Go to store
      // Sync get value for ref
      const { values } = this.state;
      this.setState({ values });
    }
    */

    constructor(props) {
      super(props);
      this.state = { values: this.getValuesForRefs(props) };
      this._refs = {};
      // this.updateSubscriptionsForRefs(props);
    }

    componentWillMount() {
      console.log("ComponentContainer.componentWillMount", arguments);
      // this.updateSubscriptionsForRefs(this.props);
    }

    componentDidUpdate() {
      // console.log("ComponentContainer.componentWillReceiveProps", arguments);
    }

    render() {
      console.log(
        "ComponentContainer.render props are",
        this.props,
        this.state
      );
      return <Component {...this.props} {...this.state.values} />;
    }
  };
};
