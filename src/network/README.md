# React Networking

## The gist

This library provides abstractions of common networking logic to keep components clean, 
and their behavior predictable. This is done with classes:
- `ApiConfig` can be instantiated to define your base api configuration.
- `Api` can be extended to create an api interface.

Lastly, the consumer hook `useEndpoint` takes in an endpoint from your Api class and produces a
controller and state to be used in a functional component or React context.

# Getting Started

### Install
``` 
yarn add @normellis/react-networking
```

---

### Create your `ApiConfig`

This configuration can be thought of as the bedrock on which your Api interfaces will sit. To create
a new configuration:

```typescript
export const config = new ApiConfig({
  root: "http://localhost:8080/api",
  headers: {
      Authorization: "Bearer [token]"
  }
})
```

---

### Create an `Api` interface class

Once you have your base configuration set up, you will use it to instantiate new Api child classes.
But first,  you must define one. Each Api interface class will contain members that return EndpointConfigs
to be consumed by the `useEndpoint` hook inside a component. Underneath the hood, the `Api` class comes with
a `configure()` method which we will use to generate consistent endpoints.

```typescript
class TestApi extends Api {
  /* Get array of test data */
  getTestList(): EndpointConfig<T> {
    return super.configure<T>({
      method: "GET",
      url: this.basePath,
    });
  }
}

export const testApi = new TestApi(config, "test");
```

> Note: While only `method` and `url` are required, you can utilize any property of the
> `AxiosRequestConfig` type.

---

### Consume your endpoints

Lastly, inside a React component or context, at the base level per React's Hook rules,
you'll import the `useEndpoint` hook and pass in your new api's endpoint.

```typescript
const response = useEndpoint<T>(testApi.getTestList())
```

Your response object looks like this:

```typescript
{
    loading: boolean;
    data: T;
    sattus: number;
    message: string;
}
```

---

# Useful Bits

### Customize `configure` to handle custom logic

The `Api` class has a method that builds your config for you. Overriding it in your Api interface
class allows you to perform any transformative logic needed, such as adding query params to the
url, or dynamically setting headers. 

```typescript
class NewApi extends Api {
  static configure(params: NewParams): EndpointConfig<T> {
    /* Perform transformations and other logic */
    return super.configure<ConfigParams<NewItem[]>>(transformedConfig)
  }
}
```

> Note: This, additionally, can serve as a universal typecast, eliminating the need to cast each time you
> call the method.
