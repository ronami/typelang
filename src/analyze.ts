import type { Reverse, Tail, Unshift } from './arrayUtils';
import type { Cast } from './generalUtils';
import type {
  Expression,
  ListExpression,
  VariableExpression,
} from './dataTypes';

export type AnalyzeSequence<
  E extends Array<Expression>,
  R extends Array<Expression> = []
> = E extends []
  ? Reverse<R>
  : AnalyzeInput<E[0]> extends infer G
  ? AnalyzeSequence<Tail<E>, Unshift<R, Cast<G, Expression>>>
  : never;

export type AnalyzeInput<T extends Expression> = T extends ListExpression<
  infer B
>
  ? B[0] extends VariableExpression<infer V>
    ? V extends 'If'
      ? AnalyzeSequence<B> extends infer C
        ? {
            type: 'If';
            predicate: Cast<C, Array<any>>[1];
            then: Cast<C, Array<any>>[2];
            else: Cast<C, Array<any>>[3];
          }
        : never
      : V extends 'Fun'
      ? AnalyzeSequence<B> extends infer C
        ? {
            type: 'Function';
            identifier: Cast<C, Array<any>>[1];
            arguments: B[2] extends ListExpression<infer A> ? A : never;
            body: Cast<C, Array<any>>[3];
          }
        : never
      : V extends 'Def'
      ? AnalyzeSequence<B> extends infer C
        ? {
            type: 'Definition';
            identifier: Cast<C, Array<any>>[1];
            value: Cast<C, Array<any>>[2];
          }
        : never
      : AnalyzeSequence<B> extends infer C
      ? {
          type: 'Call';
          callee: Cast<C, Array<any>>[0];
          arguments: Tail<Cast<C, Array<any>>>;
        }
      : never
    : T
  : T;
