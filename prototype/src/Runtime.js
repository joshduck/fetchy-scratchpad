// @flow
import type { LoaderParams, RequestReference } from "./types";
import Query from "./Query";
import makeKey from "./makeKey";

export default class Runtime {
  constructor({ resolver }) {
    this._resolver = resolver;
    this._records = {};
  }

  /**
   * Create or lookup a reference for a piece of data we might wish to load.
   */
  getRefForRequest(name: string, params: LoaderParams): RequestReference {
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

  /**
   * Run the loader for a reference, and return a promise for the value.
   */
  resolveValueForRef(query: Query, { key }: RequestReference): Promise<any> {
    const record = this._records[key];
    console.log("Runtime.resolveRef", record);
    if (!record.promise) {
      console.log("Runtime.resolveRef: Having to resolve", key);
      record.promise = this._resolver(query, record.name, record.params).then(
        value => {
          console.log("Runtime.resolveRef: Resolved", key, value);
          record.resolved = true;
          record.value = value;
          return value;
        }
      );
    }
    return record.promise;
  }

  /**
   * Get the current value for a reference.
   */
  getValueForRef({ key }: RequestReference): any {
    const record = this._records[key];
    if (record) {
      return record.value;
    }
  }

  getRecords() {
    return this._records;
  }
}
