import { string } from 'prop-types';

export interface UrlParams {
  [key: string]: any;
}

declare const Urls: {
  build<Params>(path: string, params: UrlParams): string;
  images: {
    deadImage: string;
  };
  imgur: {
    postUrl: string;
    postFile: string;
  };
  graphql: {
    base: string;
  };
  malSearch: string;
};

export default Urls;
