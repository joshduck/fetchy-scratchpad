// @flow

import { getArticle, getCollection, getLayout } from "./promises";
import type { Query, Loader, LoaderParams } from "../src/types";

const loaders: { [string]: Loader } = {
  article: (query, { id }) => getArticle(id),

  collection: async (query, { id }) => {
    const collection = await getCollection(id);

    // Fetch linked items
    const articles = collection.items.map(id =>
      query.require("article", { id })
    );

    return {
      collection,
      articles
    };
  },

  layout: async (query, { url }) => {
    const layout = await getLayout(url);

    const collections = layout.collections.map((item, i) => {
      if (i === 0) {
        return query.require("collection", item);
      } else {
        return query.defer("collection", item);
      }
    });

    return {
      layout,
      collections
    };
  }
};

export default loaders;
