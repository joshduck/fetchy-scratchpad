// @flow

import { getArticle, getCollection, getLayout } from "./promises";
import type { Query, Loader, LoaderParams } from "../src/types";

const loaders: { [string]: Loader } = {
  article: (query, { id }) => getArticle(id),

  collection: async (query, { id }) => {
    const collection = await getCollection(id);

    // Fetch linked items
    const articles = await Promise.all(
      collection.items.map(id => query.fetch("article", { id }))
    );

    return {
      collection,
      articles
    };
  },

  layout: async (query, { url }) => {
    const layout = await getLayout(url);

    // Fetch deferred items
    const collections = layout.collections.map(item =>
      query.defer("collection", item)
    );

    return {
      layout,
      collections
    };
  }
};

export default loaders;
