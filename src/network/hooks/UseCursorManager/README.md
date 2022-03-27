# `useCursorManager`

This hook is pretty simple, but very useful for building out a React-ive network layer. 
When plugged into a reactive network call, this cursor manager will trigger an update 
when `controller.goTo()` is called. This is how you select your cursor from the cursor map.

```typescript
interface ICursorValues {
    cursor: string;
    cursors: CursorMap;
    currentIndex: number;
    hasPrev: boolean;
    hasNext: boolean;
}

interface ICursorController {
    addNextCursor: (val: string) => void;
    goTo: (i: number) => void;
}
```

Admittedly, I tried to leave it as unopinionated as possible, providing both a 
controller and all the internal values for a wide variety of consumption methods. 
My favorite pattern is to use this as a part of a `Context` that manages your API call, 
whatever query/filter state values needed, and the cursor. When a response is received, 
you can call `controller.addNextCursor` to provide the next cursor in your map. The hook
detects duplicates and will not add the cursor if it already exists.

```typescript
const TestContext = createContext<ITestContext>(/* initial value */)

const TestProvider = (props: PropsWithChildren) => {
    const { values, controller } = useCursorManager()
    // ... 
    useEffect(() => {
        // ...
        controller.addNextCursor(res.nextCursor)
    })
    
    const payload = { 
        paginator: controller,
        // ...
    }
    return (
        <TestContext.Provider value={payload}>
            {children}
        </TestContext.Provider>
    )
}
```

In the above example, the `TestProvider` will consume the values as needed, 
but pass on the controller so a child component containing pagination buttons 
can control the paginator for the context. Then, other components suited to render 
this data can consume the return value from the context and one will react to the other. 