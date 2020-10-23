import { Tokenize } from './tokenize';
import {
  BooleanExpression,
  CallExpression,
  Expression,
  IfExpression,
  NullExpression,
  NumberExpression,
  PairExpression,
  ParseSequence,
  StringExpression,
  VariableExpression,
} from './parse';
import type { Reverse, Tail, Unshift } from './arrayUtils';
import { AnalyzeSequence } from './analyze';
import { ConcatStrings, Cast } from './stringUtils';

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

type EvalCall<N extends Expression, P extends Array<Expression>> = EvalSequence<
  P
> extends infer G
  ? N extends VariableExpression<'concat'>
    ? ConcatStrings<Cast<G, Array<any>>[0], Cast<G, Array<any>>[1]>
    : N extends VariableExpression<'eq'>
    ? Equals<Cast<G, Array<any>>[0], Cast<G, Array<any>>[1]>
    : N extends VariableExpression<'and'>
    ? And<Cast<G, Array<any>>[0], Cast<G, Array<any>>[1]>
    : N extends VariableExpression<'or'>
    ? Or<Cast<G, Array<any>>[0], Cast<G, Array<any>>[1]>
    : never
  : never;

type EvalSequence<
  //
  E extends Array<any>,
  R extends Array<any> = []
> = E extends [] ? Reverse<R> : EvalSequence<Tail<E>, Unshift<R, Eval<E[0]>>>;

type EvalIf<
  P extends Expression,
  T extends Expression,
  E extends Expression,
  R = Eval<P>
> = R extends false ? Eval<E> : Eval<T>;

type Tokens = Tokenize<'(or True True)'>;
type Parsed = ParseSequence<Tokens>;
type Analyzed = AnalyzeSequence<Parsed>;
type Result = EvalSequence<Analyzed>;
