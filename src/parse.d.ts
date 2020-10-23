import { Reverse, Tail, Unshift } from './arrayUtils';
import { EatFirstChar, FirstChar, ConcatStrings } from './stringUtils';
import { isNumberCharacter, isLetterCharacter } from './numberUtils';
import {
  Tokenize,
  Token,
  NumberToken,
  StringToken,
  ParenToken,
} from './tokenize';

export type Parse<
  T extends Array<Token<any>>,
  F extends Token<any> = T[0]
> = F extends NumberToken<infer V>
  ? [
      {
        type: 'NumberLiteral';
        value: V;
      },
      Tail<T>,
    ]
  : F extends StringToken<infer V>
  ? [
      {
        type: 'StringLiteral';
        value: V;
      },
      Tail<T>,
    ]
  : F extends ParenToken<'('>
  ? [
      {
        type: 'CallExpression';
        name: '(';
        params: [];
      },
    ]
  : T;

type ParseSequence<
  T extends Array<Token<any>>,
  R extends Array<any> = [],
  P extends Array<any> = Parse<T>
> = T extends [] ? Reverse<R> : ParseSequence<P[1], Unshift<R, P[0]>>;

type R = ParseSequence<Tokenize<'123 456 "hello"'>>;
