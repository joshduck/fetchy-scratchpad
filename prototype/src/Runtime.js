// @flow
import type { LoaderParams, RequestReference } from "./types";

import makeKey from "./makeKey";

export default class Runtime {
  constructor({ resolver }) {
    this._resolver = resolver;
    this._records = {};
  }

  addRequest(name, params): RequestReference {
    const key = makeKey(name, params);

    if (!this._records[key]) {
      this._records[key] = {
        name,
        params,
        resolved: false,
        value: null,
        promise: null
      };
    }

    return { key };
  }

  waitForResult(query, { key }: RequestReference): Promise<*> {
    const record = this._records[key];
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

  getRecords() {
    return this._records;
  }
}
