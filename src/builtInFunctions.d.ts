import type { Tail } from './arrayUtils';
import type { ConcatStrings } from './stringUtils';

// Equals
export type Equals<A, B> = A extends B ? (B extends A ? true : false) : false;

// Logical and
export type And<A, B> = A extends true
  ? B extends true
    ? true
    : false
  : false;

// Logical or
export type Or<A, B> = A extends true ? true : B extends true ? true : false;

// Add by one
export type Inc<T extends number> = T extends keyof IncTable
  ? IncTable[T]
  : never;

// Concatenate an array of strings
export type Join<T extends Array<string>, R extends string = ''> = T extends []
  ? R
  : Join<Tail<T>, ConcatStrings<R, T[0]>>;

type IncTable = {
  '0': '1';
  '1': '2';
  '2': '3';
  '3': '4';
  '4': '5';
  '5': '6';
  '6': '7';
  '7': '8';
  '8': '9';
  '9': '10';
};

// Decrease by one
export type Dec<T extends number> = T extends keyof DecTable
  ? DecTable[T]
  : never;

type DecTable = {
  '10': '9';
  '9': '8';
  '8': '7';
  '7': '6';
  '6': '5';
  '5': '4';
  '4': '3';
  '3': '2';
  '2': '1';
  '1': '0';
};
