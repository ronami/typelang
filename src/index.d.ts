import type { TokenizeSequence } from './tokenize';
import type { ParseSequence } from './parse';
import type { EvalAndReturnLast } from './eval';
import type { Cast } from './generalUtils';

type Tokens = TokenizeSequence<
  '(Def x "Hello") (Def y "World") (Join x " " y)'
>;
type Parsed = ParseSequence<Tokens>;
type Result = EvalAndReturnLast<{}, Parsed>;

export type Run<I extends string> = TokenizeSequence<I> extends infer T
  ? ParseSequence<Cast<T, Array<any>>> extends infer P
    ? EvalAndReturnLast<{}, Cast<P, Array<any>>>
    : never
  : never;
