import { Head, Reverse, Tail, Unshift } from './arrayUtils';
import { EatFirstChar, FirstChar, ConcatStrings } from './stringUtils';
import { isNumberCharacter, isLetterCharacter } from './numberUtils';

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
  : C extends ' '
  ? Tokenize<EatFirstChar<I>, R>
  : isNumberCharacter<C> extends true
  ? TokenizeNumber<I, R>
  : C extends '"'
  ? TokenizeString<EatFirstChar<I>, R>
  : isLetterCharacter<C> extends true
  ? TokenizeName<I, R>
  : C;

type TokenizeNumber<
  I extends string,
  R extends Array<string>,
  A extends string = '',
  C extends string = FirstChar<I>
> = isNumberCharacter<C> extends true
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

type TokenizeName<
  I extends string,
  R extends Array<string>,
  A extends string = '',
  C extends string = FirstChar<I>
> = isLetterCharacter<C> extends true
  ? TokenizeName<EatFirstChar<I>, R, ConcatStrings<A, FirstChar<I>>>
  : Tokenize<I, Unshift<R, { type: 'name'; value: A }>>;

type S = Tokenize<'"aaa" 123'>;
