import { IPostItem } from '../postInfos';
import { IconLogo } from './Icons';

interface IFooter {
  next: IPostItem;
  prev: IPostItem;
}

const Footer = (props: IFooter) => {
  const { next, prev } = props;
  return (
    <footer className="flex md:flex-row md:flex-wrap flex-col-reverse items-center justify-center w-full relative">
      <a
        className="gradientUnderline_hoverElement flex flex-col justify-center md:min-w-fit md:w-1/2 w-full md:h-60 px-12 justify-self-start border-t last:border-l md:py-0 cursor-pointer py-12 md:py-6"
        href={prev?.link}
      >
        <p className="x-text leading-relaxed text-lg">
          <span className="text-2xl">⟸ </span>Previous
        </p>
        <div className="inline-flex items-center">
          <h4 className="relative x-text font-black leading-normal text-xl gradientUnderline_underlined__G_aI8 anchor_anchorHover">
            {prev?.title}
          </h4>
        </div>
      </a>
      <a
        className="gradientUnderline_hoverElement flex flex-col justify-center md:min-w-fit md:w-1/2 w-full md:h-60 px-12 justify-self-start border-t last:border-l md:py-0 cursor-pointer py-12 md:py-6"
        href={next?.link}
      >
        <p className="x-text leading-relaxed text-lg">
          Next<span className="text-2xl"> ⟹</span>
        </p>
        <div className="inline-flex items-center">
          <h4 className="relative x-text font-black leading-normal text-xl gradientUnderline_underlined__G_aI8 anchor_anchorHover">
            {next?.title}
          </h4>
        </div>
      </a>
    </footer>
  );
};

const Header = () => {
  return (
    <header className="sm:h-16 h-16 relative shadow-sm">
      <div className="container mx-auto max-w-3xl xl:max-w-4xl xl:px-12 px-6 flex items-center justify-self-center pl-4 pr-4">
        <a
          className="sm:h-16 h-16 flex flex-row items-center w-64 mr-16"
          href="/"
        >
          <IconLogo className="h-full cursor-pointer" />
        </a>
      </div>
    </header>
  );
};

const Content = (props: {
  children: React.ReactNode;
  next?: IPostItem;
  prev?: IPostItem;
}) => {
  const { children, next, prev } = props;
  return (
    <>
      <Header />
      <main
        className="container mx-auto max-w-3xl xl:max-w-4xl xl:px-12 px-6 pb-20 post-layout_postLayout"
        data-page-index="1."
      >
        {children}
      </main>
      {(next || prev) && <Footer next={next} prev={prev} />}
    </>
  );
};

export default Content;
