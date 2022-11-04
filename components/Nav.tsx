import { IPostItem, PostArrary } from '../postInfos';
import { IconT } from './Icons';

const NavItem = (props: IPostItem) => {
  const { link, title, index } = props;
  return (
    <li>
      <a
        className="py-3 flex items-center sidebar_sidebarItem "
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

const NavTitle = (props) => {
  const { children } = props;
  return (
    <h2 className="relative x-text font-black leading-normal text-3xl !mt-8 !mb-3 gradientUnderline_underlined anchor_anchorHover">
      <span className="">
        <a
          href="/00-introduction#chapters"
          className="underline x-link whitespace-nowrap no-underline gradientUnderline_underlined"
        >
          {children}
        </a>
      </span>
    </h2>
  );
};

interface INavLayout {
  icon: React.ReactNode;
  navTitle: string;
  content: React.ReactNode;
  footer?: React.ReactNode;
}

const NavLayout = (props: INavLayout) => {
  const { icon, navTitle, content, footer } = props;
  return (
    <>
      <div className="h-16 mt-1 flex items-center">{icon}</div>
      <div>
        <NavTitle>{navTitle}</NavTitle>
        {content}
      </div>
      <div>{footer}</div>
    </>
  );
};

export const PostNav = () => {
  const content = (
    <ul className="flex-col flex-wrap gap-5 font-black x-font-sans text-md sidebar_sidebarList">
      {PostArrary.map((n, i) => (
        <NavItem {...n} key={n.link} index={i} />
      ))}
    </ul>
  );
  return <NavLayout navTitle="Chapters" icon={<IconT />} content={content} />;
};

export const ChallengeNav = (props: { content: React.ReactNode }) => {
  return (
    <NavLayout
      navTitle="Type Challenges"
      icon={<IconT />}
      content={props.content}
    />
  );
};
