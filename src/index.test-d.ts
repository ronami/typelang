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
//   - join (concat)
expectType<Run<'(Join "a" "b")'>>(['ab']);
expectType<Run<'(Join "hello" "world")'>>(['helloworld']);
//   - equals
expectType<Run<'(Eq 1 2)'>>([false]);
expectType<Run<'(Eq 2 2)'>>([true]);
//   - and
expectType<Run<'(And True True)'>>([true]);
expectType<Run<'(And True False)'>>([false]);
expectType<Run<'(And False False)'>>([false]);
//   - or
expectType<Run<'(Or True True)'>>([true]);
expectType<Run<'(Or True False)'>>([true]);
expectType<Run<'(Or False False)'>>([false]);
//   - increase
expectType<Run<'(++ 2)'>>(['3']);
expectType<Run<'(++ 5)'>>(['6']);
//   - decrease
expectType<Run<'(-- 2)'>>(['1']);
expectType<Run<'(-- 5)'>>(['4']);

// Composite scripts
expectType<Run<'(Eq (++ 1) 1)'>>([false]);
expectType<Run<'(Eq (++ (++ 1)) 3)'>>([true]);
expectType<Run<'(Eq (Join "a" "b") "ab")'>>([true]);
expectType<Run<'(Eq (Join "ab" "b") "aa")'>>([false]);
expectType<Run<'(++ (++ (++ 4)))'>>(['7']);
expectType<Run<'(If (Eq "2" "3") "y" "n")'>>(['n']);
expectType<Run<'(If (Eq "4" "4") "y" "n")'>>(['y']);
expectType<Run<'(Join (Join "a" "b") "a")'>>(['aba']);

// Invalid syntax
expectType<Run<'(++ (++ '>>(this as never);
expectType<Run<'hello'>>(this as never);
expectType<Run<'=++'>>(this as never);
expectType<Run<') ++'>>(this as never);
