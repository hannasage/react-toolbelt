import { AxiosRequestConfig } from "axios";

import { ConfigParams } from "./Api";
import { Api } from "./Api";

describe("Api", () => {
    test("static members have values", () => {
        expect(Api.accessToken).toBe("test token");
        expect(Api.baseUrl).toBe("/api");
    });
});

describe("generateEndpoint()", () => {
    test("creates valid default endpoint", () => {
        const params: ConfigParams = {
            method: "GET",
            url: "test",
        };
        const testEndpoint: AxiosRequestConfig = Api.generateEndpoint(params);
        expect(testEndpoint.method).toBe("GET");
        expect(testEndpoint.headers).toBe(Api.defaultHeaders);
        expect(testEndpoint.url).toBe(`${Api.baseUrl}/test`);
        expect(testEndpoint.responseType).toBe("json");
    });

    test("creates valid custom config", () => {
        const params: ConfigParams = {
            method: "GET",
            url: "test",
            headers: {
                Test: true,
            },
            responseType: "text",
        };
        const testEndpoint = Api.generateEndpoint(params);
        expect(testEndpoint.method).toBe("GET");
        expect(testEndpoint.headers?.["Test"]).toBe(true);
        expect(testEndpoint.url).toBe(`${Api.baseUrl}/test`);
        expect(testEndpoint.responseType).toBe("text");
    });
});
