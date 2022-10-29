import Head from 'next/head';
import DrawerLayout from '../layouts/DrawerLayout';
import Nav from '../components/Nav';
import Content from '../components/Content';

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
      </Head>
      <DrawerLayout nav={<Nav />} content={<Content />} />
    </>
  );
}
