import type { Tokenize } from './tokenize';
import type { Parse } from './parse';
import type { EvalAndReturnLast } from './eval';
import type { Cast } from './generalUtils';
import type { AnalyzeSequence } from './analyze';

// Just an example, hover each step to see its output
type Code = `
  (Def x "Hello")
  (Def y "World")
  (Join x " " y)
`;
// Tokenize
type Tokens = Tokenize<Code>;
// Parse
type Parsed = Parse<Tokens>;
// Analyze
type Analyzed = AnalyzeSequence<Parsed>;
// Final result
type Result = EvalAndReturnLast<{}, Analyzed>;

export type Eval<I extends string> = Tokenize<I> extends infer T
  ? Parse<Cast<T, Array<any>>> extends infer P
    ? AnalyzeSequence<Cast<P, Array<any>>> extends infer A
      ? EvalAndReturnLast<{}, Cast<A, Array<any>>>
      : never
    : never
  : never;
