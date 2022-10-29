/**
 * Try assigning "World" to `type Hello`!
 */
type Hello = '';

// Type-level unit tests!
// If the next line type-checks, you solved this challenge!
type test1 = Expect<Equal<Hello, 'World'>>;

// ==============================================

/**
 * Try assigning "World" to `type Hello`!
 */
type Hello = 'World';

// Type-level unit tests!
// If the next line type-checks, you solved this challenge!
type test1 = Expect<Equal<Hello, 'World'>>;

// ==============================================

// ✅ this is correct 👌
navigate('user/:userId', { userId: '2' });

// ✅ Looks good! `dashboardId` is optional.
navigate('user/:userId/dashboard(/:dashboardId)', { userId: '2' });

// ❌ `userId` is missing. Add one to fix the error!
navigate('user/:userId/dashboard(/:dashboardId)', { dashboardId: '2' });

// ❌ `oops` isn't a parameter. Remove it to fix the error!
navigate('user/:userId/dashboard(/:dashboardId)', { userId: '2', oops: ':(' });

// 👇 Scroll to see how this works!

// 🤫 Here are the kind of things you will soon be able to do!
type ParseUrlParams<url> = url extends `${infer path}(${infer optionalPath})`
  ? ParseUrlParams<path> & Partial<ParseUrlParams<optionalPath>>
  : url extends `${infer start}/${infer rest}`
  ? ParseUrlParams<start> & ParseUrlParams<rest>
  : url extends `:${infer param}`
  ? { [k in param]: string }
  : {};

// navigate to a different route
function navigate<T extends string>(path: T, params: ParseUrlParams<T>) {
  // interpolate params
  let url = Object.entries<string>(params).reduce<string>(
    (path, [key, value]) => path.replace(`:${key}`, value),
    path
  );

  // clean url
  url = url.replace(/(\(|\)|\/?:[^\/]+)/g, '');

  // update url
  history.pushState({}, '', url);
}
