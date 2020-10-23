import { Reverse, Tail, Unshift } from './arrayUtils';
import { EatFirstChar, FirstChar, ConcatStrings, Cast } from './stringUtils';
import { isNumberCharacter, isSymbolCharacter, Numbers } from './numberUtils';
import {
  Tokenize,
  Token,
  NumberToken,
  StringToken,
  ParenToken,
  SymbolToken,
} from './tokenize';

export type BooleanExpression<V> = {
  type: 'Boolean';
  value: V;
};

export type NullExpression = {
  type: 'Null';
};

export type NumberExpression<V> = {
  type: 'Number';
  value: V;
};

export type StringExpression<V> = {
  type: 'String';
  value: V;
};

export type VariableExpression<V> = {
  type: 'Variable';
  value: V;
};

export type PairExpression<E1 extends Expression, E2 extends Expression> = {
  type: 'Pair';
  expr1: E1;
  expr2: E2;
};

export type IfExpression<
  P extends Expression,
  T extends Expression,
  E extends Expression
> = {
  type: 'If';
  predicate: P;
  thenClause: T;
  elseClause: E;
};

export type Expression =
  | BooleanExpression<any>
  | NullExpression
  | NumberExpression<any>
  | StringExpression<any>
  | VariableExpression<any>
  | PairExpression<any, any>
  | IfExpression<any, any, any>;

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

type ParsePair<R1 extends Array<any>> = ParseList<R1[1]> extends infer G
  ? [
      { type: 'Pair'; expr1: R1[0]; expr2: Cast<G, Array<any>>[0] },
      Cast<G, Array<any>>[1],
    ]
  : never;

export type ParseSequence<
  T extends Array<Token<any>>,
  R extends Array<Expression> = [],
  P extends [Expression, Array<Token<any>>] = Parse<T>
> = T extends [] ? Reverse<R> : ParseSequence<P[1], Unshift<R, P[0]>>;
