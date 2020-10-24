## 🌳 TypeLang

> A functional language implemented purely in TypeScript's type-system

### Introduction

This is an exremely simplified functional language interpreter implemented purely in TypeScript type annotations. You pass your code as a string and get back a result by hovering your mouse on the resulting type annotation.

The syntax is Lisp-like. If you're not familiar with it, here's a quick comparison to JavaScript's syntax:

```
   LISP                      JavaScript

   (add 1 2)                 add(1, 2)
   (subtract 5 2)            subtract(5, 2)
   (add 3 (subtract 2 1))    add(3, subtract(2, 1))
```

The language supports booleans, numbers, strings, conditionals (if statements), and calling the following buit-in functions:

- `++`: Increases a number by one
- `--`: Decreases a number by one
- `Eq`: Checks if both of its arguments are equal
- `And`: Returns `true` if both of its arguments are `true`
- `Or`: Returns `true` if at least one of its arguments are `true`
- `Join`: Concatenates two strings together

### Try running the code ([See it live]())

You can install `typelang` in your own project with `npm install typelang` or `yarn install typelang` (TypeScript 4.1 is required).

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
type Result = Run<'(If True 1 0)'>; // '1'
type Result = Run<'(If False 1 0)'>; // '0'
type Result = Run<'(If 1 1 0)'>; // '1'

// Core functions:
//   - join (concat)
type Result = Run<'(Join "a" "b")'>; // 'ab'
type Result = Run<'(Join "hello" "world")'>; // 'helloworld'
//   - equals
type Result = Run<'(Eq 1 2)'>; // false
type Result = Run<'(Eq 2 2)'>; // true
//   - and
type Result = Run<'(And True True)'>; // true
type Result = Run<'(And True False)'>; // false
type Result = Run<'(And False False)'>; // false
//   - or
type Result = Run<'(Or True True)'>; // true
type Result = Run<'(Or True False)'>; // true
type Result = Run<'(Or False False)'>; // false
//   - increase
type Result = Run<'(++ 2)'>; // '3'
type Result = Run<'(++ 5)'>; // '6'
//   - decrease
type Result = Run<'(-- 2)'>; // '1'
type Result = Run<'(-- 5)'>; // '4'

// Composite scripts
type Result = Run<'(Eq (++ 1) 1)'>; // false
type Result = Run<'(Eq (++ (++ 1)) 3)'>; // true
type Result = Run<'(Eq (Join "a" "b") "ab")'>; // true
type Result = Run<'(Eq (Join "ab" "b") "aa")'>; // false
type Result = Run<'(++ (++ (++ 4)))'>; // '7'
type Result = Run<'(If (Eq "2" "3") "y" "n")'>; // 'n'
type Result = Run<'(If (Eq "4" "4") "y" "n")'>; // 'y'
type Result = Run<'(Join (Join "a" "b") "a")'>; // 'aba'
type Result = Run<'(Or (Eq 1 1) False)'>; // true

// Return last expression
type Result = Run<'(++ 1) (++ 2)'>; // '3'
type Result = Run<'(Eq 1 1) (Eq 2 3)'>; // false

// Invalid syntax
type Result = Run<'(++ (++ '>; // never
type Result = Run<'hello'>; // never
type Result = Run<'=++'>; // never
type Result = Run<') ++'>; // never
```

**Note**: TypeScript has a limitation on how deep its computation can go. Because of this we're limited to small inputs, if you're getting the following error: `Type instantiation is excessively deep and possibly infinite`, please try using a smaller input.

### Additional links

- [Utility TypeScript types](https://www.typescriptlang.org/docs/handbook/utility-types.html)
- [Advanced TypeScript types](https://www.typescriptlang.org/docs/handbook/advanced-types.html)
- [Typing the Technical Interview in TypeScript](https://gal.hagever.com/posts/typing-the-technical-interview-in-typescript/)
- [TypeScripts Type System is Turing Complete](https://github.com/microsoft/TypeScript/issues/14833)
- [Emulating a 4-Bit Virtual Machine in TypeScript's type system](https://gist.github.com/acutmore/9d2ce837f019608f26ff54e0b1c23d6e)
- [Algorithms and data structures implemented in JavaScript](https://github.com/trekhleb/javascript-algorithms)
- [How to master advanced TypeScript patterns](https://github.com/pirix-gh/medium/blob/master/types-curry-ramda/src/index.ts)
- [Functions and algorithms implemented purely with TypeScript's type system](https://github.com/ronami/meta-typing)