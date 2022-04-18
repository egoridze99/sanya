export type ArrayElement<T extends ReadonlyArray<unknown>> =
    T extends ReadonlyArray<infer ArrayElement> ? ArrayElement : never;