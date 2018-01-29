// @flow

const promiseValue = value => {
  return new Promise((res, err) => {
    setTimeout(() => res(value), Math.random() * 1000);
  });
};

export const getArticle = (id: number) =>
  promiseValue({ id, title: "Article" });

export const getRecommendations = (id: number) =>
  promiseValue({ id, title: "Recommendations" });

export const getLayout = (url: string) =>
  promiseValue({ url, collections: [1, 3, 4] });

export const getCollection = (id: number) =>
  promiseValue({ id, title: "Collection", items: [1, 2, 3, 4] });
