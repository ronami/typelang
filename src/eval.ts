import type {
  BooleanExpression,
  CallExpression,
  DefinitionExpression,
  Expression,
  FunctionExpression,
  IfExpression,
  NullExpression,
  NumberExpression,
  StringExpression,
  VariableExpression,
} from './parse';
import type { Reverse, Tail, Unshift } from './arrayUtils';
import type { And, Dec, Equals, Inc, Join, Or } from './builtInFunctions';
import type { Cast } from './generalUtils';

type State = Record<string, any>;

type Eval<S extends State, E extends Expression> = E extends NullExpression
  ? [S, null]
  : E extends BooleanExpression<infer V>
  ? [S, V]
  : E extends NumberExpression<infer V>
  ? [S, V]
  : E extends StringExpression<infer V>
  ? [S, V]
  : E extends IfExpression<infer P, infer T, infer E>
  ? EvalIfExpression<S, P, T, E>
  : E extends VariableExpression<infer V>
  ? EvalVariableExpression<S, V>
  : E extends DefinitionExpression<infer I, infer V>
  ? EvalDefinitionExpression<S, I, V>
  : E extends FunctionExpression<infer I, infer A, infer B>
  ? EvalFunctionExpression<S, I, A, B>
  : E extends CallExpression<infer C, infer A>
  ? EvalCallExpression<S, C, A>
  : never;

type EvalVariableExpression<S extends State, V extends string> = [
  S,
  V extends keyof S ? S[V] : null,
];

type FunctionState<A extends Array<Expression>, B extends Expression> = {
  arguments: A;
  body: B;
};

type EvalFunctionExpression<
  S extends State,
  I extends Expression,
  A extends Array<Expression>,
  B extends Expression
> = I extends VariableExpression<infer N>
  ? [S & { [a in N]: FunctionState<A, B> }, null]
  : never;

type EvalDefinitionExpression<
  S extends State,
  I extends Expression,
  V extends Expression
> = Eval<S, V> extends infer G
  ? I extends VariableExpression<infer N>
    ? [
        Cast<G, Array<any>>[0] & { [a in N]: Cast<G, Array<any>>[1] },
        Cast<G, Array<any>>[1],
      ]
    : never
  : never;

type EvalIfExpression<
  S extends State,
  P extends Expression,
  T extends Expression,
  E extends Expression
> = Eval<S, P> extends infer G
  ? Cast<G, Array<any>>[1] extends false
    ? Eval<Cast<G, Array<any>>[0], E>
    : Eval<Cast<G, Array<any>>[0], T>
  : never;

type EvalCallExpression<
  S extends State,
  C extends Expression,
  A extends Array<Expression>
> = EvalSequence<S, A> extends infer G
  ? C extends VariableExpression<infer N>
    ? N extends 'Join'
      ? [Cast<G, Array<any>>[0], Join<Cast<G, Array<any>>[1]>]
      : N extends 'Eq'
      ? [
          Cast<G, Array<any>>[0],
          Equals<Cast<G, Array<any>>[1][0], Cast<G, Array<any>>[1][1]>,
        ]
      : N extends 'And'
      ? [
          Cast<G, Array<any>>[0],
          And<Cast<G, Array<any>>[1][0], Cast<G, Array<any>>[1][1]>,
        ]
      : N extends 'Or'
      ? [
          Cast<G, Array<any>>[0],
          Or<Cast<G, Array<any>>[1][0], Cast<G, Array<any>>[1][1]>,
        ]
      : N extends '++'
      ? [Cast<G, Array<any>>[0], Inc<Cast<G, Array<any>>[1][0]>]
      : N extends '--'
      ? [Cast<G, Array<any>>[0], Dec<Cast<G, Array<any>>[1][0]>]
      : N extends keyof S
      ? ApplyFunction<S, N, Cast<G, Array<any>>>
      : never
    : never
  : never;

type BuildArgumentsState<
  G extends Array<any>,
  A extends Array<Expression>,
  R extends Record<string, any>
> = A extends []
  ? R
  : A[0] extends VariableExpression<infer V>
  ? BuildArgumentsState<Tail<G>, Tail<A>, R & { [a in V]: G[0] }>
  : never;

type ApplyFunction<
  S extends State,
  N extends string,
  G extends Array<any>
> = S[N] extends FunctionState<infer A, infer B>
  ? Eval<BuildArgumentsState<G[1], A, S>, B> extends infer R
    ? [S, Cast<R, Array<any>>[1]]
    : never
  : never;

export type EvalSequence<
  S extends State,
  E extends Array<any>,
  R extends Array<any> = []
> = E extends []
  ? [S, Reverse<R>]
  : Eval<S, E[0]> extends infer G
  ? EvalSequence<
      Cast<G, Array<any>>[0],
      Tail<E>,
      Unshift<R, Cast<G, Array<any>>[1]>
    >
  : never;

export type EvalAndReturnLast<
  S extends State,
  E extends Array<any>,
  R extends any = null
> = E extends []
  ? R // [R, S]
  : Eval<S, E[0]> extends infer G
  ? EvalAndReturnLast<Cast<G, Array<any>>[0], Tail<E>, Cast<G, Array<any>>[1]>
  : never;
