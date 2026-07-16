import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight, FaArrowUpRightFromSquare, FaChevronDown, FaGithub, FaPlay } from 'react-icons/fa6';
import SideRays from '../../backgrounds/SideRays.jsx';
import BorderGlow from '../../components/ui/BorderGlow.jsx';
import projects from '../../data/projects.json';

const PAGE_SIZE = 5;

const MONTH_INDEX = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11,
  spring: 4,
  summer: 7,
  fall: 10,
  winter: 11,
};

function getInitialFilter(pathname) {
  if (pathname.endsWith('/personal')) return 'Personal';
  if (pathname.endsWith('/university')) return 'University';
  return 'All';
}

function getProjectDateValue(date = '') {
  const matches = [...date.matchAll(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|Spring|Summer|Fall|Winter)?\s*(\d{4})/gi)];
  const latest = matches.at(-1);

  if (!latest) return 0;

  const month = latest[1] ? MONTH_INDEX[latest[1].toLowerCase()] : 11;
  return new Date(Number(latest[2]), month, 1).getTime();
}

const orderedProjects = projects
  .map((project, index) => ({ project, index }))
  .sort((a, b) => {
    const dateDelta = getProjectDateValue(b.project.date) - getProjectDateValue(a.project.date);
    return dateDelta || a.index - b.index;
  })
  .map(({ project }) => project);

