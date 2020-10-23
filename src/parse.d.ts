import { Reverse, Unshift } from './arrayUtils';
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
  ? {
      type: 'NumberLiteral';
      value: V;
    }
  : F extends StringToken<infer V>
  ? {
      type: 'StringLiteral';
      value: V;
    }
  : F extends ParenToken<'('>
  ? {
      type: 'CallExpression';
      name: '(';
      params: [];
    }
  : T;

type R = Parse<Tokenize<'(123)'>>;
