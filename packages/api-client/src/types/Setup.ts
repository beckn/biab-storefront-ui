export interface ApiEndpoints {
  search: string
  onSearch: string
}

export interface ApiConfig {
    url: string;
    endpoints: ApiEndpoints
  }

export interface Config {
    api: ApiConfig;
  }
