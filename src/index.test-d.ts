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
//   - equals
expectType<Run<'(eq 1 2)'>>([false]);
expectType<Run<'(eq 2 2)'>>([true]);
//   - and
expectType<Run<'(and True True)'>>([true]);
expectType<Run<'(and True False)'>>([false]);
expectType<Run<'(and False False)'>>([false]);
//   - or
expectType<Run<'(or True True)'>>([true]);
expectType<Run<'(or True False)'>>([true]);
expectType<Run<'(or False False)'>>([false]);
