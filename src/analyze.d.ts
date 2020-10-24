import type {
  BooleanExpression,
  Expression,
  NullExpression,
  NumberExpression,
  PairExpression,
  StringExpression,
  VariableExpression,
} from './parse';
import type { Reverse, Tail, Unshift } from './arrayUtils';
import type { Cast } from './generalUtils';

export type Analyze<E extends Expression> = E extends NullExpression
  ? NullExpression
  : E extends NumberExpression<infer G>
  ? NumberExpression<G>
  : E extends BooleanExpression<infer G>
  ? BooleanExpression<G>
  : E extends StringExpression<infer G>
  ? StringExpression<G>
  : E extends VariableExpression<infer G>
  ? VariableExpression<G>
  : E extends PairExpression<any, any>
  ? AnalyzePairExpression<E>
  : NullExpression;

type isIfExpression<
  E extends PairExpression<any, any>
> = E extends PairExpression<infer L, any>
  ? L extends VariableExpression<infer H>
    ? H extends 'If'
      ? true
      : false
    : false
  : false;

type BuildIfExpression<
  E extends PairExpression<any, any>
> = E extends PairExpression<infer L, infer R>
  ? L extends VariableExpression<infer H>
    ? H extends 'If'
      ? R extends PairExpression<infer L1, infer R1>
        ? R1 extends PairExpression<infer L2, infer R2>
          ? R2 extends PairExpression<infer L3, any>
            ? {
                type: 'If';
                predicate: Analyze<L1>;
                thenClause: Analyze<L2>;
                elseClause: Analyze<L3>;
              }
            : never
          : never
        : never
      : never
    : never
  : never;

type PairToList<
  E extends Expression,
  A extends Array<Expression> = []
> = E extends NullExpression
  ? Reverse<A>
  : E extends PairExpression<infer L, infer R>
  ? PairToList<R, Unshift<A, L>>
  : never;

type BuildCallExpression<
  E extends PairExpression<any, any>
> = E extends PairExpression<infer L, infer R>
  ? PairToList<R> extends infer G
    ? {
        type: 'Call';
        operator: Analyze<L>;
        operands: AnalyzeSequence<Cast<G, Array<Expression>>>;
      }
    : never
  : never;

type AnalyzePairExpression<E extends PairExpression<any, any>> = isIfExpression<
  E
> extends true
  ? BuildIfExpression<E>
  : BuildCallExpression<E>;

type AnalyzeSequence<
  E extends Array<any>,
  R extends Array<any> = []
> = E extends []
  ? Reverse<R>
  : AnalyzeSequence<Tail<E>, Unshift<R, Analyze<E[0]>>>;
