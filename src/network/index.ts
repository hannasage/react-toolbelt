import {
    ApiConfig,
    Api,
    EndpointConfig,
    ApiConfigProperties,
    HTTPMethod
} from "./api";
import useEndpoint from "./hooks/UseEndpoint/UseEndpoint";

/* Main tools */
export { ApiConfig, Api, useEndpoint };
/* Extendable types */
export type { EndpointConfig, ApiConfigProperties, HTTPMethod };
