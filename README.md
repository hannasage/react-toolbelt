# Kevin's React Toolbelt

This repository houses a collection of _Reactive_ tools I've developed over time. React uses hooks
to let engineers tap into the underlying functions of the library like state and memoization.
A truly reactive tool is one that taps into these features to create a seamless implementation!

I encourage you to peruse the repo, whether on GitHub or your local machine, and take what you want,
use it, iterate on it, perfect it in your eyes. These are not "final products", there is no strict
release schedule, there is no need to install a package to use one tool, nor is there a lock-in to one 
method of solving your problem; use one piece, or the whole puzzle.

# Tools

### Coming soon:
- `usePaginator`: a hook that supplies state and functions for paging through a cursor-based paginated
api
- `ControllerContext`: a context template that is set up to handle cgi parameters as state, and consumes
the `useEndpoint` hook to update API responses as variables change; this is great for hooking up a filter
selection component with a results display.

### Npm Packages:
- [react-networking](/src/network): a some-config-required solution to the pain of API calls in React! It uses a 

---

##### Samples
- [SampleApi](/src/network/_sample/SampleApi.ts) shows off what an `Api` class might look like in your application
- [NetworkDemo](/src/network/_demo/NetworkDemo.tsx) implements the `useEndpoint` hook inside a functional component
