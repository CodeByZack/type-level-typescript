import React, { useState, useMemo } from 'react';
import { IconHamburger } from '../components/Icons';

interface IDrawLayoutProps {
  nav: React.ReactNode;
  content: React.ReactNode;
}

const DrawerLayout = (props: IDrawLayoutProps) => {
  const { nav, content } = props;
  const [open, setOpen] = useState(false);

  const drawerContainerClassName = useMemo(() => {
    if (open) return 'drawer-container-open';
    return 'drawer-container-close';
  }, [open]);

  const hamburgerClassName = useMemo(() => {
    if (open) return 'sidebar-opened';
    return '';
  }, [open]);

  return (
    <>
      <IconHamburger
        className={`sidebar-hamburger ${hamburgerClassName}`}
        onClick={() => {
          setOpen(!open);
        }}
      />

      <div
        className={`flex h-full relative drawer-container ${drawerContainerClassName}`}
      >
        <nav className="drawer-side border-r p-6 pt-0 pl-8 pb-12">{nav}</nav>
        <div className="drawer-content mx-auto">{content}</div>
      </div>
    </>
  );
};

export default DrawerLayout;
