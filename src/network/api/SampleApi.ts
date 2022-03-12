import {Api, ConfigParams, HTTPMethod} from "./Api";


export class SampleObject {
  constructor(string: string, bool: boolean, num: number) {
    this.string = string;
    this.bool = bool;
    this.num = num;
  }
  string = "";
  bool = false;
  num = -1;
}

type SampleParams = ConfigParams<SampleObject>

export class SampleApi extends Api {
  static baseUrl = `sample`;
  static defaultHeaders = {
    "Sample-header": true,
    ...Api.defaultHeaders,
  };

  static getSampleList = () => {
    return SampleApi.generateEndpoint<SampleParams>({
      method: "GET" as HTTPMethod,
      url: SampleApi.baseUrl,
    });
  };

  static getSampleItem = (id: number) => {
    return SampleApi.generateEndpoint<SampleParams>({
      method: "GET" as HTTPMethod,
      url: `${SampleApi.baseUrl}/${id}`,
    });
  };

  static postSampleItem = (obj: SampleObject) => {
    return SampleApi.generateEndpoint<SampleParams>({
      method: "POST",
      url: SampleApi.baseUrl,
      data: obj,
    } as ConfigParams<SampleObject>);
  };

  static patchSampleItem = (id: number, update: Partial<SampleObject>) => {
    return SampleApi.generateEndpoint<SampleParams>({
      method: "PATCH",
      url: `${SampleApi.baseUrl}/${id}`,
      data: update,
    });
  };
}
