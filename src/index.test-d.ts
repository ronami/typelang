import { expectType } from 'tsd';
import type { Eval } from '.';

// Empty
expectType<Eval<''>>(null);

// Numbers
expectType<Eval<'123'>>('123');

// Strings
expectType<Eval<'"hello"'>>('hello');

// Booleans
expectType<Eval<'True'>>(true);
expectType<Eval<'False'>>(false);

// Conditionals
expectType<Eval<'(If True "yes" "no")'>>('yes');
expectType<Eval<'(If False "yes" "no")'>>('no');
expectType<Eval<'(If 1 "truthy" "nope")'>>('truthy');

// Core functions:
// - Join (concat)
expectType<Eval<'(Join "hello" "world")'>>('helloworld');
expectType<Eval<'(Join "a" "b" "c" "d")'>>('abcd');
// - Equals
expectType<Eval<'(Eq 2 2)'>>(true);
expectType<Eval<'(Eq "you" "me")'>>(false);
// - Logical and
expectType<Eval<'(And True True)'>>(true);
expectType<Eval<'(And False False)'>>(false);
// - Logical or
expectType<Eval<'(Or True False)'>>(true);
expectType<Eval<'(Or False True)'>>(true);
// - Increase by one
expectType<Eval<'(++ 2)'>>('3');
// - Decrease by one
expectType<Eval<'(-- 5)'>>('4');

// Variables
expectType<Eval<'(Def x 1) x'>>('1');
expectType<Eval<'undefined_variable'>>(null);
expectType<Eval<'(Def x 2) (++ x)'>>('3');
expectType<Eval<'(++ x) (Def x 2)'>>('2');
expectType<Eval<'(Def x (++ 3)) (Def y (++ x)) (Join "result: " y)'>>(
  'result: 5',
);

// Function declarations
// To declare a function: `(Fun FunctionName (arg1 arg2) (FunctionBody))`
expectType<Eval<'(Fun Add2 (n) (++ (++ n))) (Add2 3)'>>('5');
expectType<
  Eval<'(Fun SayHello (f n) (Join "Hello " f " " n)) (SayHello "John" "Doe")'>
>('Hello John Doe');
// - Variables declared inside a function can't be accessed from outside
expectType<Eval<'(Fun Add2 (n) (Def n 5)) n'>>(null);
// - Functions scope can still access global variables
expectType<Eval<'(Def x "!") (Fun AddBang (i) (Join i x)) (AddBang "hey")'>>(
  'hey!',
);
// - Functions scope can overshadow global scope
expectType<Eval<'(Def x 3) (Fun Add (x) (++ x)) (Add 1)'>>('2');

// Composite scripts
expectType<Eval<'(Eq (++ 1) 1)'>>(false);
expectType<Eval<'(Join (Join "foo" " " "bar") " " "baz")'>>('foo bar baz');
expectType<Eval<'(Def n 4) (++ (++ (++ n)))'>>('7');
expectType<Eval<'(If (Eq "2" "3") "equals!" "not!")'>>('not!');
expectType<Eval<'(Or (Eq 3 1) (Eq 1 1))'>>(true);
expectType<Eval<'(Def x "Hello") (If True (Join x " " "World!") "Bye!")'>>(
  'Hello World!',
);
expectType<Eval<'(Def a 3) (Def b (++ a)) (++ b)'>>('5');

// Should return the last expression
expectType<Eval<'(++ 1) (++ 2)'>>('3');
expectType<Eval<'(Eq 1 1) (Eq 2 3)'>>(false);

// Invalid syntax
expectType<Eval<'(++ (++ '>>(this as never);
expectType<Eval<') ++'>>(this as never);
expectType<Eval<'"aa'>>(this as never);
