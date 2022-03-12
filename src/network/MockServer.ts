import { rest } from "msw";
import { setupServer } from "msw/node";

import { SampleApi, SampleObject } from "./api/SampleApi";
import { url } from "./hooks/UseEndpoint";

const obj = new SampleObject("string", true, 123);

const getEndpoint = SampleApi.getSampleItem(123);
const postEndpoint = SampleApi.postSampleItem(obj);
const patchEndpoint = SampleApi.patchSampleItem(123, {
  bool: false,
});

const handlers = [
  rest.get(url(getEndpoint.url), (req, res, ctx) => {
    return res(ctx.json(obj), ctx.status(200));
  }),

  rest.post(url(postEndpoint.url), (req, res, ctx) => {
    return res(ctx.json(postEndpoint.data), ctx.status(202));
  }),

  rest.patch(url(patchEndpoint.url), (req, res, ctx) => {
    const copyObj = new SampleObject("string", patchEndpoint.data.bool, 123);
    return res(ctx.json(copyObj), ctx.status(202));
  }),
];

export const sampleServer = setupServer(...handlers);
