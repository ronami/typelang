import { Reverse, Unshift } from './arrayUtils';
import { EatFirstChar, FirstChar, ConcatStrings } from './stringUtils';
import { isNumberCharacter, isSymbolCharacter } from './numberUtils';

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
  R extends Array<Token<any>> = [],
  C extends string = FirstChar<I>
> = I extends ''
  ? Reverse<R>
  : C extends '('
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
  : C extends ')'
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
  : C extends ' '
  ? Tokenize<EatFirstChar<I>, R>
  : isNumberCharacter<C> extends true
  ? TokenizeNumber<I, R>
  : C extends '"'
  ? TokenizeString<EatFirstChar<I>, R>
  : isSymbolCharacter<C> extends true
  ? TokenizeSymbol<I, R>
  : C;

type TokenizeNumber<
  I extends string,
  R extends Array<Token<any>>,
  A extends string = '',
  C extends string = FirstChar<I>
> = isNumberCharacter<C> extends true
  ? TokenizeNumber<EatFirstChar<I>, R, ConcatStrings<A, FirstChar<I>>>
  : Tokenize<I, Unshift<R, { type: 'number'; value: A }>>;

type TokenizeString<
  I extends string,
  R extends Array<Token<any>>,
  A extends string = '',
  C extends string = FirstChar<I>
> = C extends '"'
  ? Tokenize<EatFirstChar<I>, Unshift<R, { type: 'string'; value: A }>>
  : TokenizeString<EatFirstChar<I>, R, ConcatStrings<A, FirstChar<I>>>;

type TokenizeSymbol<
  I extends string,
  R extends Array<Token<any>>,
  A extends string = '',
  C extends string = FirstChar<I>
> = isSymbolCharacter<C> extends true
  ? TokenizeSymbol<EatFirstChar<I>, R, ConcatStrings<A, FirstChar<I>>>
  : Tokenize<I, Unshift<R, { type: 'symbol'; value: A }>>;
