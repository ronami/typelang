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

export type Tokenize<
  I extends string,
  R extends Array<Token<any>> = []
> = I extends ''
  ? Reverse<R>
  : FirstChar<I> extends ' '
  ? Tokenize<EatFirstChar<I>, R>
  : FirstChar<I> extends '('
  ? Tokenize<
      EatFirstChar<I>,
      Unshift<
        R,
        {
          type: 'paren';
          value: '(';
        }
      >
    >
  : FirstChar<I> extends ')'
  ? Tokenize<
      EatFirstChar<I>,
      Unshift<
        R,
        {
          type: 'paren';
          value: ')';
        }
      >
    >
  : FirstChar<I> extends Numbers
  ? TokenizeNumber<I, R, '', FirstChar<I>>
  : FirstChar<I> extends '"'
  ? TokenizeString<EatFirstChar<I>, R>
  : FirstChar<I> extends Symbols
  ? TokenizeSymbol<I, R, '', FirstChar<I>>
  : [];

type TokenizeNumber<
  I extends string,
  R extends Array<Token<any>>,
  A extends string = '',
  C extends string = FirstChar<I>
> = C extends Numbers
  ? TokenizeNumber<EatFirstChar<I>, R, ConcatStrings<A, C>>
  : Tokenize<I, Unshift<R, { type: 'number'; value: A }>>;

type TokenizeString<
  I extends string,
  R extends Array<Token<any>>,
> = I extends `${infer H}"${infer G}`
  ? Tokenize<G, Unshift<R, { type: 'string'; value: H }>>
  : never

type TokenizeSymbol<
  I extends string,
  R extends Array<Token<any>>,
  A extends string = '',
  C extends string = FirstChar<I>
> = C extends Symbols
  ? TokenizeSymbol<EatFirstChar<I>, R, ConcatStrings<A, C>>
  : Tokenize<I, Unshift<R, { type: 'symbol'; value: A }>>;
