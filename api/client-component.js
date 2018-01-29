// Client HoC

import { createComponent } from "fetchy/client";
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
  getInitialParams: props => ({
    url: props.url,
    page: props.page || 1
  }),
  loaders: {
    layout: (query, { url, page }) => query.fetch("layout", { url, page }),
    header: Headers.getLoader("header")
  }
});

`
createComponent(Component, {
  getInitialParams: (props) => any,
  loaders: {
    [string]: () => SubqueryDescriptor
  }
})

class FetchyProp {
  params: any,
  setParams: (any) => void,
  fetchWithParams: (any) => void,
  forceFetch: () => void
}

class WrapperComponent { 
  getLoader(name) => SubqueryDescriptor,
  getLoaders()
}


Server render:
  Call Component.getLoaders({ url: '/a' });
  Call getInitialProps
  > { url: '/a', page: 1}
  Return object with result of each loader.
  > { layout: ..., header: ... }
  Fetch data.
  Render <Layout {...fetchedData} url="/a" />

Client render:
  <Layout />;
  Call getInitialProps
  > { url: undefined, page: 1}
  Call getLoaders =>
  > { layout: { type: 'layout', params: { url: undefined, page: 1 }}, ...}
  Check whether props are supplied that match loaders.
    If yes, pass props to Component.
    If missing, trigger fetch props.
    If mismatch, warn and trigger props.
  Render Layout component
    <Component fetchy={...} layout={undefined}
`;
