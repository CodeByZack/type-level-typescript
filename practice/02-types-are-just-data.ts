/**
 * Type the `move` function so that the `direction`
 * parameter can only be assigned to "backward" or "forward".
 */
 namespace move {
  function move(direction: TODO) {
    // some imaginary code that makes the thing move!
  }

  // ✅
  move('backward');

  // ✅
  move('forward');

  // @ts-expect-error: ❌ not supported
  move('left');

  // @ts-expect-error: ❌ not supported
  move('right');
}

// ==============================================

/**
 * Type the `move` function so that the `direction`
 * parameter can only be assigned to "backward" or "forward".
 */
namespace move {
  function move(direction: 'backward' | 'forward') {
    // some imaginary code that makes the thing move!
  }

  // ✅
  move('backward');

  // ✅
  move('forward');

  // @ts-expect-error: ❌ not supported
  move('left');

  // @ts-expect-error: ❌ not supported
  move('right');
}

// ==============================================

/**
 * `pickOne` takes 2 arguments of potentially different
 * types and return either one or the other at random.
 * Make  generic!
 */
namespace pickOne {
  function pickOne(a: TODO, b: TODO): TODO {
    return Math.random() > 0.5 ? a : b;
  }

  const res1 = pickOne(true, false);
  type test1 = Expect<Equal<typeof res1, boolean>>;

  const res2 = pickOne(1, 2);
  type test2 = Expect<Equal<typeof res2, 1 | 2>>;

  const res3 = pickOne(2, 'some string');
  type test3 = Expect<Equal<typeof res3, 2 | 'some string'>>;

  const res4 = pickOne(true, 7);
  type test4 = Expect<Equal<typeof res4, true | 7>>;
}

// ==============================================

/**
 * `pickOne` takes 2 arguments of potentially different
 * types and return either one or the other at random.
 * Make  generic!
 */
namespace pickOne {
  function pickOne<A, B>(a: A, b: B): A | B {
    return Math.random() > 0.5 ? a : b;
  }

  const res1 = pickOne(true, false);
  type test1 = Expect<Equal<typeof res1, boolean>>;

  const res2 = pickOne(1, 2);
  type test2 = Expect<Equal<typeof res2, 1 | 2>>;

  const res3 = pickOne(2, 'some string');
  type test3 = Expect<Equal<typeof res3, 2 | 'some string'>>;

  const res4 = pickOne(true, 7);
  type test4 = Expect<Equal<typeof res4, true | 7>>;
}

// ==============================================

/**
 * The `merge` function accepts an object of type `A`
 * and an object of type `B`, and return an object
 * with all properties of `A` and `B`.
 * Make it generic!
 */
namespace merge {
  function merge(a: TODO, b: TODO): TODO {
    return { ...a, ...b };
  }

  const res1 = merge({ name: 'Bob' }, { age: 42 });
  type test1 = Expect<Equal<typeof res1, { name: string } & { age: number }>>;

  const res2 = merge({ greeting: 'Hello' }, {});
  type test2 = Expect<Equal<typeof res2, { greeting: string }>>;

  const res3 = merge({}, { greeting: 'Hello' });
  type test3 = Expect<Equal<typeof res3, { greeting: string }>>;

  const res4 = merge({ a: 1, b: 2 }, { c: 3, d: 4 });
  type test4 = Expect<
    Equal<typeof res4, { a: number; b: number } & { c: number; d: number }>
  >;
}

// ==============================================

/**
 * The `merge` function accepts an object of type `A`
 * and an object of type `B`, and return an object
 * with all properties of `A` and `B`.
 * Make it generic!
 */
namespace merge {
  function merge<A, B>(a: A, b: B): A & B {
    return { ...a, ...b };
  }

  const res1 = merge({ name: 'Bob' }, { age: 42 });
  type test1 = Expect<Equal<typeof res1, { name: string } & { age: number }>>;

  const res2 = merge({ greeting: 'Hello' }, {});
  type test2 = Expect<Equal<typeof res2, { greeting: string }>>;

  const res3 = merge({}, { greeting: 'Hello' });
  type test3 = Expect<Equal<typeof res3, { greeting: string }>>;

  const res4 = merge({ a: 1, b: 2 }, { c: 3, d: 4 });
  type test4 = Expect<
    Equal<typeof res4, { a: number; b: number } & { c: number; d: number }>
  >;
}

// ==============================================

/**
 * Type `debounceFn` as a function with a `cancel` method on it.
 *
 * Hint: To tell TS a variable is a function, you can either
 * use the type `Function` or `(() => void)`.
 */
