declare module "my-http-client" {
  export interface ProxyConfig {
    protocol: string;
    host: string;
    port: number;
    auth?: {
      username: string;
      password: string;
    };
  }

  export interface RequestConfig {
    url: string;
    method?: string;
    baseURL?: string;
    headers?: Record<string, string>;
    params?: Record<string, any>;
    paramsSerializer?: (params: any) => string;
    data?: any;
    timeout?: number;
    withCredentials?: boolean;
    transformRequest?: Array<
      (data: any, headers: Record<string, string>) => any
    >;
    transformResponse?: Array<(data: any) => any>;
    onUploadProgress?: (event: ProgressEvent) => void;
    onDownloadProgress?: (event: ProgressEvent) => void;
    xsrfCookieName?: string;
    xsrfHeaderName?: string;
    responseType?: "json" | "text" | "blob" | "arraybuffer" | "stream";
    proxy?: ProxyConfig;
    cancelToken?: CancelToken;
    adapter?: "xhr" | "fetch" | "node";
    encryptParams?: boolean;
    encryptData?: boolean;
    makeParamsEncryption?: (params: any) => string;
    makeDataEncryption?: (data: any) => string;
  }

  export interface Response {
    data: any;
    status: number;
    statusText: string;
    headers: Record<string, string>;
    config: RequestConfig;
    request?: any;
  }

  export class CancelToken {
    constructor(executor: (cancel: (message: string) => void) => void);
    static source(): { token: CancelToken; cancel: (message: string) => void };
  }

  export function httpClient(
    url: string,
    config: RequestConfig
  ): Promise<Response>;
  export function addRequestInterceptor(
    interceptor: (config: RequestConfig) => RequestConfig
  ): void;
  export function addResponseInterceptor(
    interceptor: (response: Response) => Response
  ): void;
}