function ProjectAccordion({ project, isOpen, onToggle }) {
  const media = project.media;

  return (
    <BorderGlow
      className="overflow-hidden"
      borderRadius={8}
      backgroundColor="rgba(13, 17, 29, 0.82)"
      glowColor={project.category === 'Personal' ? '250 90 72' : '42 90 68'}
      glowRadius={20}
      fillOpacity={0.16}
    >
      <article>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          className="flex w-full min-w-0 flex-col gap-4 p-4 text-left transition hover:bg-white/[0.02] sm:p-5 lg:flex-row lg:items-center lg:justify-between lg:gap-5 lg:p-6"
        >
          <span className="flex min-w-0 gap-4">
            <span className="hidden h-20 w-24 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.04] sm:grid">
              <img src={project.image} alt="" className="h-14 w-14 object-contain" />
            </span>
            <span className="min-w-0 space-y-2">
              <span className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-200/75 sm:text-xs sm:tracking-[0.2em]">{project.date}</span>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white">
                  {project.category}
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-cyan-100">
                  {project.status}
                </span>
              </span>
              <span className="block break-words text-xl font-semibold leading-tight text-white sm:text-2xl">{project.title}</span>
              <span className="block max-w-3xl break-words text-sm leading-7 text-slate-300">{project.description}</span>
            </span>
          </span>
          <span className="flex shrink-0 items-center gap-3 text-sm font-semibold text-cyan-100">
            Details
            <FaChevronDown aria-hidden="true" className={`transition duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </span>
        </button>

        {isOpen && (
          <div className="border-t border-white/10 px-4 pb-5 pt-5 sm:px-5 sm:pb-6 lg:px-6">
            <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
              <div className="space-y-5">
                <ul className="space-y-3">
                  {project.details.map(detail => (
                    <li key={detail} className="flex gap-3 text-sm leading-7 text-slate-300">
                      <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-200" />
                      <span className="min-w-0 break-words">{detail}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map(technology => (
                    <span key={technology} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-slate-200">
                      {technology}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-ink transition hover:-translate-y-0.5 hover:bg-cyan-100 sm:flex-none"
                    >
                      View GitHub
                      <FaGithub aria-hidden="true" className="text-sm" />
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full border border-cyan-100/40 bg-cyan-100/10 px-4 py-2 text-sm font-bold text-cyan-50 transition hover:-translate-y-0.5 hover:border-cyan-100 hover:bg-cyan-100/20 sm:flex-none"
                    >
                      Live Demo
                      <FaArrowUpRightFromSquare aria-hidden="true" className="text-xs" />
                    </a>
                  )}
                </div>
              </div>

              <div className="overflow-hidden rounded-lg border border-white/10 bg-black/40">
                <div className="relative aspect-video">
                  {media?.type === 'video' ? (
                    <video
                      src={media.src}
                      poster={media.poster}
                      className="h-full w-full object-cover"
                      controls
                      muted
                      playsInline
                      preload="metadata"
                      aria-label={media.alt}
                    />
                  ) : media?.src ? (
                    <img src={media.src} alt={media.alt || `${project.title} preview`} className="h-full w-full object-cover" />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(103,232,249,0.16),transparent_38%),linear-gradient(315deg,rgba(245,184,75,0.12),transparent_42%)]" />
                      <div className="absolute inset-x-0 top-0 h-px bg-white/25" />
                      <div className="absolute inset-0 grid place-items-center p-6 text-center">
                        <div className="space-y-3">
                          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-white text-ink">
                            <FaPlay aria-hidden="true" className="ml-0.5 text-sm" />
                          </span>
                          <div>
                            <p className="font-semibold text-white">Project media slot</p>
                            <p className="mt-1 text-sm leading-6 text-slate-300">{project.mediaNote}</p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                {project.mediaNote && (
                  <p className="border-t border-white/10 px-4 py-3 text-xs leading-5 text-slate-300">{project.mediaNote}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </article>
    </BorderGlow>
  );
}

function ProjectsPage() {
  const { pathname, hash } = useLocation();
  const [filter, setFilter] = useState(getInitialFilter(pathname));
  const [page, setPage] = useState(0);
  const [openId, setOpenId] = useState('');

  useEffect(() => {
    const routeFilter = getInitialFilter(pathname);
    const targetId = decodeURIComponent(hash.replace(/^#/, ''));

    const targetProject = orderedProjects.find(project => project.id === targetId);
    const nextFilter = routeFilter === 'All' || !targetProject ? routeFilter : targetProject.category;
    const nextProjects = nextFilter === 'All' ? orderedProjects : orderedProjects.filter(project => project.category === nextFilter);
    const targetIndex = nextProjects.findIndex(project => project.id === targetId);

    window.setTimeout(() => {
      setFilter(nextFilter);

      if (targetIndex >= 0) {
        setPage(Math.floor(targetIndex / PAGE_SIZE));
        setOpenId(targetId);
        document.getElementById(targetId)?.scrollIntoView({ block: 'start', behavior: 'smooth' });
        return;
      }

      setPage(0);
      setOpenId('');
    }, 0);
  }, [pathname, hash]);

  const filteredProjects = useMemo(() => {
    if (filter === 'All') return orderedProjects;
    return orderedProjects.filter(project => project.category === filter);
  }, [filter]);

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / PAGE_SIZE));
  const visibleProjects = filteredProjects.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  const changeFilter = nextFilter => {
    setFilter(nextFilter);
    setPage(0);
    setOpenId('');
  };

  const goToPage = nextPage => {
    const safePage = Math.min(Math.max(nextPage, 0), totalPages - 1);
    setPage(safePage);
    setOpenId('');
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    });
  };

  return (
    <main className="relative isolate min-h-screen overflow-x-hidden bg-ink px-5 pb-20 pt-32 text-white sm:px-8 lg:px-12">
      <div className="absolute inset-0 -z-20">
        <SideRays speed={1.25} rayColor1="#67E8F9" rayColor2="#F5B84B" intensity={1.2} spread={1.65} opacity={0.7} />
      </div>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_72%_18%,rgba(103,232,249,0.08),transparent_30%),linear-gradient(180deg,rgba(9,9,11,0.16),#09090b_74%)]" />

      <section className="mx-0 w-full max-w-[21.5rem] min-w-0 space-y-8 sm:mx-auto sm:max-w-6xl">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-[21.5rem] space-y-4 sm:max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-200/80 sm:text-xs sm:tracking-[0.26em]">Projects</p>
            <h1 className="text-balance text-[2.35rem] font-semibold leading-[1.05] text-white sm:text-5xl md:text-6xl">
              Work built across backend, systems, databases, and the web.
            </h1>
            <p className="max-w-full break-words text-[15px] leading-7 text-slate-300 [overflow-wrap:anywhere] sm:max-w-2xl sm:text-base sm:leading-8 sm:[overflow-wrap:normal]">
              A paginated project collection sourced from my CV, GitHub repositories, and this portfolio build, with captured screenshots and demo media where each project can run locally.
            </p>
          </div>

          <div className="grid w-full max-w-[21.5rem] grid-cols-3 gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1 sm:w-auto sm:max-w-none sm:flex sm:flex-nowrap sm:gap-1 lg:shrink-0">
            {['All', 'Personal', 'University'].map(option => (
              <button
                key={option}
                type="button"
                onClick={() => changeFilter(option)}
                className={`min-h-10 rounded-full px-3 py-2 text-sm font-bold transition sm:min-w-24 sm:px-4 lg:min-w-0 ${filter === option ? 'bg-white text-ink' : 'text-white hover:bg-white/10'}`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {visibleProjects.map(project => (
            <div key={project.id} id={project.id} className="scroll-mt-28">
              <ProjectAccordion
                project={project}
                isOpen={openId === project.id}
                onToggle={() => setOpenId(current => (current === project.id ? '' : project.id))}
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col items-stretch justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
          <p className="text-sm text-slate-400">
            Showing {filteredProjects.length ? page * PAGE_SIZE + 1 : 0}-{Math.min((page + 1) * PAGE_SIZE, filteredProjects.length)} of {filteredProjects.length}
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

export default ProjectsPage;
