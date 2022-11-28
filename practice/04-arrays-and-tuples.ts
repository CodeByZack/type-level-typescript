/**
 * Implement a generic that returns the first value
 * in a tuple.
 */
 namespace first {
  type First<tuple extends any[]> = TODO;

  type res1 = First<[]>;
  type test1 = Expect<Equal<res1, undefined>>;

  type res2 = First<[string]>;
  type test2 = Expect<Equal<res2, string>>;

  type res3 = First<[2, 3, 4]>;
  type test3 = Expect<Equal<res3, 2>>;

  type res4 = First<["a", "b", "c"]>;
  type test4 = Expect<Equal<res4, "a">>;
}


// ==============================================

/**
 * Implement a generic that returns the first value
 * in a tuple.
 */
 namespace first {
  type First<tuple extends any[]> = tuple[0];

  type res1 = First<[]>;
  type test1 = Expect<Equal<res1, undefined>>;

  type res2 = First<[string]>;
  type test2 = Expect<Equal<res2, string>>;

  type res3 = First<[2, 3, 4]>;
  type test3 = Expect<Equal<res3, 2>>;

  type res4 = First<["a", "b", "c"]>;
  type test4 = Expect<Equal<res4, "a">>;
}


// ==============================================

/**
 * Implement a generic that adds a type to the end
 * of a tuple.
 */
 namespace append {
  type Append<tuple extends any[], element> = TODO;

  type res1 = Append<[1, 2, 3], 4>;
  type test1 = Expect<Equal<res1, [1, 2, 3, 4]>>;

  type res2 = Append<[], 1>;
  type test2 = Expect<Equal<res2, [1]>>;
}


// ==============================================

/**
 * Implement a generic that adds a type to the end
 * of a tuple.
 */
 namespace append {
  type Append<tuple extends any[], element> = [...tuple, element];

  type res1 = Append<[1, 2, 3], 4>;
  type test1 = Expect<Equal<res1, [1, 2, 3, 4]>>;

  type res2 = Append<[], 1>;
  type test2 = Expect<Equal<res2, [1]>>;
}


// ==============================================

/**
 * Implement a generic that concatenate two tuple.
 */
 namespace concat {
  type Concat<tuple1 extends any[], tuple2 extends any[]> =
    TODO;

  type res1 = Concat<[1, 2, 3], [4]>;
  type test1 = Expect<Equal<res1, [1, 2, 3, 4]>>;

  type res2 = Concat<[1, 2, 3], []>;
  type test2 = Expect<Equal<res2, [1, 2, 3]>>;
}


// ==============================================

/**
 * Implement a generic that concatenate two tuple.
 */
 namespace concat {
  type Concat<tuple1 extends any[], tuple2 extends any[]> = [
    ...tuple1,
    ...tuple2
  ];

  type res1 = Concat<[1, 2, 3], [4]>;
  type test1 = Expect<Equal<res1, [1, 2, 3, 4]>>;

  type res2 = Concat<[1, 2, 3], []>;
  type test2 = Expect<Equal<res2, [1, 2, 3]>>;
}



// ==============================================

/**
 * Implement a generic taking a tuple and returning
 * an array containing the union of all values in this tuple.
 */
 namespace tupleToArray {
  type TupleToArray<tuple extends any[]> = TODO;

  type res1 = TupleToArray<[1, 2, 3]>;
  type test1 = Expect<Equal<res1, (1 | 2 | 3)[]>>;

  type res2 = TupleToArray<[number, string]>;
  type test2 = Expect<Equal<res2, (number | string)[]>>;

  type res3 = TupleToArray<[]>;
  type test3 = Expect<Equal<res3, never[]>>;

  type res4 = TupleToArray<[1] | [2] | [3]>;
  type test4 = Expect<Equal<res4, (1 | 2 | 3)[]>>;
}


// ==============================================
/**
 * Implement a generic taking a tuple and returning
 * an array containing the union of all values in this tuple.
 */
 namespace tupleToArray {
  type TupleToArray<tuple extends any[]> = tuple[number][];

  type res1 = TupleToArray<[1, 2, 3]>;
  type test1 = Expect<Equal<res1, (1 | 2 | 3)[]>>;

  type res2 = TupleToArray<[number, string]>;
  type test2 = Expect<Equal<res2, (number | string)[]>>;

  type res3 = TupleToArray<[]>;
  type test3 = Expect<Equal<res3, never[]>>;

  type res4 = TupleToArray<[1] | [2] | [3]>;
  type test4 = Expect<Equal<res4, (1 | 2 | 3)[]>>;
}


