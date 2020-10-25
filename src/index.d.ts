import type { Tokenize } from './tokenize';
import type { ParseSequence } from './parse';
import type { EvalAndReturnLast } from './eval';
import type { Cast } from './generalUtils';

type Tokens = Tokenize<'(Def x 1) x'>;
type Parsed = ParseSequence<Tokens>;
type Result = EvalAndReturnLast<{}, Parsed>;

export type Run<I extends string> = Tokenize<I> extends infer T
  ? ParseSequence<Cast<T, Array<any>>> extends infer P
    ? EvalAndReturnLast<{}, Cast<P, Array<any>>>
    : never
  : never;
