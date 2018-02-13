// @flow
import type { LoaderParams, RequestReference } from "./types";
import Runtime from "./Runtime";

export default class Query {
  constructor(runtime: Runtime) {
    this._runtime = runtime;
    this._required = [];
    this._deferred = [];
  }

  require(name: string, params: LoaderParams): RequestReference {
    console.log("Query.fetch", name, params);
    const ref = this._runtime.getRefForRequest(name, params);
    this._required.push(ref);
    this._deferred.push(ref);
    return ref;
  }

  defer(name: string, params: LoaderParams): RequestReference {
    console.log("Query.defer", name, params);
    const ref = this._runtime.getRefForRequest(name, params);
    this._deferred.push(ref);
    return ref;
  }

  waitForRequired(): Promise<void> {
    console.log("Query.waitForRequired");
    return this._waitFor(this._required);
  }

  waitForDeferred(): Promise<void> {
    console.log("Query.waitForDeferred");
    return this._waitFor(this._deferred);
  }

  _waitFor(refs: Array<RequestReference>, offset: number = 0): Promise<void> {
    console.log("Query.waitFor", refs.slice(offset));
    const length = refs.length;
    return Promise.all(
      refs.slice(offset).map(ref => this._runtime.resolveValueForRef(this, ref))
    ).then(() => {
      if (refs.length !== length) {
        console.log(
          "resolveValueForRefs We gained extra promises! Had",
          length,
          "Now have",
          refs.length
        );
        return this._waitFor(refs, length);
      }
    });
  }
}