// ==============================================

/**
 * Create a generic `NonEmptyArray` type that represents 
 * Arrays that contain at least one element.
 */
 namespace nonEmptyArray {
  type NonEmptyArray<T> = TODO;

  function sendMail(addresses: NonEmptyArray<string>) {
    /* ... */
  }

  sendMail(["123 5th Ave"]); // ✅
  sendMail(["75 rue Quincampoix", "75003 Paris"]); // ✅
  // @ts-expect-error
  sendMail([]);
  //       ^ ❌ `[]` isn't assignable to `NonEmptyList<string>`
}


// ==============================================
/**
 * Create a generic `NonEmptyArray` type that represents 
 * Arrays that contain at least one element.
 */
 namespace nonEmptyArray {
  type NonEmptyArray<T> = [T, ...T[]];

  function sendMail(addresses: NonEmptyArray<string>) {
    /* ... */
  }

  sendMail(["123 5th Ave"]); // ✅
  sendMail(["75 rue Quincampoix", "75003 Paris"]); // ✅
  // @ts-expect-error
  sendMail([]);
  //       ^ ❌ `[]` isn't assignable to `NonEmptyList<string>`
}
// ==============================================
/**
 * Implement a generic that gets the length
 * of a tuple type.
 *
 * Hint: 
 * How would you get the length of an array in JavaScript?
 * The type-level version is very similar :)
 */
 namespace length {
  type Length<tuple extends any[]> = TODO;

  type res1 = Length<[]>;
  type test1 = Expect<Equal<res1, 0>>;

  type res2 = Length<[any]>;
  type test2 = Expect<Equal<res2, 1>>;

  type res3 = Length<[any, any]>;
  type test3 = Expect<Equal<res3, 2>>;

  type res4 = Length<[any, any, any]>;
  type test4 = Expect<Equal<res4, 3>>;
}
// ==============================================

/**
 * Implement a generic that gets the length
 * of a tuple type.
 *
 * Hint: 
 * How would you get the length of an array in JavaScript?
 * The type-level version is very similar :)
 */
 namespace length {
  type Length<tuple extends any[]> = tuple["length"];

  type res1 = Length<[]>;
  type test1 = Expect<Equal<res1, 0>>;

  type res2 = Length<[any]>;
  type test2 = Expect<Equal<res2, 1>>;

  type res3 = Length<[any, any]>;
  type test3 = Expect<Equal<res3, 2>>;

  type res4 = Length<[any, any, any]>;
  type test4 = Expect<Equal<res4, 3>>;
}


// ==============================================

/**
 * Implement a generic that gets the length
 * of a tuple type, and adds one to it.
 *
 * This challenge may seem a bit random, but
 * this is actually the basis of representing
 * numbers and doing arithmetics at the type level!
 */
 namespace lengthPlusOne {
  type LengthPlusOne<tuple extends any[]> = TODO;

  type res1 = LengthPlusOne<[]>;
  type test1 = Expect<Equal<res1, 1>>;

  type res2 = LengthPlusOne<[any]>;
  type test2 = Expect<Equal<res2, 2>>;

  type res3 = LengthPlusOne<[any, any]>;
  type test3 = Expect<Equal<res3, 3>>;

  type res4 = LengthPlusOne<[any, any, any]>;
  type test4 = Expect<Equal<res4, 4>>;
}

// ==============================================
/**
 * Implement a generic that gets the length
 * of a tuple type, and adds one to it.
 *
 * This challenge may seem a bit random, but
 * this is actually the basis of representing
 * numbers and doing arithmetics at the type level!
 */
 namespace lengthPlusOne {
  type LengthPlusOne<tuple extends any[]> = [...tuple, any]["length"];

  type res1 = LengthPlusOne<[]>;
  type test1 = Expect<Equal<res1, 1>>;

  type res2 = LengthPlusOne<[any]>;
  type test2 = Expect<Equal<res2, 2>>;

  type res3 = LengthPlusOne<[any, any]>;
  type test3 = Expect<Equal<res3, 3>>;

  type res4 = LengthPlusOne<[any, any, any]>;
  type test4 = Expect<Equal<res4, 4>>;
}

