// @flow
import React from 'react';
import { createContainer } from '../../src';

const Layout = () => {
  return <div />;
};

export default createContainer(Layout, {
  getInitialParams: props => ({
    url: props.url,
    page: props.page || 1
  }),
  loaders: {
    layout: (query, { url, page }) => query.require('layout', { url, page })
  }
});
