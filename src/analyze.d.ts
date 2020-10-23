import { Tokenize } from './tokenize';
import { ParseSequence } from './parse';

export type Analyze<E> = E;

type R = Analyze<ParseSequence<Tokenize<'(add 11 22)'>>>;
