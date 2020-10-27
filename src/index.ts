import type { Tokenize } from './tokenize';
import type { Parse } from './parse';
import type { EvalAndReturnLast } from './eval';
import type { Cast } from './generalUtils';
import type { AnalyzeSequence } from './analyze';

type Code = `
  (Fun Hello (f n) (Join "Hello " f " " n))
  (Hello "John" "Doe")
`;
type Tokens = Tokenize<Code>;
type Parsed = Parse<Tokens>;
type Analyzed = AnalyzeSequence<Parsed>;
type Result = EvalAndReturnLast<{}, Analyzed>;

export type Run<I extends string> = Tokenize<I> extends infer T
  ? Parse<Cast<T, Array<any>>> extends infer P
    ? AnalyzeSequence<Cast<P, Array<any>>> extends infer A
      ? EvalAndReturnLast<{}, Cast<A, Array<any>>>
      : never
    : never
  : never;
