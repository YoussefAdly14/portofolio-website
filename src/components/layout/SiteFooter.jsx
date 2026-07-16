import { Link } from 'react-router-dom';

function SiteFooter() {
  return (
    <footer className="bg-ink px-5 pb-[calc(3rem+env(safe-area-inset-bottom))] pt-2 text-white sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-5 border-t border-white/10 pt-8 text-slate-300 sm:flex-row sm:items-center">
        <p className="max-w-2xl text-sm leading-7">Want the shorter profile or direct contact details?</p>
        <div className="flex flex-wrap gap-x-5 gap-y-3">
          <Link to="/about" className="text-sm font-semibold text-white underline-offset-4 transition hover:text-cyan-100 hover:underline">
            About me
          </Link>
          <Link to="/contact" className="text-sm font-semibold text-white underline-offset-4 transition hover:text-cyan-100 hover:underline">
            Contact & CV
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
