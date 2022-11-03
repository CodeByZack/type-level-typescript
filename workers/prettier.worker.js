import prettier from 'prettier/standalone';

const options = {
  markdown: async () => ({
    parser: 'markdown',
    plugins: [await import('prettier/parser-markdown')],
    printWidth: 10000,
  }),
  css: async () => ({
    parser: 'css',
    plugins: [await import('prettier/parser-postcss')],
    printWidth: 100,
  }),
  javascript: async () => ({
    parser: 'babel',
    plugins: [await import('prettier/parser-babel')],
    printWidth: 100,
    semi: false,
    singleQuote: true,
  }),
  typescript: async () => ({
    parser: 'typescript',
    plugins: [await import('prettier/parser-typescript')],
    printWidth: 100,
    semi: true,
    singleQuote: true,
  }),
};

let current;

addEventListener('message', async (event) => {
  if (event.data._current) {
    current = event.data._current;
    return;
  }

  function respond(data) {
    setTimeout(() => {
      if (event.data._id === current) {
        postMessage({ _id: event.data._id, ...data });
      } else {
        postMessage({ _id: event.data._id, canceled: true });
      }
    }, 0);
  }

  const opts = await options[event.data.language]();

  try {
    respond({
      pretty: prettier.format(event.data.text, opts),
    });
  } catch (error) {
    respond({ error });
  }
});
