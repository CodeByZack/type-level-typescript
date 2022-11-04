import { useMemo, useState } from 'react';
import CodeEditor from '../components/CodeEditor';
import TypeChallengeLayout from '../layouts/TypeChallengeLayout';
import { getAllChallenges, IChallenge } from '../utils/challenges';
import ReactMarkdown from 'react-markdown';
import MDXComponents from '../components/MDXComponents';
import mdxPrism from 'mdx-prism';

interface IProps {
  challenges: IChallenge[];
}

const groupBy = <T,>(items: T[], key: string) => {
  const result = items.reduce<{ [x: string]: T[] }>((acc, item) => {
    if (acc[item[key]]) {
      acc[item[key]].push(item);
    } else {
      acc[item[key]] = [item];
    }
    return acc;
  }, {});
  return result;
};

const TypeChallenges = (props: IProps) => {
  const { challenges } = props;
  const [activeChallenge, setActiveChallenge] = useState(challenges[0]);

  const groupByData = useMemo(() => {
    return groupBy(challenges, 'level');
  }, [challenges]);

  console.log(groupByData);

  const renderNavList = () => {
    const levels = Object.keys(groupByData);
    return levels.map((l) => {
      const challenges = groupByData[l];
      return (
        <details>
          <summary className="cursor-pointer text-2xl font-bold">
            {l}({challenges.length})
          </summary>
          {challenges.map((v) => (
            <div
              key={v.title}
              onClick={() => {
                setActiveChallenge(v);
              }}
              className="text-xl hover:underline cursor-pointer ml-4 mb-4"
            >
              {v.title}
            </div>
          ))}
        </details>
      );
    });
  };

  return (
    <TypeChallengeLayout navList={renderNavList()}>
      <MDXComponents.h1>{activeChallenge.title}</MDXComponents.h1>
      <details open>
        <summary className="cursor-pointer text-2xl font-bold">
          question description
        </summary>
        <ReactMarkdown rehypePlugins={[mdxPrism]} components={MDXComponents}>
          {activeChallenge.desc}
        </ReactMarkdown>
      </details>
      <CodeEditor defaultValue={[activeChallenge.challenge]} />
      <div className="mb-64"></div>
    </TypeChallengeLayout>
  );
};

export async function getStaticProps() {
  const challenges = await getAllChallenges();
  return { props: { challenges } };
}

export default TypeChallenges;
