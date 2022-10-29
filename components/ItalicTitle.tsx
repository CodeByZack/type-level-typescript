const ItalicTitle = (props: { children: React.ReactNode }) => {
  const { children } = props;

  return <p className="my-16 text-3xl	italic text-center">{children}</p>;
};

export default ItalicTitle;
