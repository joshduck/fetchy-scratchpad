const fetchers = require('./fetchers');
const Query = require('./query');

const query = new Query(fetchers);

const printCache = () => {
  query._fragments.forEach(fragment => {
    console.log(
      '\nRequest',
      fragment.name,
      fragment.deferred ? '(Deferred)' : '',
      '\nFragment',
      fragment
    );
    console.log('Response', JSON.stringify(query._values[fragment.key]));
  });
};

query.fetch('layout', { url: 1 }).then(descriptor => {
  const value = query.getDescriptorValue(descriptor);
  console.log('Layout descriptor:', descriptor);
  console.log('Layout value:', value);

  console.log(
    'Value for for deferred collection: ',
    query.getDescriptorValue(value.collections[0])
  );

  console.log('\n\n\nNow, wait for deferred');
  query.waitForDeferred().then(() => {
    const collection0 = query.getDescriptorValue(value.collections[0]);
    const article0 = query.getDescriptorValue(collection0.articles[0]);
    console.log('Value for for deferred collection: ', collection0);
    console.log('Value for for deferred article: ', article0);

    console.log('\n\n\n');
    printCache();
  });
});
