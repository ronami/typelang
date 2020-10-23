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
import type { Numbers } from './numberUtils';

type Eval<E extends Expression> = E extends NullExpression
  ? null
  : E extends BooleanExpression<infer V>
  ? V
  : E extends NumberExpression<infer V>
  ? V
  : E extends StringExpression<infer V>
  ? V
  : E extends IfExpression<infer P, infer T, infer E>
  ? EvalIf<P, T, E>
  : E extends CallExpression<infer N, infer P>
  ? EvalCall<N, P>
  : '';

type Equals<A, B> = A extends B ? (B extends A ? true : false) : false;

type And<A, B> = A extends true ? (B extends true ? true : false) : false;

type Or<A, B> = A extends true ? true : B extends true ? true : false;

export type Inc<T extends number> = T extends keyof IncTable
  ? IncTable[T]
  : never;

type IncTable = {
  '0': '1';
  '1': '2';
  '2': '3';
  '3': '4';
  '4': '5';
  '5': '6';
  '6': '7';
  '7': '8';
  '8': '9';
  '9': '10';
};

export type Dec<T extends number> = T extends keyof DecTable
  ? DecTable[T]
  : never;

type DecTable = {
  '10': '9';
  '9': '8';
  '8': '7';
  '7': '6';
  '6': '5';
  '5': '4';
  '4': '3';
  '3': '2';
  '2': '1';
  '1': '0';
};

type EvalCall<N extends Expression, P extends Array<Expression>> = EvalSequence<
  P
> extends infer G
  ? N extends VariableExpression<'concat'>
    ? ConcatStrings<Cast<G, Array<any>>[0], Cast<G, Array<any>>[1]>
    : N extends VariableExpression<'='>
    ? Equals<Cast<G, Array<any>>[0], Cast<G, Array<any>>[1]>
    : N extends VariableExpression<'&'>
    ? And<Cast<G, Array<any>>[0], Cast<G, Array<any>>[1]>
    : N extends VariableExpression<'|'>
    ? Or<Cast<G, Array<any>>[0], Cast<G, Array<any>>[1]>
    : N extends VariableExpression<'+'>
    ? Inc<Cast<G, Array<any>>[0]>
    : N extends VariableExpression<'-'>
    ? Dec<Cast<G, Array<any>>[0]>
    : never
  : never;

export type EvalSequence<
  E extends Array<any>,
  R extends Array<any> = []
> = E extends [] ? Reverse<R> : EvalSequence<Tail<E>, Unshift<R, Eval<E[0]>>>;

type EvalIf<
  P extends Expression,
  T extends Expression,
  E extends Expression,
  R = Eval<P>
> = R extends false ? Eval<E> : Eval<T>;
