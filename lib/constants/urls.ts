interface IUrls {
  build: (path: string, params: object) => string;
  images: IImageUrls;
  graphql: {
    base: string;
  };
  imgur: {
    postFile: string;
    postUrl: string;
  };
  malSearch: string;
  sunrise_sunset: string;
}
interface IImageUrls {
  deadImage: string;
}

const standardUrls: IUrls = {
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
  malSearch: '/api/mal-search/:type',
  sunrise_sunset:
    'https://api.sunrise-sunset.org/json?lat=51.9451597&lng=-0.6565607&formatted=0'
};

export default standardUrls;
