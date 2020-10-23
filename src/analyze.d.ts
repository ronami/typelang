import { Tokenize } from './tokenize';
import {
  BooleanExpression,
  Expression,
  NullExpression,
  NumberExpression,
  PairExpression,
  ParseSequence,
  VariableExpression,
} from './parse';
import type { Reverse, Tail, Unshift } from './arrayUtils';

export type Analyze<E extends Expression> = E extends NullExpression<infer G>
  ? NullExpression<G>
  : E extends NumberExpression<infer G>
  ? NumberExpression<G>
  : E extends BooleanExpression<infer G>
  ? BooleanExpression<G>
  : E extends VariableExpression<infer G>
  ? VariableExpression<G>
  : E extends PairExpression<any, any>
  ? AnalyzePairExpression<E>
  : NullExpression<null>;

type isIfExpression<
  E extends PairExpression<any, any>
> = E extends PairExpression<infer L, infer R>
  ? L extends VariableExpression<infer H>
    ? H extends 'if'
      ? true
      : false
    : false
  : false;

type BuildIfExpression<
  E extends PairExpression<any, any>
> = E extends PairExpression<infer L, infer R>
  ? L extends VariableExpression<infer H>
    ? H extends 'if'
      ? R extends PairExpression<infer L1, infer R1>
        ? R1 extends PairExpression<infer L2, infer R2>
          ? R2 extends PairExpression<infer L3, any>
            ? {
                type: 'If';
                predicate: Analyze<L1>;
                thenClause: Analyze<L2>;
                elseClause: Analyze<L3>;
              }
            : never
          : never
        : never
      : never
    : never
  : never;

type BuildApplicationExpression<
  E extends PairExpression<any, any>
> = E extends PairExpression<infer L, infer R>
  ? {
      type: 'Application';
      operator: Analyze<L>;
      operands: Analyze<R>;
    }
  : never;

type AnalyzePairExpression<E extends PairExpression<any, any>> = isIfExpression<
  E
> extends true
  ? BuildIfExpression<E>
  : BuildApplicationExpression<E>;

type AnalyzeSequence<
  E extends Array<any>,
  R extends Array<any> = []
> = E extends []
  ? Reverse<R>
  : AnalyzeSequence<Tail<E>, Unshift<R, Analyze<E[0]>>>;

type S = AnalyzeSequence<ParseSequence<Tokenize<'(if 1 2 3)'>>>;
