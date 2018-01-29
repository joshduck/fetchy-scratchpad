import { createComponent, request } from 'fetchy/client';
class Layout extends Component {
  onClick() {
    const fetchy = this.props.fetchy;
    fetchy.fetchWithParams({
      page: fetchy.params.page + 1,
      url: fetchy.params.url
    });
  }

  render() {
    this.props.layout.collections &&
      this.props.layout.collections.map(collection => {
        <Collection collection={collection} />;
      });
  }
}

createComponent(Layout, {
  getInitialParams: props => ({ url: props.url }),
  requests: {
    layout: ({ url, page }) => request('layout', { url, page }),
    header: () => fetchRequestFor(Header, 'header')
  }
});

// -------

class Collection extends Component {}

createComponent(Collection, {
  getInitialParams: props => props,
  requests: {
    collection: ({ id }) => request('collection', { id })
  }
});
