import { AxiosRequestConfig } from "axios";

import { Api, ApiConfig, EndpointConfig } from "./Api";

const config = new ApiConfig({
    basePath: "http://testhost:420/api",
    headers: {
        Authorization: "Bearer [token]",
    },
});
class TestApi extends Api {
    /* Get array of test data */
    getTestList() {
        super.configure<string[]>({
            method: "GET",
            url: "test",
        });
    }
}
const testApi = new TestApi(config, "test");

describe("ApiConfig", () => {
    test("Constructor assigns properties", () => {
        expect(config.root).toEqual("http://testhost:420/api");
        expect(config.headers).toEqual({
            Authorization: "Bearer [token]",
        });
    });
});

describe("Api", () => {
    test("Constructor assigns properties", () => {
        expect(testApi.config.root).toEqual(config.root);
        expect(testApi.config.headers).toEqual(config.headers);
    });
});
