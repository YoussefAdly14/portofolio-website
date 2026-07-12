import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa6';
import BorderGlow from '../ui/BorderGlow.jsx';

function HomePreviewCard({ section, metric }) {
  return (
    <BorderGlow
      className="h-full min-h-[250px] overflow-hidden"
      borderRadius={8}
      backgroundColor="rgba(13, 17, 29, 0.82)"
      glowColor="195 90 70"
      glowRadius={22}
      glowIntensity={0.7}
      fillOpacity={0.22}
    >
      <article className="flex h-full flex-col justify-between gap-8 p-6 sm:p-7">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200/80">{section.eyebrow}</p>
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-white">{section.title}</h2>
            <p className="text-sm leading-7 text-slate-300">{section.summary}</p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          {metric ? <span className="text-sm font-medium text-white/70">{metric}</span> : <span />}
          <Link
            to={section.href}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-cyan-100"
            aria-label={`${section.actionLabel}: ${section.title}`}
          >
            {section.actionLabel}
            <FaArrowRight aria-hidden="true" className="text-xs" />
          </Link>
        </div>
      </article>
    </BorderGlow>
  );
}

export default HomePreviewCard;
