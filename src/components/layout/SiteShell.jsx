import { Outlet, useLocation } from 'react-router-dom';
import PillNav from '../navigation/PillNav.jsx';
import ScrollToTop from './ScrollToTop.jsx';
import navigation from '../../data/navigation.json';
import logo from '../../assets/icons/logo.svg';

function getActiveHref(pathname) {
  if (pathname.startsWith('/projects')) return '/projects';

  const exact = navigation.find(item => item.href === pathname);
  if (exact) return exact.href;

  const nested = navigation
    .filter(item => item.href !== '/' && pathname.startsWith(item.href))
    .sort((a, b) => b.href.length - a.href.length)[0];

  return nested?.href || '/';
}

function SiteShell() {
  const { pathname } = useLocation();

  return (
    <>
      <ScrollToTop />
      <header className="fixed inset-x-0 top-0 z-50">
        <PillNav
          logo={logo}
          logoAlt="Youssef Adly logo"
          items={navigation}
          activeHref={getActiveHref(pathname)}
          baseColor="#F8FAFC"
          pillColor="#111827"
          pillTextColor="#F8FAFC"
          hoveredPillTextColor="#09090B"
        />
      </header>
      <Outlet />
    </>
  );
}

export default SiteShell;
