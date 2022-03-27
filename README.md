# Kevin's React Toolbelt

This repository houses a collection of _Reactive_ tools I've developed over time. React uses hooks
to let engineers tap into the underlying functions of the library like state and memoization.
A truly reactive tool is one that taps into these features to create a clean implementation in your
component! This often means setting up a few classes and providing a hook to consume them and
React-ify your logic.

# Tools

### Coming soon:
- `ControllerContext`: a context template that is set up to handle cgi parameters as state, and consumes
the `useEndpoint` hook to update API responses as variables change; this is great for hooking up a filter
selection component with a results display.

### Npm Packages:
- [react-networking](/src/network): a some-config-required solution to the pain of API calls in React! It
provides helper classes and a hook that make network interfaces a breeze.

---

##### Samples
- [SampleApi](/src/network/_sample/SampleApi.ts) shows off what an `Api` class might look like in your application
- [NetworkDemo](/src/network/_demo/NetworkDemo.tsx) implements the `useEndpoint` hook inside a functional component
