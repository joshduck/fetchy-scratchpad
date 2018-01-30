// @flow

export default class Runtime {
  constructor({ resolver, store }) {
    this._resolver = resolver;
    this._store = store;
  }

  execute(name, params) {
    console.log("executing", name);
    return this._resolver(name, params);
  }
}
