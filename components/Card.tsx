import { IPostItem, PostArrary } from '../postInfos';

const Card = (props: IPostItem) => {
  const { link, title, desc, index } = props;

  return (
    <a className="p-8 pb-9 group relative chapter-card" href={link}>
      <p className="x-text leading-relaxed text-lg my-5 absolute text-slate-50 x-font-sans font-black opacity -z-0 chapter-card-index">
        {index}
      </p>
      <h3 className="relative x-text font-black leading-normal text-2xl mt-12 mb-6 text-slate-50 anchor_anchorHover">
        {title}
      </h3>
      <p className="x-text leading-relaxed text-lg mt-5 text-slate-50 mb-0">
        {desc}
      </p>
    </a>
  );
};

export const PostCards = (props: { data: IPostItem[] }) => {
  const { data = PostArrary.slice(1) } = props;
  return (
    <div className="chapter-card-container flex flex-wrap">
      {data.map((d) => (
        <Card key={d.title} {...d} />
      ))}
    </div>
  );
};

export default Card;
