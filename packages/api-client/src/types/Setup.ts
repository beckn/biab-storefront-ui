export interface ApiEndpoints {
  search: string
}

export interface ApiConfig {
    url: string;
    endpoints: ApiEndpoints
  }

export interface Config {
    api: ApiConfig;
  }
