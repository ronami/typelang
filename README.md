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

### Try running the code ([See it live](https://www.typescriptlang.org/play?ts=4.1.0-dev.20201027#code/PTAECkFcGcBdQIYDtQFMAeCC2AHANqgDSgAWA9gG6oBOaCAxiaHKjqLGc6qqAJazRQZSLBwiAULACeOHgGEyAEx4BeUAANxoUAAoAIqgBmodKABEACVR48ZMwEotug8anmA6mWp5FDpzvAyXhRTM3NQKUd1AG5xEFAAFTIAa1QkXgAvVEkZHiTUpEE1fLTM1AAeBWUAPlj4gAUEamhs6VlQRubURVA1TpbyksLauLAAQSQEPCksnPaJqZnu3tAF6ayAZVQAR0g0+gr+7pH4gDFgqdBqVGhIPFg5ngAlG7v4NQBRCimJxRfYSDUJAAGQQcHKAG8AL7ENZLRQjUajUAKa6geheHgAI2stgA7gAuJHiDA4LzwNo8L5TcoASTQ6FgaUUgjg1GCAHNqishmU6dyMEykCy+EhDDREk4APwdJoDORg2CDWHUagIKTlZBSao6hlCkXBcW0epObQyuGbHZ7JAHSqK8r1FVqjVanUCxnMwSGiVjU3aUAy6l4X7-QEg+3Q4gK8FjJ3qzVIbU6v3aAmgJCoKjUP1pjNZpy5zM0WLIkS8PDQYBNZ0AVVg5egADoBCT0GTqBTcokEOXBnrPatVfHXdy1DodI3J7A0wl7L1uRQgoo54KBzonCQ01rCE5J43rnA097aE9xHOVAul9LQKfU+mi9QS6TyewuzXCiReIYlQl+8LBGMQ4uom1TEB8o66Ou2ibqAHw7toe7TpK56Xrwy5-iKE5TkeYoSk8KGgIuaHXreoCFlmT5ti+lI3g+Ay-qu-6Ds6CbasQTwYQBQGsRBADaAC6EEQk4hjBLw0AwU8sTaBmjJpi8Wb0T2eCDKBoDvhJX5Kk8xAJLxAAMgkjFCvEMR6TECQGoAAOSiekEnWWRNmybA1n8SW8RlhWwAcmkNBTHWDbNtArbtp27TRkqsagAAQhBYycbFVkJWmMWUWFr7tAAsjQvnuPwJAAPJZuyyiDAAjLpABMEGFVg-AVcQqRSGQxgJDVoAAGSJFV6XUV2ABykBYDizQrNZ+mOQAPjZ5XTTZVXzdZADMS0ACxLQArEtABsS0AOxLQAHEtACc1l9R2mU8BsUgjWQFa9E4M3WQg1nPTZWLvdoL30N9oAvYo-0vagwM2YYYPWRykMkJDvCQwAVpDySQ3gkNYJDSCQ2QkM4JD2yQ9QkPQJDrkfdZkCQxQkN4pD6CQ1IkMZJDYyQzFkNyJDeiQx8kOnJDADikMWJDtKQ+AkMANKQ8CkNZZDA2Q4VkP1JDACKkNPJDGyQwkkM1pDABqkPuJDAAakMAJqQwAWpDk3k3N5OLeTq3kxt5PbeTe3k4d5MneT53kwA+pDAC0kMANSQyokNTZDnUXeIpb1t5bKcoFFbBaF-XtB8CCwOczSwHIJBNKpKyJIl6gACQQseqxQnXDcxVC6hWTFTnWUnOdXTRRdwKX5cJBBZn6oItf17htBjE3U9GrFbfJV3PfPn3XYKDaBcbLA7JIBy0DlAljEiun+-EJ3J+srvnIQZPs9163MTJ-EyCLFk2dr+FPAWqgWy7PsCoTgPiJUAixD4bYDzQF4GQJAoEnAcSvsxeMECcBQJgXAlYAlxAQRAUg7BZpaKKQqE8aoBZViTHWKgWkSAxBKg+AZQSiUG4C2vL-f+1pbQJGUuUcCxANKfm-OUHSKJ7QCzApAm40DYFunIXmYsycv7XQoe-ahtCRB9iQag9BMieSJWBOJWA2ipEYPKE4FuODrwxUYYlQ2TReAICxAQYx0BpFIHKA3Q2ZD-RWUNolaytIIYpmSpQpYHDAHlDisw6eKJgmEOEj4xJ-pKRpgCRDaSSTEloO6LwegBdUBpkipUOMwEky8XKu5OJiTYAkDSIU+0cgSk8WqLxKqlTMmJOsC0ep4JGnINKTqXiy12kdNAFCKp5EaDBLTH4pB1lTiQCxsE80oTLQAJtBUKJSCG5yCqTKaxbT9GGJcW4o+3E7Hskcc4yRrjTFny5MmUZVkElPOSbkVJCybT1lgQYegeAmgFwwUnV5-o0JpHrKJGgPSlR9LAcOECLSKkZJBU0Dkw1wXQFSq0-ivFrJYiUIzEZIL8WKCkNC4p-TmlDKJaM8ZTzJnZg6Qy6ZoBZnmRFNZFw-0fErNUeEjZkT3Tj1FAvXZHSZQvKeSkmyFyHFONQL8-5apvlY2RaMsFSAIW8ChaI3pTSRzlJpR074eA9jkthdxA1bS1VJLpZk5lSS0zsKtBErZ7KvQxLFYkiVVTtDSusgqGwwLRl5JsNwc1+qEWMJtYk1F6LNWYu7L2IpFqWIjhGB0u1PiHX+hnOQhIHkwBYkgOWWANDPn0BVU2FsSiaIfF2FMQ+0UolqGPu6pKModCX3bQlGUu89hOUMI21Ac40xDorKgS638KGKCPhfeKiV+3ZEId24VS6-R9uoHsHMoBx0tHIXuydiiqLr3aIVagc7YoLqQUuqyt7UqLq3TwTdA6x3Dqncomh9BNHtqQMNUao9ErNVaqAL93D5XXjA1c1Apl+JyIfB+migRgg-uFXCjU9y1KIPbfc8a1lAP4Lg4Q0iaZkPuO4b2EeUZYF5NgDvPeB9hG6UYTqEsNEoPypWC8ia1lUlzQydZOaqTFoCcWqk1aAnVqpI2gJjaqTtoCe2qkvaAm9qpMOgJw6qSToCZOqk86Anzp8cmrEKEiGuy-NQwOP9I0aAEfbcB4wvzwMEGvM56DsH4MUWTjRdznG1DcfKpNfTwbrJGZsjppw1k9M2Q01FrTNkVNRbUzZBTUWlM2Rk1FuTNkJNRakwtULYnZqhaEzZEz4gzMvzAIoAuCAEi5GrSFWtXZOhpCGOULxXHrqpJwE0NIF1CJTDNaysZ5n2hDVs9QDrXWAs9ecv+mgg2TUjb8VV3u076Ochm0Jeb1l7nLeGwU0b62WvtFuvdPAO3uv+ugHdfFaNohDdNcdtb428gpDSJ10cH02tIB2x9Sbo0Ac-VAFt-eIOAZg-uw9Hb73YpkAeqgZAJzTGzdAC8-1MVEcEGQMGlbr3TPw6GjYVHsCuNOH9STx7lXieLeoGT9x6PMfvJskDpbGSCczKJ8ejKNFwcckZ99infrWfWQF-jo73Pae89zjwWV0GhdsuFZhkXe2Ffysly96Xp2T3TsCULpw9REqM-glXLRNy3Fm7we2xnOC1f+sCcG7Jihcn5LTPUDJNS6mJAyV047HwecbeURrggiqAUqsN9oekFvsm3NgWb5XA47dCUp2L0PCrUB-Ij0CjJGqtU6tpJzqXrKg9nZ4AYuAQvV0DnQ7wy3GDdQBbT7IVJlfXIZJJWS2KZe9fKMDXgKPKITcN4T04NtaHuKM7Ian0XrebID+DaGggx25AZLjVgDFTre9867BWlV4flUYKHzH23o+kBm4n7Xqf5-4HaBr0xFPDuxf74wYfwFsDg356-Nq6gaYi9OAb5b6rCd4EqpQ75y6wTn5PSg7Y5I4o7n48SA53CD7n7IFTZC6ugfQC6YEgQfQZ64HagfQG6IHbiICJjEBYGg4Z7v6R6kEUHkFEGg7t6EHeJQ4D6EGRpJgfSv4-JZ5Kof5ICcGMGUEgSFpoAmrZz86wD5IrAvAYjUCzr3KiHahsZdhBhD4bCJQ7z5LW4j5x5uL26fCJTU526EK8QbDEB-o2BEZOQ27CpwG45CGIGeJsEygWHECGy2Fpj2EDjs4M4uExJeLXgeGsreGwTaE3z7xC6uEhGWFhHkK+FMQkEGGmINyOgioSgJDEANzgTXhBgpE6LuLxEZHZGwRsE+G2L2KK6BELzBGEJBgEGIHxH1F2FVGXLyq0HH61ESi0g5FBFuGwQmo0H8E56wJC7xF9GsoVERFIK8FIBdHjE9G0BTENzRQtyDFBjzGLHOGpGwLlCTGwjzqJGJQcHLEoj9ELxjCbEmpnF7HFFRiwgzHyKPg+bqHDHVHyoTGRG6GjZIKq5qC8ROCWFOBJ5MSOZg5WQbC8ReFOTWF4A7iVKPBDFTDbGjFH5LH3FmLaBaFII6FMhm6n7Cqm7j6gI373F35JSx5FFGGgbtFyrXJYkNwDSDG8Q5TUB5QFTFQ0ClQVDxEQigC8QICiigADT8RpjzH4kVDNrchQhqTwnhEvFqF5wfEdFh7omCGaE-EElOBEnJ7n6J76E0m4ImoTGeFCoDgsKQb0k1FMkxIskbqClVLsmck1LcmqhgrYmjJFLiKUoGqGRm4dIClCkilinkq+l14GoVJjJVKUlJI+lcGDIVKBn+i2F3gvFeYKLIkFGGBal4kyE6naDG7UkmJj7aBjz6n3F6Elnx5IC0kaHNHED1AWlMRWmEIJl+lRrRlIKHqOkNlYkdmRlRoBnlE7r9lFF2jggRmWrDn8S6TPEIZvEqlTB3ETnAnalEBOByBGmlkX6klIJ17T71kmr8q2jxHXHRILysLtk2lfHnEOk8qin+Jkbcr+juGDkzllIjlkaTlKjTlppdmCRpm5pPlzL1qvnmG+q6p-mJktIBlQX1qQCNq-nlD-nwplIVKMJRhiKwWGqGpxmJLAV3gDT+K-AQVWRAlPIfkAVflzlQW-AoVoUDKIo4ojnUXoVJk4oVIEU+JEVOQkVzLnrkXuFQXsXMVYVQXnqMW4WYVsU4WdkYVcWCQpm8UsoCXtrWSRzRzLKCliVUojlfrSUKWcUsZ8VpjqXCrWRhwRw6W8R6X+lzmgCWb2WAWmVqVAaoAtTGAbA6VbGLKVoYJjA4D4Bu4qoHHEADTYVTmwVsHZr3j5hxUZnpmLnImSkFnSlkngK34Xw7m1mz6IAcnxoCDb5OBd7gEy7IlyDXD5LzFBUhW0YYIbAYiyBekCyZUcWX7tUajT5m7YbCryFeBKFREcgqEz4rBX4WS2EygkarA2JIJNF2l1GDFVXI5Mi1XBV4ChWNXNVAJJIUYqQCw8VJoqTXEqWgAumoD5RuklSekiLBnCnBBhFpgCw2Jyl+gLnebZkmrrX1WCFem4ntpSlm4WUDjKFOBtUHmfljVqDQlimJRpX5IeIxLrExJxT5GmmIHBIrU1X+Uqp1WbUNWwJNVkAtUvXJmrDEAbBHUxTvWXl4SOmhFFIiJDmKXAU5oMrKlUgnkuoCrrn5m6HAJdU8S9VC2uhYJwa4KJQEIUXxEKQ0ADCkLhHjm7nhWwQsZ020DXlWRBinm7WJIuW0VnX7W8JHUCJaRMbQWoUyWCTvWZmvHB51omohioAAhAigjgh82A3pXVk9pQ0i1IJagrDwn1lS1TU3iJEY1YnxEMKGQtkGgxJa2BhO3Cihhu0NLyUs2DIjnG18KW1MVUrcV23iF9ZdCfx940RHA0J0JekVlMR14dYjhm6nCJQN0gQ8iMK0nN1IJ-YdbWQ6D4bXhHDt6DA8IjwzFd2A0w5XafbuLWQJBPoD3mEClY447I6qrPYja3owjHWqThET3CoXYPa92nDDqL0UXL1i6OFr2Hba67rDpjK6Sj3VB73aFT293U5n3uEX3z7WQf1PZc7pgoEP070jwv1IL+EdaxFL17b+E32rbAPG2gPkL70DgC6QMDEhHf3Hbi7DVwOvYINP1gOT2XboNLWYPq6fEEB4MzIEOUbP3kK8QvHEACRIkV1yioDD210ij10z3NIQRD2GLY6koVzbIJ3kP+rt6DZlV524WGTAMG2cWKkpVsNdDt5CMahOBcNcQsSt1Jj+2+1ZUUni1N0t28Ni3FAd0QQoNMQ928PWT2Cf2Cly1dDCJqSIP0N3haOClh1JVOSV3qI-hx0epXmD3sNqMEpGWZ0sX8Ifjm0iIKNwVGRF2y6no8BHC6011C26M6j6OT6GNFF8R0VFlS2m6UrZPP0rD+PV0jy0leOWTTV+PsMZP1CGoxOaRCIiItOx2Ijl6yguNeM8MFB8NyF0SHBNM81cKsbVbsAz1lBSFdi8hZBV0aJ6lMQAmgADwlxlwXq0hBM2T7MvQAA6Sy5h3cYEBcmzQ8OzHjTklz2z-I-i-dIRwSkq1SYuJdA2Ma2gADfdwaPiMIwS+chcvAxcVz-IKZe9ILg89zuz-iDjzzSSrzPi-qHzqqVSPzDjMaALSSQLdz5cuzELyDULWz+Lez-hIUhCizqA-hdIxAZzGzxLYLuz49jLMLez1kZg-0MoVLAuvCFzrLpLLLoLbLr9l2FLVkPLU9tLNk1kxAeL1zH1WZNEVLNLupiUYN2gE1p8w1eGZu25-xOrag8r-ItJ+r7a5L14Kr9OfLwLwrpL1GW8dGw1TaUYjyTkvEWDqSNmo01DqwwDtIrDCzszmww1Xpqz2rDGO4EE4bE8zcMSFgUIZgcbV5bc4jYuB2-9JeFgwDAsSj+YyJkrl2Yb6rw1nVBrDGurW5JbFbRrAr1zprorD24r3Lwbf8UruLdb4LKING28zrl6cgbraYHre2d2l2vrCU29Ab8OPLEzetMbzApbCCWTZjCKxjRuUtZB9y-EPIrbyzSouztJ873cJE+arbzTrTHQc1GljkDTaYZtHTTZLGPT5dQbBQfI876zzj9EZ7s7-IiI4gQAA))

Install `typelang` with `npm install typelang` or with `yarn install typelang` (requires TypeScript v4.1.0 or above).

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
// To declare a function: `(Fun FunctionName (arg1 arg2 ...) (FunctionBody))`
type Result = Eval<'(Fun Ask (q) (Join q "?")) (Ask "Here")'>; // 'Here?'
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
