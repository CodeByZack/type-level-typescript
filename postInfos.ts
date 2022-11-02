export interface IPostItem {
  link: string;
  title: string;
  index?: number;
  desc?: string;
}

export const PostArrary: IPostItem[] = [
  { title: 'Introduction', link: '/00-introduction', desc: '', index: 0 },
  {
    title: 'Types & values',
    link: '/01-types-and-values',
    desc: 'Similarities and differences between the language of types and the language of values.',
    index: 1,
  },
  {
    title: 'Types are just data',
    link: '/02-types-are-just-data',
    desc: "Let's take a look at the data structures at our disposal in Type-level TypeScript.",
    index: 2,
  },
  {
    title: 'Objects & Records',
    link: '/03-objects-and-records',
    desc: 'Learn how to use Object and Record types, two of the most useful data structures of Type-level TypeScript.',
    index: 3,
  },
  {
    title: 'Arrays & Tuples',
    link: '/04-arrays-and-tuples',
    desc: 'Learn how to create, use, and merge Array and Tuple types.',
    index: 4,
  },
  {
    title: 'Conditional Types',
    link: '/05-conditional-types',
    desc: "Let's create our first type-level algorithms using conditional types for code branching! Learn all about the extends and the infer keywords.",
    index: 5,
  },
  {
    title: 'Template Literal Types',
    link: '/06-template-literal-types',
    desc: 'Learn how to interpolate, parse, and generate unions of string literals.',
    index: 6,
  },
  {
    title: 'Type Challenges',
    link: '/type-challenges',
    desc: 'do some typescript challenges!',
    index: 7,
  },
];
