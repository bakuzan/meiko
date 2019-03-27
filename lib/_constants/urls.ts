const standardUrls = {
  build: (path: string, params: object) => {
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
  },
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
};

export default standardUrls;
