import { Head, Reverse, Tail, Unshift } from './arrayUtils';
import { EatFirstChar, FirstChar, ConcatStrings } from './stringUtils';
import { isNumberCharacter } from './numberUtils';

type Tokenize<
  I extends string,
  R extends Array<any> = [],
  C extends string = FirstChar<I>
> = I extends ''
  ? Reverse<R>
  : C extends '('
  ? Tokenize<EatFirstChar<I>, Unshift<R, C>>
  : C extends ')'
  ? Tokenize<EatFirstChar<I>, Unshift<R, C>>
  : isNumberCharacter<C> extends true
  ? TokenizeNumber<I, R>
  : 'error';

type TokenizeNumber<
  I extends string,
  R extends Array<any>,
  A extends string = '',
  C extends string = FirstChar<I>
> = I extends ''
  ? Reverse<Unshift<R, A>>
  : isNumberCharacter<C> extends true
  ? TokenizeNumber<EatFirstChar<I>, R, ConcatStrings<A, FirstChar<I>>>
  : Tokenize<I, Unshift<R, A>>;

type S = Tokenize<'(1)'>;
