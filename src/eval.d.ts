import {
  BooleanExpression,
  CallExpression,
  Expression,
  IfExpression,
  NullExpression,
  NumberExpression,
  StringExpression,
  VariableExpression,
} from './parse';
import type { Reverse, Tail, Unshift } from './arrayUtils';
import { ConcatStrings, Cast } from './stringUtils';
import { And, Dec, Equals, Inc, Or } from './builtInFunctions';

type Eval<E extends Expression> = E extends NullExpression
  ? null
  : E extends BooleanExpression<infer V>
  ? V
  : E extends NumberExpression<infer V>
  ? V
  : E extends StringExpression<infer V>
  ? V
  : E extends IfExpression<infer P, infer T, infer E>
  ? EvalIfExpression<P, T, E>
  : E extends CallExpression<infer N, infer P>
  ? EvalCallExpression<N, P>
  : never;

type EvalIfExpression<
  P extends Expression,
  T extends Expression,
  E extends Expression
> = Eval<P> extends false ? Eval<E> : Eval<T>;

type EvalCallExpression<
  N extends Expression,
  P extends Array<Expression>
> = EvalSequence<P> extends infer G
  ? N extends VariableExpression<'Join'>
    ? ConcatStrings<Cast<G, Array<any>>[0], Cast<G, Array<any>>[1]>
    : N extends VariableExpression<'Eq'>
    ? Equals<Cast<G, Array<any>>[0], Cast<G, Array<any>>[1]>
    : N extends VariableExpression<'And'>
    ? And<Cast<G, Array<any>>[0], Cast<G, Array<any>>[1]>
    : N extends VariableExpression<'Or'>
    ? Or<Cast<G, Array<any>>[0], Cast<G, Array<any>>[1]>
    : N extends VariableExpression<'++'>
    ? Inc<Cast<G, Array<any>>[0]>
    : N extends VariableExpression<'--'>
    ? Dec<Cast<G, Array<any>>[0]>
    : never
  : never;

export type EvalSequence<
  E extends Array<any>,
  R extends Array<any> = []
> = E extends [] ? Reverse<R> : EvalSequence<Tail<E>, Unshift<R, Eval<E[0]>>>;

export type EvalAndReturnLast<
  E extends Array<any>,
  R extends any = null
> = E extends [] ? R : EvalAndReturnLast<Tail<E>, Eval<E[0]>>;
