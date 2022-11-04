// 一个简单的Javascript函数:
function sum(a, b) {
  return a + b;
}

// ==============================================

// 使用类型注释:
function sumByTs(a: number, b: number): number {
  return a + b;
}

// ==============================================

// 使用类型编程:
function genericFunction<A, B>(a: A, b: B): DoSomething<A, B> {
  return doSomething(a, b);
}

// ==============================================

// 这是一个类型级函数:
type DoSomething<A, B> = ...

// 这是一个值函数:
const doSomething = (a, b) => ...

// ==============================================

type SomeFunction<A, B> = [A, B];
/*                ----    ------
                   ^         \
                 类型参数      返回类型

     \-------------------------/
                 ^
                泛型
*/

// ==============================================
namespace challenge {
  // 1. 实现一个泛型
  type GetAllKeys<obj> = TODO;

  type res1 = GetAllKeys<{ a: number }>;
  type test1 = Expect<Equal<res1, "a">>;
}

// ==============================================


// @ts-expect-error ✅ this type-checks because
let x: number = "Hello"; // this line does not.

// @ts-expect-error ❌ this doesn't type-check because
let y: number = 2; // this line does!


// ==============================================

/**
 * 1. The `identity` function takes a value of any type
 *    and returns it. Make it generic!
 */
 namespace genericFunctionTODO {

  function identity(a: TODO): TODO {
    return a;
  }

  let input1 = 10;
  let res1 = identity(input1);
  
  type test1 = Expect<Equal<typeof res1, number>>;

  let input2 = "Hello";
  let res2 = identity(input2);
  
  type test2 = Expect<Equal<typeof res2, string>>;

}


// ==============================================

/**
 * 1. The `identity` function takes a value of any type
 *    and returns it. Make it generic!
 */
 namespace genericFunctionDone {

  function identity<T>(a: T): T {
    return a;
  }

  let input1 = 10;
  let res1 = identity(input1);
  
  type test1 = Expect<Equal<typeof res1, number>>;

  let input2 = "Hello";
  let res2 = identity(input2);
  
  type test2 = Expect<Equal<typeof res2, string>>;

}


// ==============================================

/**
 * 2. `safeHead` takes an array, a default value
      and returns the first element of the array
      if it isn't empty. Make it generic!
 */
namespace safeHead {

  function safeHead(array: TODO[], defaultValue: TODO): TODO {
    return array[0] ?? defaultValue;
  }

  let input1 = [1, 2, 3];
  let res1 = safeHead(input1, 0);
  
  type test1 = Expect<Equal<typeof res1, number>>;

  let input2 = ["Hello", "Hola", "Bonjour"];
  let res2 = safeHead(input2, "Hi");
  
  type test2 = Expect<Equal<typeof res2, string>>;

}
      
// ==============================================


/**
 * 2. `safeHead` takes an array, a default value
      and returns the first element of the array
      if it isn't empty. Make it generic!
 */
namespace safeHead {

  function safeHead<A>(array: A[], defaultValue: A): A {
    return array[0] ?? defaultValue;
  }

  let input1 = [1, 2, 3];
  let res1 = safeHead(input1, 0);
  
  type test1 = Expect<Equal<typeof res1, number>>;

  let input2 = ["Hello", "Hola", "Bonjour"];
  let res2 = safeHead(input2, "Hi");
  
  type test2 = Expect<Equal<typeof res2, string>>;

}
      

// ==============================================

/**
 * 3. `map` transforms all values in an array to a value of
 *    different type. Make it generic!
 */
 namespace map {

  function map(array: TODO[], fn: (value: TODO) => TODO): TODO[] {
    return array.map(fn);
  }

  let input1 = [1, 2, 3];
  let res1 = map(input1, value => value.toString());
  
  type test1 = Expect<Equal<typeof res1, string[]>>;

  let input2 = ["Hello", "Hola", "Bonjour"];
  let res2 = map(input2, str => str.length);
  
  type test2 = Expect<Equal<typeof res2, number[]>>;

}


// ==============================================

/**
 * 3. `map` transforms all values in an array to a value of
 *    different type. Make it generic!
 */
 namespace map {

  function map<A, B>(array: A[], fn: (value: A) => B): B[] {
    return array.map(fn);
  }

  let input1 = [1, 2, 3];
  let res1 = map(input1, value => value.toString());
  
  type test1 = Expect<Equal<typeof res1, string[]>>;

  let input2 = ["Hello", "Hola", "Bonjour"];
  let res2 = map(input2, str => str.length);
  
  type test2 = Expect<Equal<typeof res2, number[]>>;

}


// ==============================================

/**
 * 4. `pipe2` takes a value and pipes it into 2 functions
 *    sequentially. For example, `pipe2(x, f1, f2)` will
 *    result in `f2(f1(x))`. Make it generic!
 *    
 */
 namespace pipe2 {

  function pipe2(
    x: TODO,
    f1: (value: TODO) => TODO,
    f2: (value: TODO) => TODO
  ): TODO {
    return f2(f1(x));
  }

  let res1 = pipe2(
    [1, 2, 3],
    arr => arr.length,
    length => `length: ${length}`
  );

  type test1 = Expect<Equal<typeof res1, string>>;

  let res2 = pipe2(
    { name: 'Alice' },
    user => user.name,
    name => name.length > 5
  );
  
  type test2 = Expect<Equal<typeof res2, boolean>>;

}


// ==============================================

/**
 * 4. `pipe2` takes a value and pipes it into 2 functions
 *    sequentially. For example, `pipe2(x, f1, f2)` will
 *    result in `f2(f1(x))`. Make it generic!
 *    
 */
 namespace pipe2 {

  function pipe2<A, B, C>(
    x: A,
    f1: (value: A) => B,
    f2: (value: B) => C
  ): C {
    return f2(f1(x));
  }


  let res1 = pipe2(
    [1, 2, 3],
    arr => arr.length,
    length => `length: ${length}`
  );

  type test1 = Expect<Equal<typeof res1, string>>;

  let res2 = pipe2(
    { name: 'Alice' },
    user => user.name,
    name => name.length > 5
  );
  
  type test2 = Expect<Equal<typeof res2, boolean>>;

}


// ==============================================


// ==============================================




// ==============================================