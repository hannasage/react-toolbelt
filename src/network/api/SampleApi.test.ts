import { SampleApi, SampleObject } from "./SampleApi";

describe("Sample API", () => {
    test("defaults", () => {
        expect(SampleApi.baseUrl).toBe("sample");
        expect(SampleApi.defaultHeaders).toEqual({
            Authorization: `Bearer test token`,
            "Sample-header": true,
        });
    });

    test("getSampleList", () => {
        const endpoint = SampleApi.getSampleList();
        expect(endpoint).toEqual({
            method: "GET",
            url: "/api/sample",
            headers: {
                Authorization: "Bearer test token",
            },
            responseType: "json",
            data: null,
        });
    });

    test("getSampleItem", () => {
        const endpoint = SampleApi.getSampleItem(123);
        expect(endpoint).toEqual({
            method: "GET",
            url: "/api/sample/123",
            headers: {
                Authorization: "Bearer test token",
            },
            responseType: "json",
            data: null,
        });
    });

    test("postSampleItem", () => {
        const obj = new SampleObject("string", true, 1);
        const endpoint = SampleApi.postSampleItem(obj);
        expect(endpoint).toEqual({
            method: "POST",
            url: "/api/sample",
            headers: {
                Authorization: "Bearer test token",
            },
            responseType: "json",
            data: obj,
        });
    });

    test("patchSampleItem", () => {
        const update = {
            bool: false,
        };
        const endpoint = SampleApi.patchSampleItem(123, update);
        expect(endpoint).toEqual({
            method: "PATCH",
            url: "/api/sample/123",
            headers: {
                Authorization: "Bearer test token",
            },
            responseType: "json",
            data: {
                bool: false,
            },
        });
    });

    test("deleteSampleItem", () => {
        const endpoint = SampleApi.deleteSampleItem(123);
        expect(endpoint).toEqual({
            method: "DELETE",
            url: "/api/sample/123",
            headers: {
                Authorization: "Bearer test token",
            },
            responseType: "json",
            data: null,
        });
    });
});
