export interface ApiEndpoints {
  search: string
  onSearch: string
  getQuote: string,
  onGetQuote: string,
  initializeOrder: string,
  onInitializeOrder: string,
  confirmOrder: string,
  onConfirmOrder: string,
}

export interface ApiConfig {
  url: string;
  endpoints: ApiEndpoints
}

export interface Config {
  api: ApiConfig;
}
