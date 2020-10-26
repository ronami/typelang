import type { Tokenize } from './tokenize';
import type { Parse } from './parse';
import type { EvalAndReturnLast } from './eval';
import type { Cast } from './generalUtils';

type Code = '(Def n 3) (Def g (++ 4)) (Join "Result: " g)';
type Tokens = Tokenize<Code>;
type Parsed = Parse<Tokens>;
type Result = EvalAndReturnLast<{}, Parsed>;

export type Run<I extends string> = Tokenize<I> extends infer T
  ? Parse<Cast<T, Array<any>>> extends infer P
    ? EvalAndReturnLast<{}, Cast<P, Array<any>>>
    : never
  : never;
