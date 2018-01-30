// @flow
import { LoaderParams, RequestReference } from "./types";

export default class Query {
  fetch(name: string, params: LoaderParams): Promise<RequestReference> {
    console.log("fetch", name, params);
  }

  defer(name: string, params: LoaderParams): RequestReference {
    console.log("fetch", name, params);
  }
}
