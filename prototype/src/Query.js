// @flow
import type { LoaderParams, RequestReference } from "./types";

export default class Query {
  constructor(runtime) {
    this._runtime = runtime;
    this._required = [];
    this._deferred = [];
  }

  require(name: string, params: LoaderParams): RequestReference {
    console.log("Query.fetch", name, params);
    const ref = this._runtime.addRequest(name, params);
    this._required.push(ref);
    this._deferred.push(ref);
    return ref;
  }

  defer(name: string, params: LoaderParams): RequestReference {
    console.log("Query.defer", name, params);
    const ref = this._runtime.addRequest(name, params);
    this._deferred.push(ref);
    return ref;
  }

  waitForRequired(): Promise<undefined> {
    console.log("Query.waitForRequired");
    return this._waitFor(this._required);
  }

  waitForDeferred(): Promise<undefined> {
    console.log("Query.waitForDeferred");
    return this._waitFor(this._deferred);
  }

  _waitFor(refs: Array<RequestReference>, offset = 0): Promise<undefined> {
    console.log("Query.waitFor", refs.slice(offset));
    const length = refs.length;
    return Promise.all(
      refs.slice(offset).map(ref => this._runtime.waitForResult(this, ref))
    ).then(() => {
      if (refs.length !== length) {
        console.log(
          "waitForResults We gained extra promises! Had",
          length,
          "Now have",
          refs.length
        );
        return this._waitFor(refs, length);
      }
    });
  }
}
