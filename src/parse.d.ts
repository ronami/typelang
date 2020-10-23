import { Reverse, Tail, Unshift } from './arrayUtils';
import { EatFirstChar, FirstChar, ConcatStrings, Cast } from './stringUtils';
import { isNumberCharacter, isSymbolCharacter } from './numberUtils';
import {
  Tokenize,
  Token,
  NumberToken,
  StringToken,
  ParenToken,
  SymbolToken,
} from './tokenize';

export type Parse<
  T extends Array<Token<any>>,
  F extends Token<any> = T[0]
> = F extends ParenToken<'('>
  ? ParseList<Tail<T>>
  : F extends SymbolToken<'True'>
  ? [{ type: 'Boolean'; value: true }, Tail<T>]
  : F extends SymbolToken<'False'>
  ? [{ type: 'Boolean'; value: false }, Tail<T>]
  : F extends SymbolToken<'Null'>
  ? [{ type: 'Null'; value: null }, Tail<T>]
  : F extends NumberToken<infer V>
  ? [{ type: 'Number'; value: V }, Tail<T>]
  : F extends StringToken<infer V>
  ? [{ type: 'String'; value: V }, Tail<T>]
  : F extends SymbolToken<infer V>
  ? [{ type: 'Variable'; value: V }, Tail<T>]
  : [{ type: 'Null'; value: null }, []];

type ParseList<
  T extends Array<Token<any>>,
  F extends Token<any> = T[0]
> = T extends []
  ? [{ type: 'Null'; value: null }, []]
  : F extends ParenToken<')'>
  ? [{ type: 'Null'; value: null }, Tail<T>]
  : ParsePair<Parse<T>>;

type ParsePair<
  R1 extends Array<any>
  // R2 extends Array<any> = ParseList<R1[1]>
> = ParseList<R1[1]> extends infer G
  ? [
      { type: 'Pair'; expr1: R1[0]; expr2: Cast<G, Array<any>>[0] },
      Cast<G, Array<any>>[1],
    ]
  : never;

type ParseSequence<
  T extends Array<Token<any>>,
  R extends Array<any> = [],
  P extends Array<any> = Parse<T>
> = T extends [] ? Reverse<R> : ParseSequence<P[1], Unshift<R, P[0]>>;

type R = ParseSequence<Tokenize<'(add 11 22)'>>;
