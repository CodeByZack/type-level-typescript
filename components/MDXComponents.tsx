const H1 = (props: any) => {
  return (
    <h1
      className="relative x-text font-black text-5xl md:text-6xl md:leading-normal my-8"
      {...props}
    />
  );
};

const H2 = (props: any) => {
  return (
    <h2
      className="relative x-text font-black leading-normal text-3xl mt-16 mb-6"
      {...props}
    />
  );
};
const H3 = (props: any) => {
  return (
    <h3
      className="relative x-text font-black leading-normal text-2xl mt-12 mb-6"
      {...props}
    />
  );
};

const P = (props: any) => {
  return <p className="x-text leading-relaxed text-lg my-5" {...props} />;
};

const UL = (props: any) => {
  return <ul className="list-disc ml-10 text-lg" {...props} />;
};

const LI = (props: any) => {
  return <li className="text-lg my-2" {...props} />;
};
const A = (props: any) => {
  return <a className="underline" {...props} />;
};

const MDXComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  p: P,
  ul: UL,
  li: LI,
  a: A,
  // pre: Pre,
  // code: InlineCode,
};

export default MDXComponents;
