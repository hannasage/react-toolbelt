import { act, renderHook } from "@testing-library/react-hooks";

import { sampleServer } from "../MockServer";
import { SampleApi, SampleObject } from "../api/SampleApi";

import { useEndpoint } from "./UseEndpoint";

const obj = new SampleObject("string", true, 123);

describe("useNetwork.ts", () => {
  /* Handles setup, refresh, and closing of mock service worker */
  beforeAll(() => sampleServer.listen());
  afterEach(() => sampleServer.resetHandlers());
  afterAll(() => sampleServer.close());

  test("returns data from get call", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useEndpoint<SampleObject>(SampleApi.getSampleItem(123))
    );
    act(() => result.current.call());
    await waitForNextUpdate();

    expect(result.current.response.loading).toBeFalsy();
    expect(result.current.response.status).toBe(200);
    expect(result.current.response.message).toBe("");
    expect(result.current.response.data).toEqual(obj);
  });

  test("posts data from post call", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useEndpoint<SampleObject>(SampleApi.postSampleItem(obj))
    );
    act(() => result.current.call());
    await waitForNextUpdate();

    expect(result.current.response.loading).toBeFalsy();
    expect(result.current.response.status).toBe(202);
    expect(result.current.response.message).toBe("");
    expect(result.current.response.data).toEqual(obj);
  });

  test("patches data with new values", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useEndpoint<SampleObject>(
        SampleApi.patchSampleItem(123, {
          bool: false,
        })
      )
    );
    act(() => result.current.call());
    await waitForNextUpdate();

    expect(result.current.response.loading).toBeFalsy();
    expect(result.current.response.status).toBe(202);
    expect(result.current.response.message).toBe("");
    expect(result.current.response.data).toEqual({
      string: "string",
      bool: false,
      num: 123,
    });
  });
});
