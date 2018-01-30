import {
  Store,
  FlushableStore,
  Runtime,
  LocalResolver,
  NetworkResolver
} from "fetchy-core";

import { createMiddleware } from "fetchy-express";

import {
  Provider, // React store provider
  getLoadersForComponent, // Get requests for React wrapper
  createComponent
} from "fetchy-react";

// Internal classes

// Server query context

class Runtime {
  constructor({ store, resolver })
  run(request) {} // Query
}

class Query {
  fetch() {} // Promise<ResultDescriptor>
  defer() {} // ResultDescriptor
  waitForDeferred() {} // Promise<*>
  waitForRequired() {} // Promise<*>
}

class Store {
  insertRecords(data) {}
  
  setRecord(descriptor)
  getRecord(descriptor)
  hasRecord(descriptor) {} 
  
  getValue(descriptor) {}
  getError(descriptor) {}
  getLoading(descriptor) {}
}

class FlushableStore extends Store {
  flushRecords() {} // Get records that have changed since last flush
}

class LocalResolver {
  constructor(loaders)
  resolve(descriptor)
}

class NetworkResolver {
  constructor(config)
  resolve(descriptor)
}
