import type { Tokenize } from './tokenize';
import type { ParseSequence } from './parse';
import type { AnalyzeSequence } from './analyze';
import type { EvalAndReturnLast } from './eval';
import type { Cast } from './stringUtils';

type Tokens = Tokenize<'(If 1 "yes" "no")'>;
type Parsed = ParseSequence<Tokens>;
type Analyzed = AnalyzeSequence<Parsed>;
type Result = EvalAndReturnLast<Analyzed>;

export type Run<I extends string> = Tokenize<I> extends infer T
  ? ParseSequence<Cast<T, Array<any>>> extends infer P
    ? AnalyzeSequence<Cast<P, Array<any>>> extends infer A
      ? EvalAndReturnLast<Cast<A, Array<any>>>
      : never
    : never
  : never;
