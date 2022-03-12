# React Networking

## The gist
The principles followed in this networking folder aim to provide abstractions of common networking
logic to keep components clean and behavior predictable. While I encourage you to take what you need
and expand on it in your own project as your needs permit, as it's laid out here, you should be able
to copy the `/network`folder into any React project, install the dependencies, and start utilizing them.

## Inventory
- api
  - `Api.ts`: the abstract class extendable to create API interfaces
  - `SampleApi.ts`: an example of an API interface class
- hooks
  - `useEndpoint`: a hook that consumes endpoints from an API interface class and reactively updates the
  response

## Setup
Following these instructions should net you a working API interface and a component that consumes the 
controller and response state of `useEndpoint`.

### Before using
Our core dependency for our networking layer is the promise-based network call manager, `axios`.

```
yarn add axios
```
Additionally, to run tests in your own project, some dependencies are involved. These are already included
in this repository.

```
yarn add -D 
    msw 
    react-router-dom 
    @testing-library/react 
    @testing-library/react-hooks 
    @testing-library/jest-dom
```

# How to configure and extend `Api`

### Configurables

To begin, you can copy over the `/network/api` folder to your project. This supplies you with the abstract
Api class and a sample API interface extending this class. Inside of `Api.ts`, you'll find a few configurable
types:

```typescript
type HTTPMethod = "POST" | "GET" | "PATCH" | "DELETE" // Configure REST methods your API allows
type Endpoint = AxiosRequestConfig // Configure what your Endpoint should look like
type ValidApiObjects = SampleObject | TestObject | OtherObject // Ensures strict return types

/* This defines what data you need to provide to the method that creates an Endpoint */
interface ConfigParams<T = ValidApiObjects> {
  method: HTTPMethod;
  url: string;
  headers?: AxiosRequestHeaders;
  responseType?: ResponseType;
  data?: Partial<T>;
}
```

---

### Parameter base type & extension

Now you can extend this class with the peace of mind that type safety is fairly strict. Once you've
extended the class, you can implement its static `generateEndpoint<P>()` method, where `P` is an interface
type of, or extending, `ConfigParams` as defined above. Here is an example of what it might look like to
extend the parameters to include additional fields:

```typescript
type Version = "v1" | "v2" | "v3rc"
interface NewParams extends ConfigParams<NewItem> {
    cacheCall: boolean,
    apiVersion: Version,
}
```

---

### Customize `generateEndpoint`

Where this really matters is the `generateEndpoint<P>()` function. By overriding it, yet still returning 
`super.generateEndpoint(params)`, we can handle custom logic pertaining to the creation of our endpoints.

```typescript
class NewApi extends Api {
  // Extends generateEndpoint to factor in API versioning
  static generateEndpoint(params: NewParams): Endpoint {
    const config: ConfigParams<NewItem> = {
        url: `${params.apiVersion}/${params.url}?cached=${params.cacheCall}`
    }
    return super.generateEndpoint<ConfigParams<NewItem>>(config)
  }
}
```

> Note: This, additionally, will serve as a universal typecast, eliminating the need to cast each time you
> call the method.

---

### Create an endpoint
The last part of configuring your API interface class is to give it some endpoints. To do this, we'll use our
newly customized `generateEndpoint()` call to create the config for `/api/v2/new`. Keep in mind, our Api abstract
class prepends the `/api` path for us.

```typescript
class NewApi extends Api {
  static baseUrl = "new"
  // Returns list of items from /api/{v}/new?cache=false
  static getNewList = (v: Version) => {
    return SampleApi.generateEndpoint({
      method: "GET",
      url: this.baseUrl,
      cacheCall: false,
      apiVersion: v
      // ...the rest as needed
    })
  }
}
```
