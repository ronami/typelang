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

export type CallExpression<
  C extends Expression,
  A extends Array<Expression>
> = {
  type: 'Call';
  callee: C;
  arguments: A;
};

export type Expression =
  | BooleanExpression<any>
  | NullExpression
  | NumberExpression<any>
  | StringExpression<any>
  | VariableExpression<any>
  | IfExpression<any, any, any>
  | DefinitionExpression<any, any>
  | CallExpression<any, Array<any>>;

export type ParseInput<
  T extends Array<Token<any>>,
  F extends Token<any> = T[0]
> = F extends ParenToken<'('>
  ? ParseCallExpression<Tail<T>>
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

type ParseCallExpression<T extends Array<Token<any>>> = ParseArgs<
  T
> extends infer G
  ? Cast<G, Array<any>>[0] extends infer H
    ? [
        Cast<H, Array<any>>[0] extends VariableExpression<'If'>
          ? {
              type: 'If';
              predicate: Cast<H, Array<any>>[1];
              then: Cast<H, Array<any>>[2];
              else: Cast<H, Array<any>>[3];
            }
          : Cast<H, Array<any>>[0] extends VariableExpression<'Def'>
          ? {
              type: 'Definition';
              identifier: Cast<H, Array<any>>[1];
              value: Cast<H, Array<any>>[2];
            }
          : {
              type: 'Call';
              callee: Cast<H, Array<any>>[0];
              arguments: Tail<Cast<H, Array<any>>>;
            },
        Cast<G, Array<any>>[1],
      ]
    : never
  : never;

type ParseArgs<
  T extends Array<Token<any>>,
  R extends Array<Expression> = [],
  F extends Token<any> = T[0]
> = F extends ParenToken<')'>
  ? [Reverse<R>, Tail<T>]
  : T extends []
  ? never
  : ParseInput<T> extends infer G
  ? ParseArgs<Cast<G, Array<any>>[1], Unshift<R, Cast<G, Array<any>>[0]>>
  : never;

export type ParseSequence<
  T extends Array<Token<any>>,
  R extends Array<Expression> = [],
  P extends [Expression, Array<Token<any>>] = ParseInput<T>
> = T extends [] ? R : ParseSequence<P[1], Unshift<R, P[0]>>;

export type Parse<T extends Array<Token<any>>> = Reverse<ParseSequence<T>>;
