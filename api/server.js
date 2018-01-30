// @flow

// Server isomorphic rendering
import { FlushableStore, Runtime, LocalResolver } from "fetchy/core";

const store = new FlushableStore();
const runtime = new Runtime({
  store: new FlushableStore(),
  resolver: new LocalResolver(loaders)
});

// Fix this
const loaders = Layout.getLoaders({ url: "/test" }); // { article: { type: 'article', params: {} } }
const query = runtime.query(loaders);
query.waitForRequired().then();
query.waitForDeferred().then(() => {
  React.renderToString(
    <Provider runtime={runtime}>
      <SomeComponent {...loaders} />
    </Provider>
  );
  window.__DATA__ = store.flush();
});

// Server express API
import { createMiddleware } from "fetchy/server";
app.use(createMiddleware(loaders));
