import { IPostItem, PostArrary } from '../postInfos';
import { IconT } from './Icons';

const NavItem = (props: IPostItem) => {
  const { link, title, index } = props;
  return (
    <li>
      <a
        className="py-3 flex items-center sidebar_sidebarItem gradientUnderline_hoverElement"
        href={link}
      >
        <div className="sidebar_line"></div>
        <div className="mr-4 sidebar_dot"></div>
        <span className="gradientUnderline_underlined">
          {index}.{title}
        </span>
      </a>
    </li>
  );
};

const Nav = () => {
  return (
    <>
      <div className="h-16 mt-1 flex items-center">
        <IconT />
      </div>
      <div>
        <h2 className="relative x-text font-black leading-normal text-3xl !mt-8 !mb-3 gradientUnderline_underlined anchor_anchorHover">
          <span className="gradientUnderline_hoverElement">
            <a
              href="/00-introduction#chapters"
              className="underline x-link whitespace-nowrap no-underline gradientUnderline_underlined"
            >
              Chapters
            </a>
          </span>
        </h2>
        <ul className="flex-col flex-wrap gap-5 font-black x-font-sans text-md sidebar_sidebarList">
          {PostArrary.map((n, i) => (
            <NavItem {...n} index={i} />
          ))}
        </ul>
      </div>
      <div>
        <h2 className="relative x-text font-black leading-normal text-3xl !mt-8 !mb-3 gradientUnderline_underlined__G_aI8 anchor_anchorHover__yWSjs">
          <span className="gradientUnderline_hoverElement__71Cxo">
            <a
              href="/about"
              className="underline x-link whitespace-nowrap no-underline gradientUnderline_underlined__G_aI8"
            >
              About
            </a>
          </span>
        </h2>
      </div>
      <div>
        <p className="x-text leading-relaxed text-lg text-base">
          Made with ❤️ by
          <span className="gradientUnderline_hoverElement">
            <a
              href="https://twitter.com/GabrielVergnaud"
              target="_blank"
              rel="nofollow"
              className="underline x-link whitespace-nowrap gradientUnderline_underlined"
            >
              @GabrielVergnaud
            </a>
          </span>
        </p>
      </div>
    </>
  );
};

export default Nav;
