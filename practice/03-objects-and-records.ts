/**
 * 1. implement a generic to get the union of all keys of an object type.
 */
 namespace keys {
  type Keys<Obj> = TODO;

  type res1 = Keys<{ a: number; b: string }>;
  type test1 = Expect<Equal<res1, "a" | "b">>;

  type res2 = Keys<{ a: number; b: string; c: unknown }>;
  type test2 = Expect<Equal<res2, "a" | "b" | "c">>;

  type res3 = Keys<{}>;
  type test3 = Expect<Equal<res3, never>>;

  type res4 = Keys<{ [k in string]: boolean }>;
  type test4 = Expect<Equal<res4, string>>;
}

// ==============================================

/**
 * 1. implement a generic to get the union of all keys of an object type.
 */
 namespace keys {
  type Keys<Obj> = keyof Obj;

  type res1 = Keys<{ a: number; b: string }>;
  type test1 = Expect<Equal<res1, "a" | "b">>;

  type res2 = Keys<{ a: number; b: string; c: unknown }>;
  type test2 = Expect<Equal<res2, "a" | "b" | "c">>;

  type res3 = Keys<{}>;
  type test3 = Expect<Equal<res3, never>>;

  type res4 = Keys<{ [k in string]: boolean }>;
  type test4 = Expect<Equal<res4, string>>;
}

// ==============================================

/**
 * 2. implement a generic to get the union of all values in an object type.
 */
 namespace valueof {
  type ValueOf<Obj> = TODO;

  type res1 = ValueOf<{ a: number; b: string }>;
  type test1 = Expect<Equal<res1, number | string>>;

  type res2 = ValueOf<{ a: number; b: string; c: boolean }>;
  type test2 = Expect<Equal<res2, number | string | boolean>>;

  type res3 = ValueOf<{}>;
  type test3 = Expect<Equal<res3, never>>;

  type res4 = ValueOf<{ [k in string]: boolean }>;
  type test4 = Expect<Equal<res4, boolean>>;
}

// ==============================================

/**
 * 2. implement a generic to get the union of all values in an object type.
 */
 namespace valueof {
  type ValueOf<Obj> = Obj[keyof Obj];

  type res1 = ValueOf<{ a: number; b: string }>;
  type test1 = Expect<Equal<res1, number | string>>;

  type res2 = ValueOf<{ a: number; b: string; c: boolean }>;
  type test2 = Expect<Equal<res2, number | string | boolean>>;

  type res3 = ValueOf<{}>;
  type test3 = Expect<Equal<res3, never>>;

  type res4 = ValueOf<{ [k in string]: boolean }>;
  type test4 = Expect<Equal<res4, boolean>>;
}

// ==============================================

/**
 * 3. Create a generic that removes the `id` key
 *    from an object type.
 */
 namespace removeId {
  type RemoveId<Obj> = TODO;

  type res1 = RemoveId<{
    id: number;
    name: string;
    age: unknown;
  }>;

  type test1 = Expect<
    Equal<res1, { name: string; age: unknown }>
  >;

  type res2 = RemoveId<{
    id: number;
    title: string;
    content: string;
  }>;

  type test2 = Expect<
    Equal<res2, { title: string; content: string }>
  >;
}


// ==============================================

/**
 * 3. Create a generic that removes the `id` key
 *    from an object type.
 */
 namespace removeId {
  type RemoveId<Obj> = Omit<Obj, "id">;

  type res1 = RemoveId<{
    id: number;
    name: string;
    age: unknown;
  }>;

  type test1 = Expect<
    Equal<res1, { name: string; age: unknown }>
  >;

  type res2 = RemoveId<{
    id: number;
    title: string;
    content: string;
  }>;

  type test2 = Expect<
    Equal<res2, { title: string; content: string }>
  >;
}


// ==============================================

