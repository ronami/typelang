import { Tokenize } from './tokenize';
import {
  BooleanExpression,
  Expression,
  NullExpression,
  NumberExpression,
  PairExpression,
  ParseSequence,
  StringExpression,
  VariableExpression,
} from './parse';
import type { Reverse, Tail, Unshift } from './arrayUtils';
import { AnalyzeSequence } from './analyze';

// type Parse<I extends string> = Tokenize<I>;

type Eval<E extends Expression> = E extends NullExpression
  ? null
  : E extends BooleanExpression<infer V>
  ? V
  : E extends NumberExpression<infer V>
  ? V
  : E extends StringExpression<infer V>
  ? V
  : '';

type Tokens = Tokenize<'"hello"'>;
type Parsed = ParseSequence<Tokens>;
type Analyzed = AnalyzeSequence<Parsed>;
type Result = Eval<Analyzed[0]>;
