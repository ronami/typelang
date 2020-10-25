import { expectType } from 'tsd';
import type { Run } from '.';

// Empty
expectType<Run<''>>(null);

// Numbers
expectType<Run<'123'>>('123');

// Strings
expectType<Run<'"hello"'>>('hello');

// Booleans
expectType<Run<'True'>>(true);
expectType<Run<'False'>>(false);

// Conditionals
expectType<Run<'(If True "yes" "no")'>>('yes');
expectType<Run<'(If False "yes" "no")'>>('no');
expectType<Run<'(If 1 "truthy" "nope")'>>('truthy');

// Core functions:
//   - Join (concat)
expectType<Run<'(Join "a" "b")'>>('ab');
expectType<Run<'(Join "hello" "world")'>>('helloworld');
//   - Equals
expectType<Run<'(Eq 1 2)'>>(false);
expectType<Run<'(Eq 2 2)'>>(true);
//   - Logical and
expectType<Run<'(And True True)'>>(true);
expectType<Run<'(And True False)'>>(false);
expectType<Run<'(And False False)'>>(false);
//   - Logical or
expectType<Run<'(Or True True)'>>(true);
expectType<Run<'(Or True False)'>>(true);
expectType<Run<'(Or False False)'>>(false);
//   - Increase by one
expectType<Run<'(++ 2)'>>('3');
expectType<Run<'(++ 5)'>>('6');
//   - Decrease by one
expectType<Run<'(-- 2)'>>('1');
expectType<Run<'(-- 5)'>>('4');

// Variables scripts
expectType<Run<'(Def x 1) x'>>('1');
expectType<Run<'(Def x 1) y'>>(null);
expectType<Run<'(Def x 2) (++ x)'>>('3');
expectType<Run<'(++ x) (Def x 2)'>>('2');
expectType<Run<'(Def x "hello") (Join x "world")'>>('helloworld');

// Composite scripts
expectType<Run<'(Eq (++ 1) 1)'>>(false);
expectType<Run<'(Eq (++ (++ 1)) 3)'>>(true);
expectType<Run<'(Eq (Join "a" "b") "ab")'>>(true);
expectType<Run<'(Eq (Join "ab" "b") "aa")'>>(false);
expectType<Run<'(++ (++ (++ 4)))'>>('7');
expectType<Run<'(If (Eq "2" "3") "y" "n")'>>('n');
expectType<Run<'(If (Eq "4" "4") "y" "n")'>>('y');
expectType<Run<'(Join (Join "a" "b") "c")'>>('abc');
expectType<Run<'(Or (Eq 1 1) False)'>>(true);

// Should return the last expression
expectType<Run<'(++ 1) (++ 2)'>>('3');
expectType<Run<'(Eq 1 1) (Eq 2 3)'>>(false);

// Invalid syntax
expectType<Run<'(++ (++ '>>(this as never);
expectType<Run<'hello'>>(this as never);
expectType<Run<'=++'>>(this as never);
expectType<Run<') ++'>>(this as never);
