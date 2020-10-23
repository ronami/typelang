export type EatFirstChar<T> =  T extends `${infer _}${infer B}` ? B : '';

export type FirstChar<
  I extends string
> = I extends `${infer T}${EatFirstChar<I>}` ? T : ''

export type ConcatStrings<A extends string, B extends string> = `${A}${B}`;
