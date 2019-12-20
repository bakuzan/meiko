declare function fetchFromServer(
  url: string,
  method?: string,
  body?: any
): Promise<any>;

export default fetchFromServer;
