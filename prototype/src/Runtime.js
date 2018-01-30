// @flow

import makeKey from "./makeKey";

export default class Runtime {
  constructor({ resolver, store }) {
    this._resolver = resolver;
    this._store = store;
  }

  getReference(name, params, required) {
    const key = makeKey(name, params);

    if (!this._store[key]) {
      this._store[key] = {
        name,
        params,
        required,
        resolved: false,
        value: null,
        promise: null
      };
    }

    this._store[key].required = this._store[key].required || required;

    return { key };
  }

  waitForResult(query, { key }) {
    const record = this._store[key];
    console.log("Runtime.waitForResult", record);
    if (!record.promise) {
      console.log("Runtime.waitForResult: Having to resolve", key);
      record.promise = this._resolver(query, record.name, record.params).then(
        value => {
          console.log("Runtime.waitForResult: Resolved", key, value);
          record.resolved = true;
          record.value = value;
          return value;
        }
      );
    }
    return record.promise;
  }
}
