import { Tokenize } from './tokenize';
import { ParseSequence } from './parse';
import { AnalyzeSequence } from './analyze';
import { EvalAndReturnLast } from './eval';
import type { Cast } from './stringUtils';

type Tokens = Tokenize<'(++ 1) (++ 2)'>;
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
