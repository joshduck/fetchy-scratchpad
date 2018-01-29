const promiseValue = value => {
  return new Promise((res, err) => {
    setTimeout(() => res(value), Math.random() * 1000);
  });
};

const getArticle = id => promiseValue({ id, title: 'Article' });
const getRecommendations = id => promiseValue({ id, title: 'Recommendations' });
const getLayout = url => promiseValue({ url, collections: [1, 3, 4] });
const getCollection = id =>
  promiseValue({ id, title: 'Collection', items: [1, 2, 3, 4] });

module.exports = {
  article: (query, { id }) => getArticle(id),

  collection: async (query, { id }) => {
    const collection = await getCollection(id);

    // Fetch linked items
    const articles = await Promise.all(
      collection.items.map(id => query.fetch('article', { id }))
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
      query.defer('collection', item)
    );

    return {
      layout,
      collections
    };
  }
};
