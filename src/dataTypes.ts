// Tokenizer types
export type ParenToken<V> = { type: 'paren'; value: V };

export type NumberToken<V> = { type: 'number'; value: V };

export type StringToken<V> = { type: 'string'; value: V };

export type SymbolToken<V> = { type: 'symbol'; value: V };

export type Token<V> =
  | ParenToken<V>
  | NumberToken<V>
  | StringToken<V>
  | SymbolToken<V>;

// Expressions types
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
