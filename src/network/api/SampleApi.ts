import { Api, ConfigParams, HTTPMethod } from "./Api";

export class SampleObject {
  string = "";
  bool = false;
  num = -1;
}

export class SampleApi extends Api {
  static baseUrl = `sample`;
  static defaultHeaders = {
    "Sample-header": true,
    ...Api.defaultHeaders,
  };

  static getSampleList = () => {
    return SampleApi.generateEndpoint({
      method: "GET" as HTTPMethod,
      url: SampleApi.baseUrl,
    });
  };

  static getSampleItem = (id: number) => {
    return SampleApi.generateEndpoint({
      method: "GET" as HTTPMethod,
      url: `${SampleApi.baseUrl}/${id}`,
    });
  };

  static postSampleItem = (obj: SampleObject) => {
    return SampleApi.generateEndpoint({
      method: "POST",
      url: SampleApi.baseUrl,
      data: obj,
    } as ConfigParams<SampleObject>);
  };
}
