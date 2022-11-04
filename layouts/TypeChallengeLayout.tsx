import Content from '../components/Content';
import { ChallengeNav } from '../components/Nav';
import DrawerLayout from './DrawerLayout';

const TypeChallengeLayout = (props: {
  children: React.ReactNode;
  navList: React.ReactNode;
}) => {
  const { children, navList } = props;

  return (
    <DrawerLayout
      nav={<ChallengeNav content={navList} />}
      content={<Content>{children}</Content>}
    />
  );
};

export default TypeChallengeLayout;
