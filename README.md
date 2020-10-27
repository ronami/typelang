## 🌳 TypeLang

> A tiny language interpreter implemented purely in TypeScript's type-system

### Introduction

This is an extremely simplified language interpreter implemented purely in TypeScript type annotations. You pass your code as a string and get back the result by hovering with your mouse on the resulting type annotation.

The syntax is Lisp-like. If you're not familiar with it, here's a quick comparison to JavaScript's syntax:

```
 LISP                      JavaScript

 (add 1 2)                 add(1, 2)
 (subtract 5 2)            subtract(5, 2)
 (add 3 (subtract 2 1))    add(3, subtract(2, 1))
```

You can pass multiple expressions and the last one is returned. For example:

```
 (add 1 2) (subtract 6 1) // 5, returns the result of 6 - 2
```

The language supports booleans, numbers, strings, conditionals (if statements), and calling the following built-in functions:

- `++`: Increases a number by one.
- `--`: Decreases a number by one.
- `Eq`: Checks if both of its arguments are equal.
- `And`: Returns `true` if both of its arguments are `true`.
- `Or`: Returns `true` if at least one of its arguments are `true`.
- `Join`: Concatenates two strings together.

To declare a variable, use the `Def` keyword. This example initializes `x` to `3`:

```
(Def x 3)
```

To define a function, use the `Fun` keyword. You pass the name of the function, the arguments that it takes, and finally, its body. The following example defines a function that adds a question mark (`?`) to its input:

```
(Def Ask (q) (Join q "?"))
```

### Try running the code ([See it live]())

Install `typelang` with `npm install typelang` or with `yarn install typelang` (requires TypeScript v4.1.0 or above).

See the following example live by [clicking here]():

```typescript
import { Eval } from "typelang";

// Empty
type Result = Eval<''>; // null

// Numbers
type Result = Eval<'123'>; // '123'

// Strings
type Result = Eval<'"hello"'>; // 'hello'

// Booleans
type Result = Eval<'True'>; // true
type Result = Eval<'False'>; // false

// Conditionals
type Result = Eval<'(If True "yes" "no")'>; // 'yes'
type Result = Eval<'(If False "yes" "no")'>; // 'no'
type Result = Eval<'(If 1 "truthy" "nope")'>; // 'truthy'

// Core functions:
// - Join (concat)
type Result = Eval<'(Join "hello" "world")'>; // 'helloworld'
type Result = Eval<'(Join "a" "b" "c" "d")'>; // 'abcd'
// - Equals
type Result = Eval<'(Eq 2 2)'>; // true
type Result = Eval<'(Eq "you" "me")'>; // false
// - Logical and
type Result = Eval<'(And True True)'>; // true
type Result = Eval<'(And False False)'>; // false
// - Logical or
type Result = Eval<'(Or True False)'>; // true
type Result = Eval<'(Or False True)'>; // true
// - Increase by one
type Result = Eval<'(++ 2)'>; // '3'
// - Decrease by one
type Result = Eval<'(-- 5)'>; // '4'

// Variables
type Result = Eval<'(Def x 1) x'>; // '1'
type Result = Eval<'undefined_variable'>; // null
type Result = Eval<'(Def x 2) (++ x)'>; // '3'
type Result = Eval<'(++ x) (Def x 2)'>; // '2'
type Result = Eval<'(Def x (++ 3)) (Def y (++ x)) (Join "result: " y)'>; // 'result: 5'

// Function declarations
// To declare a function: `(Fun FunctionName (arg1 arg2) (FunctionBody))`
type Result = Eval<'(Fun Add2 (n) (++ (++ n))) (Add2 3)'>; // '5'
type Result = Eval<'(Fun SayHello (f n) (Join "Hello " f " " n)) (SayHello "John" "Doe")'>; // 'Hello John Doe'
// - Variables declared inside a function can't be accessed from outside
type Result = Eval<'(Fun Add2 (n) (Def n 5)) n'>; // null
// - Functions scope can still access global variables
type Result = Eval<'(Def x "!") (Fun AddBang (i) (Join i x)) (AddBang "hey")'>; // 'hey!'
// - Functions scope can overshadow global scope
type Result = Eval<'(Def x 3) (Fun Add (x) (++ x)) (Add 1)'>; // '2'

// More examples scripts
type Result = Eval<'(Eq (++ 1) 1)'>; // false
type Result = Eval<'(Join (Join "foo" " " "bar") " " "baz")'>; // 'foo bar baz'
type Result = Eval<'(Def n 4) (++ (++ (++ n)))'>; // '7'
type Result = Eval<'(If (Eq "2" "3") "equals!" "not!")'>; // 'not!'
type Result = Eval<'(Or (Eq 3 1) (Eq 1 1))'>; // true
type Result = Eval<'(Def x "Hello") (If True (Join x " " "World!") "Bye!")'>; // 'Hello World!'
type Result = Eval<'(Def a 3) (Def b (++ a)) (++ b)'>; // '5'

// Should return the last expression
type Result = Eval<'(++ 1) (++ 2)'>; // '3'
type Result = Eval<'(Eq 1 1) (Eq 2 3)'>; // false

// Invalid syntax
type Result = Eval<'(++ (++ '>; // never
type Result = Eval<') ++'>; // never
type Result = Eval<'"aa'>; // never
```

**Note**: TypeScript has a limitation on how deep its computation can get. Because of this, we're limited to small inputs. If you're getting the following error: `Type instantiation is excessively deep and possibly infinite`, please try using a smaller input.

### Additional links

- [The Super Tiny Compiler](https://github.com/jamiebuilds/the-super-tiny-compiler)
- [TypeScripts Type System is Turing Complete](https://github.com/microsoft/TypeScript/issues/14833)
- [Typing the Technical Interview in TypeScript](https://gal.hagever.com/posts/typing-the-technical-interview-in-typescript/)
- [Functions and algorithms implemented purely with TypeScript's type system](https://github.com/ronami/meta-typing)
- [A SQL database implemented purely in TypeScript type annotations](https://github.com/codemix/ts-sql)
