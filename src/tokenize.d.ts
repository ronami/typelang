import type { Reverse, Unshift } from './arrayUtils';
import type { EatFirstChar, FirstChar, ConcatStrings } from './stringUtils';
import type { Numbers, Symbols } from './generalUtils';

export type ParenToken<V> = { type: 'paren'; value: V };
export type NumberToken<V> = { type: 'number'; value: V };
export type StringToken<V> = { type: 'string'; value: V };
export type SymbolToken<V> = { type: 'symbol'; value: V };
export type Token<V> =
  | ParenToken<V>
  | NumberToken<V>
  | StringToken<V>
  | SymbolToken<V>;

type TokenizeInput<I extends string> = FirstChar<I> extends ' '
  ? ['', EatFirstChar<I>]
  : FirstChar<I> extends '('
  ? [
      {
        type: 'paren';
        value: '(';
      },
      EatFirstChar<I>,
    ]
  : FirstChar<I> extends ')'
  ? [
      {
        type: 'paren';
        value: ')';
      },
      EatFirstChar<I>,
    ]
  : FirstChar<I> extends Numbers
  ? TokenizeNumber<I, '', FirstChar<I>>
  : FirstChar<I> extends '"'
  ? TokenizeString<EatFirstChar<I>>
  : FirstChar<I> extends Symbols
  ? TokenizeSymbol<I, '', FirstChar<I>>
  : never;

type TokenizeNumber<
  I extends string,
  A extends string = '',
  C extends string = FirstChar<I>
> = C extends Numbers
  ? TokenizeNumber<EatFirstChar<I>, ConcatStrings<A, C>>
  : [{ type: 'number'; value: A }, I];

type TokenizeString<
  I extends string,
> = I extends `${infer H}"${infer G}`
  ? [{ type: 'string'; value: H }, G]
  : never

type TokenizeSymbol<
  I extends string,
  A extends string = '',
  C extends string = FirstChar<I>
> = C extends Symbols
  ? TokenizeSymbol<EatFirstChar<I>, ConcatStrings<A, C>>
  : [{ type: 'symbol'; value: A }, I];

export type TokenizeSequence<
  I extends string,
  R extends Array<Token<any>> = [],
  P extends [any, string] = TokenizeInput<I>
> = I extends ''
  ? Reverse<R>
  : TokenizeSequence<P[1], P[0] extends '' ? R : Unshift<R, P[0]>>;
