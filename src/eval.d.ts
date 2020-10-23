import { Tokenize } from './tokenize';
import {
  BooleanExpression,
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
  : '';

type EvalIf<
  P extends Expression,
  T extends Expression,
  E extends Expression,
  R = Eval<P>
> = R extends true ? Eval<T> : Eval<E>;

type Tokens = Tokenize<'(If True 1 2)'>;
type Parsed = ParseSequence<Tokens>;
type Analyzed = AnalyzeSequence<Parsed>;
type Result = Eval<Analyzed[0]>;
