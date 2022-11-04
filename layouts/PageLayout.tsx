import { MDXProvider } from '@mdx-js/react';
import Content from '../components/Content';
import MDXComponents from '../components/MDXComponents';
import { PostNav } from '../components/Nav';
import { IPostItem } from '../postInfos';
import DrawerLayout from './DrawerLayout';

const PageLayout = (props: {
  children: React.ReactNode;
  next?: IPostItem;
  prev?: IPostItem;
}) => {
  const { children, next, prev } = props;

  return (
    <MDXProvider components={MDXComponents}>
      <DrawerLayout
        nav={<PostNav />}
        content={
          <Content next={next} prev={prev}>
            {children}
          </Content>
        }
      />
    </MDXProvider>
  );
};

export default PageLayout;
