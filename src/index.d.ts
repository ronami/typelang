import { Tokenize } from './tokenize';
import { ParseSequence } from './parse';
import { AnalyzeSequence } from './analyze';
import { EvalSequence } from './eval';
import type { Cast } from './stringUtils';

// type Tokens = Tokenize<'(eq 11 12)'>;
// type Parsed = ParseSequence<Tokens>;
// type Analyzed = AnalyzeSequence<Parsed>;
// type Result = EvalSequence<Analyzed>;

export type Run<I extends string> = Tokenize<I> extends infer T
  ? ParseSequence<Cast<T, Array<any>>> extends infer P
    ? AnalyzeSequence<Cast<P, Array<any>>> extends infer A
      ? EvalSequence<Cast<A, Array<any>>>
      : never
    : never
  : never;
