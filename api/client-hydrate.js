// Client store and provider

import { Provider, Store } from "fetchy/client";
const client = Store();
client.hydrate(window.__DATA__);

<Provider store={client}>
  <Something />
</Provider>;
