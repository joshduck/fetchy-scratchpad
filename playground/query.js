module.exports = class Query {
  constructor(fetchers) {
    this._fetchers = fetchers;
    this._fragments = [];
    this._values = [];
    this._deferred = [];
  }

  _makeFragment(name, params) {
    const key = this._fragments.length;
    this._fragments[key] = {
      name,
      params,
      key,
      deferred: false
    };
    return this._fragments[key];
  }

  _runFetcher(fragment) {
    const fn = this._fetchers[fragment.name];
    return fn(this, fragment.params).then(value => {
      this._values[fragment.key] = value;
    });
  }

  fetch(name, params) {
    const fragment = this._makeFragment(name, params);

    //console.log('Fetch', name, params);
    return this._runFetcher(fragment).then(() => fragment);
  }

  defer(name, params) {
    //console.log('Defer', name, params);

    const fragment = this._makeFragment(name, params);
    fragment.deferred = true;

    this._deferred.push(this._runFetcher(fragment));
    return fragment;
  }

  waitForDeferred() {
    return Promise.all(this._deferred).then(() => null);
  }

  getDescriptorValue(fragment) {
    return this._values[fragment.key];
  }
};
