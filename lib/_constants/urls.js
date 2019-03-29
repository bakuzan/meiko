/**
 * Using the provided path, replace placeholders when params values.
 * @param {string} path Url template
 * @param {object} params Values to use for replacements
 */
function build(path, params) {
  let hasSearch = false;
  for (const k in params) {
    if (params.hasOwnProperty(k)) {
      if (k === 'search') {
        hasSearch = true;
        continue;
      }
      path = path.replace(`:${k}`, params[k]);
    }
  }
  const searchValue = hasSearch ? `?search=${params['search']}` : '';
  return `${path}${searchValue}`;
}

export default Object.freeze({
  build,
  images: {
    deadImage: 'https://i.imgur.com/gKr1YhF.png'
  },
  imgur: {
    postUrl: '/api/image-upload/url',
    postFile: '/api/image-upload/file'
  },
  graphql: {
    base: '/graphql?query='
  },
  malSearch: '/api/mal-search/:type' // TODO remove(?) when MalSearch is rewritten/removed
});
