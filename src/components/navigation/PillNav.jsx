import { useState } from 'react';
import { Link } from 'react-router-dom';

const isExternalLink = href =>
  href.startsWith('http://') ||
  href.startsWith('https://') ||
  href.startsWith('//') ||
  href.startsWith('mailto:') ||
  href.startsWith('tel:') ||
  href.startsWith('#');

const isRouterLink = href => href && !isExternalLink(href);

const PillNav = ({
  logo,
  logoAlt = 'Logo',
  items,
  activeHref,
  className = '',
  baseColor = '#fff',
  pillColor = '#120F17',
  hoveredPillTextColor = '#120F17',
  pillTextColor
}) => {
  const resolvedPillTextColor = pillTextColor ?? baseColor;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const cssVars = {
    '--base': baseColor,
    '--pill-bg': pillColor,
    '--hover-text': hoveredPillTextColor,
    '--pill-text': resolvedPillTextColor,
    '--nav-h': '42px'
  };

  const handleLogoButtonClick = () => {
    if (window.matchMedia('(min-width: 768px)').matches) {
      setIsNavCollapsed(prev => !prev);
      return;
    }

    setIsMobileMenuOpen(prev => !prev);
  };

  const renderNavItem = (item, variant = 'desktop') => {
    const isActive = activeHref === item.href;
    const isMobile = variant === 'mobile';
    const linkClasses = isMobile
      ? [
          'relative flex min-h-12 w-full items-center justify-between rounded-lg px-4 py-3 text-left text-sm font-bold uppercase leading-tight',
          'tracking-normal no-underline transition-all duration-200 ease-out',
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white',
          isActive
            ? 'bg-white text-ink'
            : 'bg-white/[0.07] text-white hover:bg-white/14'
        ].join(' ')
      : [
          'relative inline-flex h-full items-center justify-center rounded-full px-5 text-[15px] font-bold uppercase leading-none',
          'tracking-normal no-underline whitespace-nowrap transition-all duration-200 ease-out',
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white',
          isActive
            ? 'bg-white text-ink shadow-[0_0_0_1px_rgba(255,255,255,0.72)]'
            : 'bg-[var(--pill-bg)] text-[var(--pill-text)] hover:bg-white hover:text-[var(--hover-text)] hover:-translate-y-0.5'
        ].join(' ');

    const content = (
      <>
        <span>{item.label}</span>
        {isMobile && <span className="text-base leading-none opacity-60" aria-hidden="true">/</span>}
        {!isMobile && isActive && (
          <span
            className="absolute left-1/2 -bottom-[8px] h-3 w-3 -translate-x-1/2 rounded-full bg-white"
            aria-hidden="true"
          />
        )}
      </>
    );

    if (isRouterLink(item.href)) {
      return (
        <Link
          key={item.href}
          to={item.href}
          className={linkClasses}
          aria-current={isActive ? 'page' : undefined}
          aria-label={item.ariaLabel || item.label}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          {content}
        </Link>
      );
    }

    return (
      <a
        key={item.href}
        href={item.href}
        className={linkClasses}
        aria-current={isActive ? 'page' : undefined}
        aria-label={item.ariaLabel || item.label}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        {content}
      </a>
    );
  };

  return (
    <div className="absolute left-0 top-[max(1rem,env(safe-area-inset-top))] z-[1000] w-full md:w-auto md:left-4">
      <nav
        className={`box-border flex w-full items-start justify-between gap-2 px-4 md:w-max md:justify-start md:px-0 ${className}`}
        aria-label="Primary"
        style={cssVars}
      >
        <button
          type="button"
          aria-label={isMobileMenuOpen || !isNavCollapsed ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMobileMenuOpen || !isNavCollapsed}
          onClick={handleLogoButtonClick}
          className="inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border-0 bg-[var(--base)] p-2 transition hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          style={{ width: 'var(--nav-h)', height: 'var(--nav-h)' }}
        >
          <img src={logo} alt={logoAlt} className="block h-full w-full object-cover" />
        </button>

        <div
          className={[
            'hidden h-[var(--nav-h)] items-center overflow-hidden rounded-full bg-white p-[3px] transition-all duration-300 ease-out md:flex',
            isNavCollapsed ? 'ml-0 max-w-0 opacity-0' : 'ml-1 max-w-[1500px] opacity-100'
          ].join(' ')}
        >
          <div role="menubar" className="flex h-full list-none items-stretch gap-[3px]">
            {items.map(item => (
              <div key={item.href} role="none" className="flex h-full">
                {renderNavItem(item)}
              </div>
            ))}
          </div>
        </div>

      </nav>

      {isMobileMenuOpen && (
        <div
          className="fixed left-4 right-4 top-[calc(max(1rem,env(safe-area-inset-top))+3.5rem)] z-[998] max-h-[calc(100dvh-6rem)] overflow-y-auto rounded-lg border border-white/12 bg-ink/95 p-2 shadow-[0_18px_48px_rgba(0,0,0,0.38)] backdrop-blur-xl md:hidden"
          style={cssVars}
        >
          <div className="flex flex-col gap-2">{items.map(item => renderNavItem(item, 'mobile'))}</div>
        </div>
      )}
    </div>
  );
};

export default PillNav;
