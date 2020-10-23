import { Head, Reverse, Tail, Unshift } from './arrayUtils';
import { EatFirstChar, FirstChar, ConcatStrings } from './stringUtils';
import { isNumberCharacter, isSymbolCharacter } from './numberUtils';

type Tokenize<
  I extends string,
  R extends Array<any> = [],
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
  : isNumberCharacter<C> extends true
  ? TokenizeNumber<I, R>
  : C extends '"'
  ? TokenizeString<EatFirstChar<I>, R>
  : C;

type TokenizeNumber<
  I extends string,
  R extends Array<string>,
  A extends string = '',
  C extends string = FirstChar<I>
> = I extends ''
  ? Reverse<Unshift<R, A>>
  : isNumberCharacter<C> extends true
  ? TokenizeNumber<EatFirstChar<I>, R, ConcatStrings<A, FirstChar<I>>>
  : Tokenize<I, Unshift<R, { type: 'number'; value: A }>>;

type TokenizeString<
  I extends string,
  R extends Array<string>,
  A extends string = '',
  C extends string = FirstChar<I>
> = C extends '"'
  ? Tokenize<EatFirstChar<I>, Unshift<R, { type: 'string'; value: A }>>
  : TokenizeString<EatFirstChar<I>, R, ConcatStrings<A, FirstChar<I>>>;

type S = Tokenize<'("abc")'>;
