export type Tail<T extends Array<any>> = ((...t: T) => void) extends (
  h: any,
  ...rest: infer R
) => void
  ? R
  : never;

export type Unshift<T extends Array<any>, E> = ((
  h: E,
  ...t: T
) => void) extends (...t: infer R) => void
  ? R
  : never;

export type Head<T extends Array<any>> = T extends [any, ...Array<any>]
  ? T['0']
  : never;

export type Reverse<T extends Array<any>, R extends Array<any> = []> = {
  finish: R;
  next: Reverse<Tail<T>, Unshift<R, Head<T>>>;
}[T extends [] ? 'finish' : 'next'];
