import { expectType } from 'tsd';
import type { Run } from '.';

// Empty
expectType<Run<''>>([]);

// Numbers
expectType<Run<'123'>>(['123']);

// Strings
expectType<Run<'"hello"'>>(['hello']);

// Booleans
expectType<Run<'True'>>([true]);
expectType<Run<'False'>>([false]);

// Conditionals
expectType<Run<'(If True 1 0)'>>(['1']);
expectType<Run<'(If False 1 0)'>>(['0']);
expectType<Run<'(If 1 1 0)'>>(['1']);

// Core functions:
//   - concat
expectType<Run<'(concat "a" "b")'>>(['ab']);
expectType<Run<'(concat "hello" "world")'>>(['helloworld']);
//   - equals
expectType<Run<'(= 1 2)'>>([false]);
expectType<Run<'(= 2 2)'>>([true]);
//   - and
expectType<Run<'(& True True)'>>([true]);
expectType<Run<'(& True False)'>>([false]);
expectType<Run<'(& False False)'>>([false]);
//   - or
expectType<Run<'(| True True)'>>([true]);
expectType<Run<'(| True False)'>>([true]);
expectType<Run<'(| False False)'>>([false]);
//   - increase
expectType<Run<'(+ 2)'>>(['3']);
expectType<Run<'(+ 5)'>>(['6']);
//   - decrease
expectType<Run<'(- 2)'>>(['1']);
expectType<Run<'(- 5)'>>(['4']);

// Composite scripts
expectType<Run<'(= (+ 1) 1)'>>([false]);
expectType<Run<'(= (+ 1) 2)'>>([true]);
expectType<Run<'(+ (+ 1))'>>(['3']);

// Invalid syntax
expectType<Run<'(+ (+ '>>(this as never);
expectType<Run<'hello'>>(this as never);
expectType<Run<'=+'>>(this as never);
expectType<Run<') +'>>(this as never);
