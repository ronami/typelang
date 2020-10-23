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
  : null;

type AnalyzePairExpression<
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
            : 1
          : 1
        : 2
      : 1
    : 1
  : 1;

type S = Analyze<ParseSequence<Tokenize<'(if 1 2 3)'>>[0]>;
