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
// - Join (concat)
expectType<Run<'(Join "hello" "world")'>>('helloworld');
expectType<Run<'(Join "a" "b" "c" "d")'>>('abcd');
// - Equals
expectType<Run<'(Eq 2 2)'>>(true);
expectType<Run<'(Eq "you" "me")'>>(false);
// - Logical and
expectType<Run<'(And True True)'>>(true);
expectType<Run<'(And False False)'>>(false);
// - Logical or
expectType<Run<'(Or True False)'>>(true);
expectType<Run<'(Or False True)'>>(true);
// - Increase by one
expectType<Run<'(++ 2)'>>('3');
// - Decrease by one
expectType<Run<'(-- 5)'>>('4');

// Variables
expectType<Run<'(Def x 1) x'>>('1');
expectType<Run<'undefined_variable'>>(null);
expectType<Run<'(Def x 2) (++ x)'>>('3');
expectType<Run<'(++ x) (Def x 2)'>>('2');
expectType<Run<'(Def x (++ 3)) (Def y (++ x)) (Join "result: " y)'>>(
  'result: 5',
);

// Function declarations
// To declare a function: `(Fun FunctionName (arg1 arg2) (FunctionBody))`
expectType<Run<'(Fun Add2 (n) (++ (++ n))) (Add2 3)'>>('5');
expectType<
  Run<'(Fun SayHello (f n) (Join "Hello " f " " n)) (SayHello "John" "Doe")'>
>('Hello John Doe');
// - Variables declared inside a function can't be accessed from outside
expectType<Run<'(Fun Add2 (n) (Def n 5)) n'>>(null);
// - Functions scope can still access global variables
expectType<Run<'(Def x "!") (Fun AddBang (i) (Join i x)) (AddBang "hey")'>>(
  'hey!',
);

// Composite scripts
expectType<Run<'(Eq (++ 1) 1)'>>(false);
expectType<Run<'(Join (Join "foo" " " "bar") " " "baz")'>>('foo bar baz');
expectType<Run<'(Def n 4) (++ (++ (++ n)))'>>('7');
expectType<Run<'(If (Eq "2" "3") "equals!" "not!")'>>('not!');
expectType<Run<'(Or (Eq 3 1) (Eq 1 1))'>>(true);
expectType<Run<'(Def x "Hello") (If True (Join x " " "World!") "Bye!")'>>(
  'Hello World!',
);
expectType<Run<'(Def a 3) (Def b (++ a)) (++ b)'>>('5');

// Should return the last expression
expectType<Run<'(++ 1) (++ 2)'>>('3');
expectType<Run<'(Eq 1 1) (Eq 2 3)'>>(false);

// Invalid syntax
expectType<Run<'(++ (++ '>>(this as never);
expectType<Run<') ++'>>(this as never);
expectType<Run<'"aa'>>(this as never);
