import {SampleApi, SampleObject} from "./SampleApi";

describe("Sample API", () => {

  test("defaults", () => {
    expect(SampleApi.baseUrl).toBe("sample");
    expect(SampleApi.defaultHeaders).toEqual({
      "Authorization": `Bearer test token`,
      "Sample-header": true,
    });
  });

  test("getSampleList", () => {
    const endpoint = SampleApi.getSampleList()
    expect(endpoint).toEqual({
      method: "GET",
      url: "/api/sample",
      headers: {
        "Authorization": "Bearer test token"
      },
      responseType: "json",
      data: null,
    })
  })

});


