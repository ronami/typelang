import type { Reverse, Tail, Unshift } from './arrayUtils';
import type { Cast } from './generalUtils';
import type {
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

export type VariableExpression<V extends string> = {
  type: 'Variable';
  value: V;
};

export type IfExpression<
  P extends Expression,
  T extends Expression,
  E extends Expression
> = {
  type: 'If';
  predicate: P;
  then: T;
  else: E;
};

export type DefinitionExpression<I extends Expression, V extends Expression> = {
  type: 'Definition';
  identifier: I;
  value: V;
};

export type ListExpression<B extends Array<Expression>> = {
  type: 'List';
  body: B;
};

export type CallExpression<
  C extends Expression,
  A extends Array<Expression>
> = {
  type: 'Call';
  callee: C;
  arguments: A;
};

export type FunctionExpression<
  I extends Expression,
  A extends Array<Expression>,
  B extends Expression
> = {
  type: 'Function';
  identifier: I;
  arguments: A;
  body: B;
};

export type Expression =
  | BooleanExpression<any>
  | NullExpression
  | NumberExpression<any>
  | StringExpression<any>
  | VariableExpression<any>
  | IfExpression<any, any, any>
  | DefinitionExpression<any, any>
  | ListExpression<any>
  | CallExpression<any, Array<any>>
  | FunctionExpression<any, any, any>;

export type ParseInput<
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
  : [never, []];

type ParseList<T extends Array<Token<any>>> = ParseListBody<T> extends infer G
  ? [{ type: 'List'; body: Cast<G, Array<any>>[0] }, Cast<G, Array<any>>[1]]
  : never;

type ParseListBody<
  T extends Array<Token<any>>,
  R extends Array<Expression> = [],
  F extends Token<any> = T[0]
> = F extends ParenToken<')'>
  ? [Reverse<R>, Tail<T>]
  : T extends []
  ? never
  : ParseInput<T> extends infer G
  ? ParseListBody<Cast<G, Array<any>>[1], Unshift<R, Cast<G, Array<any>>[0]>>
  : never;

export type ParseSequence<
  T extends Array<Token<any>>,
  R extends Array<Expression> = [],
  P extends [Expression, Array<Token<any>>] = ParseInput<T>
> = T extends [] ? R : ParseSequence<P[1], Unshift<R, P[0]>>;

export type Parse<T extends Array<Token<any>>> = Reverse<ParseSequence<T>>;
