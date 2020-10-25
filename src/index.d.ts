import type { TokenizeSequence } from './tokenize';
import type { ParseSequence } from './parse';
import type { EvalAndReturnLast } from './eval';
import type { Cast } from './generalUtils';

type Tokens = TokenizeSequence<
  // Define variable `x` with "Hello"
  // If `true`, join its value with "World" and return the result
  // Otherwise, return "Bye"
  '(Def x "Hello ") (If True (Join x "World!") "Bye!")'
>;
type Parsed = ParseSequence<Tokens>;
type Result = EvalAndReturnLast<{}, Parsed>;

export type Run<I extends string> = TokenizeSequence<I> extends infer T
  ? ParseSequence<Cast<T, Array<any>>> extends infer P
    ? EvalAndReturnLast<{}, Cast<P, Array<any>>>
    : never
  : never;
