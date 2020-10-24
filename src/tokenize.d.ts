import type { Reverse, Unshift } from './arrayUtils';
import type { EatFirstChar, FirstChar, ConcatStrings } from './stringUtils';
import type { isNumberCharacter, isSymbolCharacter } from './generalUtils';

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
  : isNumberCharacter<FirstChar<I>> extends true
  ? TokenizeNumber<I, R, '', FirstChar<I>>
  : FirstChar<I> extends '"'
  ? TokenizeString<EatFirstChar<I>, R>
  : isSymbolCharacter<FirstChar<I>> extends true
  ? TokenizeSymbol<I, R, '', FirstChar<I>>
  : [];

type TokenizeNumber<
  I extends string,
  R extends Array<Token<any>>,
  A extends string = '',
  C extends string = FirstChar<I>
> = isNumberCharacter<C> extends true
  ? TokenizeNumber<EatFirstChar<I>, R, ConcatStrings<A, C>>
  : Tokenize<I, Unshift<R, { type: 'number'; value: A }>>;

type TokenizeString<
  I extends string,
  R extends Array<Token<any>>,
  A extends string = '',
  C extends string = FirstChar<I>,
  E extends string = EatFirstChar<I>
> = C extends '"'
  ? Tokenize<E, Unshift<R, { type: 'string'; value: A }>>
  : TokenizeString<E, R, ConcatStrings<A, C>>;

type TokenizeSymbol<
  I extends string,
  R extends Array<Token<any>>,
  A extends string = '',
  C extends string = FirstChar<I>
> = isSymbolCharacter<C> extends true
  ? TokenizeSymbol<EatFirstChar<I>, R, ConcatStrings<A, C>>
  : Tokenize<I, Unshift<R, { type: 'symbol'; value: A }>>;
