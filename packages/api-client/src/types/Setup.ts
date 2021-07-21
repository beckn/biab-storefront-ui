export interface ApiEndpoints {
  search: string
  onSearch: string
  getQuote: string,
  onGetQuote: string,
  initiatizeOrder: string,
  onInitializeOrder: string,
}

export interface ApiConfig {
    url: string;
    endpoints: ApiEndpoints
  }

export interface Config {
    api: ApiConfig;
  }
