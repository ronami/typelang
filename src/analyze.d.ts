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

export type Analyze<E extends Expression<any>> = E extends NullExpression<
  infer G
>
  ? NullExpression<G>
  : E extends NumberExpression<infer G>
  ? NumberExpression<G>
  : E extends BooleanExpression<infer G>
  ? BooleanExpression<G>
  : E extends VariableExpression<infer G>
  ? VariableExpression<G>
  : E extends PairExpression<any>
  ? AnalyzePairExpression<E>
  : null;

type AnalyzePairExpression<E extends PairExpression<any>> = E['expr1']['type'];

type R = Analyze<ParseSequence<Tokenize<'(add 11 22)'>>[0]>;
