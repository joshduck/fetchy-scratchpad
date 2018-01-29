// @flow

// Param - an input to a request
// RequestDescriptor - a pointer to a loader
// Loader - a promise that fetches data
// ResultDescriptor - a pointer to a (possibly pending) result from a loader
//
// Array<Param> => Request => Loader => Descriptor
//
//
//

//
//
// Server query context
//
//

class Query {
  fetch() {} // Promise<ResultDescriptor>
  defer() {} // ResultDescriptor
  waitForDeferred() {} // Promise<*>
  waitForRequired() {} // Promise<*>
  getStore() {}
}

class Store {
  serialize() {}
  hydrate(data) {}
  getValue(descriptor) {}
  getError(descriptor) {}
  getLoading(descriptor) {}

  // Maybe?
  findDescriptor(name, params) {}
  createDescriptor(name, params) {}
}

//
//
// Server isomorphic rendering
//
//
import { getRequests, createQuery } from 'fetchy/server';
const requests = getRequests(Layout, { url: '/test' }); // { article: { type: 'article', params: {} } }

const query = createQuery(loaders, requests, { deferred: false });
query.waitForRequired().then();
query.waitForDeferred().then(() => {
  React.renderToString(
    <Provider store={query.getStore()}>
      <SomeComponent />
    </Provider>
  );
  window.__DATA__ = query.getStore().serialize();
});

//
//
// Server express API
//
//
import { createMiddleware } from 'fetchy/server';
app.use(createMiddleware(loaders));

//
//
// Client HoC
//
//
import { createComponent, request } from 'fetchy/client';
class Layout extends Component {
  onClick() {
    const fetchy = this.props.fetchy;
    fetchy.fetchWithParams({
      page: fetchy.params.page + 1,
      url: fetchy.params.url
    });
  }
}

createComponent(Layout, {
  getInitialParams: props => ({ url: props.url }),
  requests: {
    layout: ({ url, page = 1 }) => request('layout', { url, page }),
    header: () => request('header')
  }
});

//
//
// Client store and provider
//
//
import { Provider, Store } from 'fetchy/client';
const client = Store();
client.hydrate(window.__DATA__);

<Provider store={client}>
  <Something />
</Provider>;
