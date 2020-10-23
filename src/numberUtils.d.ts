type Numbers = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

export type isNumberCharacter<I extends string> = I extends Numbers
  ? true
  : false;
