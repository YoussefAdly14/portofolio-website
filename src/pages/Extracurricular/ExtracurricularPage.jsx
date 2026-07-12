import { useMemo, useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaChevronDown, FaImages } from 'react-icons/fa6';
import SideRays from '../../backgrounds/SideRays.jsx';
import BorderGlow from '../../components/ui/BorderGlow.jsx';
import activities from '../../data/activities.json';

const PAGE_SIZE = 5;

function ExperienceAccordion({ activity, isOpen, onToggle }) {
  return (
    <BorderGlow
      className="overflow-hidden"
      borderRadius={8}
      backgroundColor="rgba(13, 17, 29, 0.82)"
      glowColor="195 90 70"
      glowRadius={20}
      fillOpacity={0.16}
    >
      <article>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          className="flex w-full flex-col gap-4 p-5 text-left transition hover:bg-white/[0.02] sm:flex-row sm:items-center sm:justify-between sm:p-6"
        >
          <span className="min-w-0 space-y-2">
            <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/75">
              {activity.duration}
            </span>
            <span className="block text-2xl font-semibold text-white">{activity.position}</span>
            <span className="block text-sm font-medium text-slate-400">
              {activity.organization} | {activity.location}
            </span>
          </span>
          <span className="flex shrink-0 items-center gap-3 text-sm font-semibold text-cyan-100">
            Details
            <FaChevronDown
              aria-hidden="true"
              className={`transition duration-200 ${isOpen ? 'rotate-180' : ''}`}
            />
          </span>
        </button>

        {isOpen && (
          <div className="border-t border-white/10 px-5 pb-6 pt-5 sm:px-6">
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-4">
                <p className="text-sm leading-7 text-slate-300">{activity.description}</p>
                <ul className="space-y-3">
                  {activity.responsibilities.map(responsibility => (
                    <li key={responsibility} className="flex gap-3 text-sm leading-7 text-slate-300">
                      <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-200" />
                      <span>{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200/75">Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {activity.skills.map(skill => (
                      <span key={skill} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-slate-200">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-lg border border-dashed border-white/15 bg-white/[0.03] p-4 text-sm leading-7 text-slate-300">
                  <div className="mb-2 flex items-center gap-2 font-semibold text-white">
                    <FaImages aria-hidden="true" className="text-cyan-100" />
                    Photos coming later
                  </div>
                  This experience is ready for images when you send them. The gallery area is reserved so each activity can grow without redesigning the page.
                </div>
              </div>
            </div>
          </div>
        )}
      </article>
    </BorderGlow>
  );
}

function ExtracurricularPage() {
  const [page, setPage] = useState(0);
  const [openId, setOpenId] = useState(activities[0]?.id);
  const totalPages = Math.ceil(activities.length / PAGE_SIZE);

  const visibleActivities = useMemo(() => {
    const start = page * PAGE_SIZE;
    return activities.slice(start, start + PAGE_SIZE);
  }, [page]);

  const goToPage = nextPage => {
    const safePage = Math.min(Math.max(nextPage, 0), totalPages - 1);
    setPage(safePage);
    setOpenId(activities[safePage * PAGE_SIZE]?.id);
  };

  return (
    <main className="relative isolate min-h-screen overflow-x-hidden bg-ink px-5 pb-20 pt-32 text-white sm:px-8 lg:px-12">
      <div className="absolute inset-0 -z-20">
        <SideRays
          speed={1.3}
          rayColor1="#F5B84B"
          rayColor2="#67E8F9"
          intensity={1.25}
          spread={1.6}
          opacity={0.7}
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_72%_18%,rgba(245,184,75,0.08),transparent_30%),linear-gradient(180deg,rgba(9,9,11,0.16),#09090b_74%)]" />

      <section className="mx-auto max-w-6xl space-y-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-cyan-200/80">Extracurricular Activities</p>
            <h1 className="text-balance text-5xl font-semibold leading-[1.03] text-white sm:text-6xl">
              Leadership, events, and campus work.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-slate-300">
              A dated collection of club and university experiences. Each item expands into responsibilities, skills, and a reserved photo area for future images.
            </p>
          </div>

          <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-slate-200">
            {activities.length} experiences
          </div>
        </div>

        <div className="space-y-4">
          {visibleActivities.map(activity => (
            <ExperienceAccordion
              key={activity.id}
              activity={activity}
              isOpen={openId === activity.id}
              onToggle={() => setOpenId(current => (current === activity.id ? '' : activity.id))}
            />
          ))}
        </div>

        <div className="flex flex-col items-stretch justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
          <p className="text-sm text-slate-400">
            Showing {page * PAGE_SIZE + 1}-{Math.min((page + 1) * PAGE_SIZE, activities.length)} of {activities.length}
          </p>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => goToPage(page - 1)}
              disabled={page === 0}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/8 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/12 disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none"
            >
              <FaArrowLeft aria-hidden="true" className="text-xs" />
              Previous
            </button>
            <button
              type="button"
              onClick={() => goToPage(page + 1)}
              disabled={page >= totalPages - 1}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-ink transition hover:-translate-y-0.5 hover:bg-cyan-100 disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none"
            >
              Next
              <FaArrowRight aria-hidden="true" className="text-xs" />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ExtracurricularPage;