namespace debouncedFn {
  let debouncedFn: TODO;

  debouncedFn = Object.assign(() => {}, { cancel: () => {} });

  // ✅
  debouncedFn();

  // ✅
  debouncedFn.cancel();

  // ❌ `unknownMethod` does not exist on `debouncedFn`.
  // @ts-expect-error
  debouncedFn.unknownMethod();

  // ❌ can't assign a string to `debouncedFn`.
  // @ts-expect-error: ❌
  debouncedFn = 'Hello';
}

// ==============================================
/**
 * Type `debounceFn` as a function with a `cancel` method on it.
 *
 * Hint: To tell TS a variable is a function, you can either
 * use the type `Function` or `(() => void)`.
 */
namespace debouncedFn {
  let debouncedFn: Function & { cancel: Function };
  // OR
  // let debouncedFn: (() => void) & { cancel: () => void };

  debouncedFn = Object.assign(() => {}, { cancel: () => {} });

  // ✅
  debouncedFn();

  // ✅
  debouncedFn.cancel();

  // ❌ `unknownMethod` does not exist on `debouncedFn`.
  // @ts-expect-error
  debouncedFn.unknownMethod();

  // ❌ can't assign a string to `debouncedFn`.
  // @ts-expect-error: ❌
  debouncedFn = 'Hello';
}

// ==============================================

/**
 * Type the `stringify` function to take any kind of input.
 *
 * Don't use `any`!
 */
namespace stringify {
  function stringify(input: TODO) {
    return input instanceof Symbol ? input.toString() : `${input}`;
  }

  stringify('a string'); // ✅
  stringify(12); // ✅
  stringify(true); // ✅
  stringify(Symbol('cat')); // ✅
  stringify(20000n); // ✅
}

// ==============================================
/**
 * Type the `stringify` function to take any kind of input.
 *
 * Don't use `any`!
 */
namespace stringify {
  function stringify(input: unknown) {
    return input instanceof Symbol ? input.toString() : `${input}`;
  }

  stringify('a string'); // ✅
  stringify(12); // ✅
  stringify(true); // ✅
  stringify(Symbol('cat')); // ✅
  stringify(20000n); // ✅
}

// ==============================================

/**
 * Type the `exhaustive` function so that it cannot be
 * be called except in unreachable code branches.
 */
namespace exhaustive {
  function exhaustive(...args: TODO) {}

  const HOURS_PER_DAY = 24;
  // Since `HOURS_PER_DAY` is a `const`, the next
  // condition can never happen
  // ✅
  if (HOURS_PER_DAY !== 24) exhaustive(HOURS_PER_DAY);

  // Outside of the condition, this should
  // return a type error.
  // @ts-expect-error ❌
  exhaustive(HOURS_PER_DAY);

  const exhautiveCheck = (input: 1 | 2) => {
    switch (input) {
      case 1:
        return '!';
      case 2:
        return '!!';
      // Since all cases are handled, the default
      // branch is unreachable.
      // ✅
      default:
        exhaustive(input);
    }
  };

  const nonExhautiveCheck = (input: 1 | 2) => {
    switch (input) {
      case 1:
        return '!';
      // the case where input === 2 isn't handled,
      // so `exhaustive` shouldn't be called.
      // @ts-expect-error ❌
      default:
        exhaustive(input);
    }
  };
}

// ==============================================

/**
 * Type the `exhaustive` function to only take values
 * that cannot exist at runtime.
 */
namespace exhaustive {
  function exhaustive(...args: never) {}

  const HOURS_PER_DAY = 24;
  // ✅
  if (HOURS_PER_DAY !== 24) exhaustive(HOURS_PER_DAY);

  // Outside of the condition, this should
  // return a type error.
  // @ts-expect-error ❌
  exhaustive(HOURS_PER_DAY);

  // the `exhautive` function lets us check that
  // all cases have been handled in a conditional
  // statement. It's pretty useful in real codebases!
  const exhautiveCheck = (input: 1 | 2) => {
    switch (input) {
      case 1:
        return '!';
      case 2:
        return '!!';
      // Since all cases are handled, the default
      // branch is unreachable.
      // ✅
      default:
        exhaustive(input);
    }
  };

  const nonExhautiveCheck = (input: 1 | 2) => {
    switch (input) {
      case 1:
        return '!';
      // the case where input === 2 isn't handled,
      // so `exhaustive` shouldn't be called.
      // @ts-expect-error ❌
      default:
        exhaustive(input);
    }
  };
}
