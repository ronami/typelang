import type { Reverse, Tail, Unshift } from './arrayUtils';
import type { Cast } from './generalUtils';
import type {
  Expression,
  Token,
  NumberToken,
  StringToken,
  ParenToken,
  SymbolToken,
} from './dataTypes';

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