/**
 * 4. combine Partial, Omit and Pick to create a generic
 *    that makes the `id` key of an object type optional.
 */
 namespace optionalId {
  /**           This is called a type constraint. 
   *            We'll learn more about them soon.
   *                         👇                      */
  type MakeIdOptional<Obj extends { id: unknown }> =
    TODO

  type res1 = MakeIdOptional<{
    id: number;
    name: string;
    age: unknown;
  }>;

  type test1 = Expect<
    Equal<res1, { id?: number } & { name: string; age: unknown }>
  >;

  type res2 = MakeIdOptional<{
    id: string;
    title: string;
    content: string;
  }>;

  type test2 = Expect<
    Equal<res2, { id?: string } & { title: string; content: string }>
  >;
}


// ==============================================
/**
 * 4. combine Partial, Omit and Pick to create a generic
 *    that makes the `id` key of an object type optional.
 */
 namespace optionalId {
  /**           This is called a type constraint. 
   *            We'll learn more about them soon.
   *                         👇                      */
  type MakeIdOptional<Obj extends { id: unknown }> =
    Partial<Pick<Obj, "id">> & Omit<Obj, "id">;

  type res1 = MakeIdOptional<{
    id: number;
    name: string;
    age: unknown;
  }>;

  type test1 = Expect<
    Equal<res1, { id?: number } & { name: string; age: unknown }>
  >;

  type res2 = MakeIdOptional<{
    id: string;
    title: string;
    content: string;
  }>;

  type test2 = Expect<
    Equal<res2, { id?: string } & { title: string; content: string }>
  >;
}

// ==============================================

/**
 * 5. Since intersections are applied recursively,
 *    how would you write an `Assign<A, B>` type-level
 *    function that matches the behavior of `{...a, ...b}`,
 *    and overrides properties of `A` with properties of `B`?
 */
 namespace assign {
  type Assign<A, B> = TODO;

  const assign = <A, B>(obj1: A, obj2: B): Assign<A, B> => ({
    ...obj1,
    ...obj2,
  });

  // Override `id`
  type res1 = Assign<{ name: string; id: number }, { id: string }>;
  type test1 = Expect<Equal<res1, { name: string } & { id: string }>>;

  // Override `age` and `role`
  type res2 = Assign<
    { name: string; age: string; role: string },
    { age: 42; role: "admin" }
  >;
  type test2 = Expect<
    Equal<res2, { name: string } & { age: 42; role: "admin" }>
  >;

  // No overlap
  type res3 = Assign<{ name: string; id: number }, { age: number }>;
  type test3 = Expect<
    Equal<res3, { name: string; id: number } & { age: number }>
  >;

  // Using type inference from values
  const res4 = assign({ name: "Bob", id: 4 }, { id: "3" });
  type test4 = Expect<Equal<typeof res4, { name: string } & { id: string }>>;
}

// ==============================================
/**
 * 5. Since intersections are applied recursively,
 *    how would you write an `Assign<A, B>` type-level
 *    function that matches the behavior of `{...a, ...b}`,
 *    and overrides properties of `A` with properties of `B`?
 */
 namespace assign {
  type Assign<A, B> = Omit<A, keyof B> & B;

  const assign = <A, B>(obj1: A, obj2: B): Assign<A, B> => ({
    ...obj1,
    ...obj2,
  });

  // Override `id`
  type res1 = Assign<{ name: string; id: number }, { id: string }>;
  type test1 = Expect<Equal<res1, { name: string } & { id: string }>>;

  // Override `age` and `role`
  type res2 = Assign<
    { name: string; age: string; role: string },
    { age: 42; role: "admin" }
  >;
  type test2 = Expect<
    Equal<res2, { name: string } & { age: 42; role: "admin" }>
  >;

  // No overlap
  type res3 = Assign<{ name: string; id: number }, { age: number }>;
  type test3 = Expect<
    Equal<res3, { name: string; id: number } & { age: number }>
  >;

  // Using type inference from values
  const res4 = assign({ name: "Bob", id: 4 }, { id: "3" });
  type test4 = Expect<Equal<typeof res4, { name: string } & { id: string }>>;
}
