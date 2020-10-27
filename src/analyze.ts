import type { Reverse, Tail, Unshift } from './arrayUtils';
import type { Cast } from './generalUtils';
import type { Expression, ListExpression, VariableExpression } from './parse';

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
    ? AnalyzeSequence<B> extends infer C
      ? V extends 'If'
        ? {
            type: 'If';
            predicate: Cast<C, Array<any>>[1];
            then: Cast<C, Array<any>>[2];
            else: Cast<C, Array<any>>[3];
          }
        : V extends 'Def'
        ? {
            type: 'Definition';
            identifier: Cast<C, Array<any>>[1];
            value: Cast<C, Array<any>>[2];
          }
        : {
            type: 'Call';
            callee: Cast<C, Array<any>>[0];
            arguments: Tail<Cast<C, Array<any>>>;
          }
      : T
    : never
  : T;
