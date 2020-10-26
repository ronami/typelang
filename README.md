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

The language supports booleans, numbers, strings, conditionals (if statements), and calling the following built-in functions:

- `++`: Increases a number by one.
- `--`: Decreases a number by one.
- `Eq`: Checks if both of its arguments are equal.
- `And`: Returns `true` if both of its arguments are `true`.
- `Or`: Returns `true` if at least one of its arguments are `true`.
- `Join`: Concatenates two strings together.

### Try running the code ([See it live]())

Install `typelang` with `npm install typelang` or with `yarn install typelang` (requires TypeScript v4.1.0 or above).

See the following example live by [clicking here]():

```typescript
import { Run } from "typelang";

// Empty
type Result = Run<''>; // null

// Numbers
type Result = Run<'123'>; // 123

// Strings
type Result = Run<'"hello"'>; // 'hello'

// Booleans
type Result = Run<'True'>; // true
type Result = Run<'False'>; // false

// Conditionals
type Result = Run<'(If True "yes" "no")'>; // 'yes'
type Result = Run<'(If False "yes" "no")'>; // 'no'
type Result = Run<'(If 1 "truthy" "nope")'>; // 'truthy'

// Core functions:
//   - Join (concat)
type Result = Run<'(Join "hello" "world")'>; // 'helloworld'
type Result = Run<'(Join "a" "b" "c" "d")'>; // 'abcd'
//   - Equals
type Result = Run<'(Eq 2 2)'>; // true
type Result = Run<'(Eq "you" "me")'>; // false
//   - Logical and
type Result = Run<'(And True True)'>; // true
type Result = Run<'(And False False)'>; // false
//   - Logical or
type Result = Run<'(Or True False)'>; // true
type Result = Run<'(Or False False)'>; // false
//   - Increase by one
type Result = Run<'(++ 2)'>; // 3
//   - Decrease by one
type Result = Run<'(-- 5)'>; // 4

// Variables
type Result = Run<'(Def x 1) x'>; // 1
type Result = Run<'undefined_variable'>; // null
type Result = Run<'(Def x 2) (++ x)'>; // 3
type Result = Run<'(++ x) (Def x 2)'>; // 2
type Result = Run<'(Def x (++ 3)) (Def y (++ x)) (Join "result: " y)'>; // 'result: 5'
type Result = Run<'(Def a "hello") (Def b "world") (Join a " " b)'>; // 'hello world'

// Composite scripts
type Result = Run<'(Eq (++ 1) 1)'>; // false
type Result = Run<'(Join (Join "foo" " " "bar") " " "baz")'>; // 'foo bar baz'
type Result = Run<'(Def n 4) (++ (++ (++ n)))'>; // 7
type Result = Run<'(If (Eq "2" "3") "equals!" "not!")'>; // 'not!'
type Result = Run<'(Or (Eq 3 1) (Eq 1 1))'>; // true
type Result = Run<'(Def x "Hello") (If True (Join x " " "World!") "Bye!")'>; // 'Hello World!'

type Result = Run<'(Def a 3) (Def b (++ a)) (++ b)'>; // 5

// Should return the last expression
type Result = Run<'(++ 1) (++ 2)'>; // 3
type Result = Run<'(Eq 1 1) (Eq 2 3)'>; // false

// Invalid syntax
type Result = Run<'(++ (++ '>; // never
type Result = Run<') ++'>; // never
type Result = Run<'"aa'>; // never
```

**Note**: TypeScript has a limitation on how deep its computation can get. Because of this, we're limited to small inputs. If you're getting the following error: `Type instantiation is excessively deep and possibly infinite`, please try using a smaller input.

### Additional links

- [The Super Tiny Compiler](https://github.com/jamiebuilds/the-super-tiny-compiler)
- [TypeScripts Type System is Turing Complete](https://github.com/microsoft/TypeScript/issues/14833)
- [Typing the Technical Interview in TypeScript](https://gal.hagever.com/posts/typing-the-technical-interview-in-typescript/)
- [Functions and algorithms implemented purely with TypeScript's type system](https://github.com/ronami/meta-typing)
- [A SQL database implemented purely in TypeScript type annotations](https://github.com/codemix/ts-sql)
