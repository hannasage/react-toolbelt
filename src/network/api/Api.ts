import { AxiosRequestConfig, AxiosRequestHeaders, ResponseType } from "axios";

import { SampleObject } from "./SampleApi";

/* Type alias for CRUD ops */
export type HTTPMethod = "POST" | "GET" | "PATCH" | "DELETE";
export type Endpoint = AxiosRequestConfig;

/* Type alias containing a list of objects allowed to be returned
 * by the API */
export type ValidApiObjects = SampleObject;

/* Shape of params used to configure an API endpoint */
export interface ConfigParams<T = ValidApiObjects> {
  method: HTTPMethod;
  url: string;
  headers?: AxiosRequestHeaders;
  responseType?: ResponseType;
  data?: Partial<T>;
}

export abstract class Api {
  static accessToken = "test token"; // Implement a getter here!
  static baseUrl = "/api"; // Define your base Api path here!

  /* If you want to define your own headers in your new Api, be
   * sure to destructure the defaults, so you don't have to duplicate
   * any of them. */
  static defaultHeaders: AxiosRequestHeaders = {
    Authorization: `Bearer ${this.accessToken}`,
  };

  /* Handles creating the configurations for endpoints */
  private static makeConfig = (params: ConfigParams): AxiosRequestConfig => {
    return {
      method: params.method,
      url: `${this.baseUrl}/${params.url}`,
      headers: params.headers || this.defaultHeaders,
      responseType: params.responseType || "json",
      data: params.data || null,
    };
  };

  /* Public function to generate endpoints. This proxy allows for expansion
   * and logic gates if you want to get fancy. */
  static generateEndpoint(params: ConfigParams): Endpoint {
    return this.makeConfig(params);
  }
}
