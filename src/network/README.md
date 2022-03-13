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

class Api {
    static baseUrl = "/api" // Your api's base path
    static defaultHeaders = { /* ... */ } // Headers you'll always need
}
```

---

### Parameter base type & extension

Now you can extend this class with the peace of mind that type safety is fairly strict. Once you've
extended the class, you can implement its static `generateEndpoint<P>()` method, where `P` is an interface
type of, or extending, `ConfigParams` as defined above. Here is an example of what it might look like to
extend the parameters to include additional fields for a cursor-based pagination config:

```typescript
type PageSize = 10 | 25 | 50 
interface NewParams extends ConfigParams<NewItem | NewItem[]> {
  cursor: Date,
  pageSize: PageSize,
}
```

---

### Customize `generateEndpoint`

The `Api` class has a method that builds your config for you. By creating a proxy for it,  we can handle 
custom logic pertaining to the creation of our endpoints prior to calling `super.generateEndpoint()`.

```typescript
class NewApi extends Api {
  // Extends generateEndpoint to factor in API versioning
  static generatePaginationEndpoint(params: NewParams): Endpoint {
    const config: ConfigParams<NewItem[]> = {
        method: params.method,
        url: `/${params.url}?cursor=${params.cursor.toISOString()}&pagesize=${params.pageSize}`
    }
    return super.generateEndpoint<ConfigParams<NewItem[]>>(config)
  }
}
```

> Note: This, additionally, will serve as a universal typecast, eliminating the need to cast each time you
> call the method.

---

### Create an endpoint
The last part of configuring your API interface class is to give it some endpoints. To do this, we'll use our
newly customized `generateVersionedEndpoint()` call to create the config for `/api/new`. Keep in mind, our Api abstract
class prepends the `/api` path for us.

```typescript
class NewApi extends Api {
  static baseUrl = "new"
  // Returns list of items from /api/{v}/new?cache=false
  static getNewList = (cursor?: Date, pageSize?: PageSize) => {
    return SampleApi.generateVersionedEndpoint({
      method: "GET",
      url: this.baseUrl,
      cursor: cursor || new Date(),
      pageSize: pageSize || 10
      // ...the rest as needed
    })
  }
}
```

---

# The `useEndpoint` hook

For your components and contexts to actually get data from these endpoints, you're going to have to implement
the `useEndpoint` hook! This hook takes an endpoint configuration, provides both a controller
and a state object with response data, and lets the context or component handle when it wants to call.

### Implementation 

Inside a functional component, import the hook and pass in an endpoint configuration:

```typescript
import {useEndpoint} from "./UseEndpoint";
const {call, resposne} = useEndpoint<NewItem[]>(NewApi.getNewList())
```

The reason you provide the hook with a type is so our responses are type-safe. Also, since the API interfaces handle all the
configuration logic, our component doesn't have to do any origami with state values to pack them into
an object and send them off, just in time to call `.then()` and handle the response, packing it into
another piece of state. Instead, what you get is a one-liner with a stateful response.

In some cases, you _will_ need an API endpoint to take in some state from the component. Here's what that
could look like:

```typescript
const [pageSize, setPageSize] = useState<number>(15)
const {call, resposne} = useEndpoint<NewItem[]>(NewApi.getNewList(pageSize))
```

Let's pretend we need to pass a pageSize state into our endpoint for pagination reasons.
Here's where the beauty of the `useEndpoint` hook shines! It will detect when the state of the endpoint
has changed, and set its `call()` function to the correct method. From there, our component can create
an effect for when that state changes (i.e. when a user updates their pageSize state), the effect will
run `call()` and your data will update!

```typescript
const [pageSize, setPageSize] = useState<number>(15)
const [cursor, setCursor] = useState<Date>(new Date())
const {call, resposne} = useEndpoint<NewItem[]>(NewApi.getNewList(cursor, pageSize))

useEffect(() => {
    call()
}, [pageSize, cursor])
```

And just like that, your component is utilizing your API. 
