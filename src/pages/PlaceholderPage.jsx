import { Link } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';
import SideRays from '../backgrounds/SideRays.jsx';
import BorderGlow from '../components/ui/BorderGlow.jsx';

const projectChoices = [
  {
    title: 'Personal Projects',
    description: 'Independent builds, experiments, and product-minded software work.',
    href: '/projects/personal'
  },
  {
    title: 'University Projects',
    description: 'Coursework projects across systems, data, architecture, and embedded software.',
    href: '/projects/university'
  }
];

function PlaceholderPage({ title, href }) {
  const isProjectsHub = href === '/projects';

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-ink px-5 pt-32 text-white sm:px-8 lg:px-12">
      <div className="absolute inset-0 -z-20">
        <SideRays
          speed={1.6}
          rayColor1="#F5B84B"
          rayColor2="#67E8F9"
          intensity={1.4}
          spread={1.7}
          opacity={0.72}
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(9,9,11,0.25),#09090b_76%)]" />

      <section className="mx-auto grid min-h-[calc(100vh-8rem)] max-w-4xl place-items-center">
        <BorderGlow
          className="w-full overflow-hidden"
          borderRadius={8}
          backgroundColor="rgba(13, 17, 29, 0.86)"
          glowColor="42 90 70"
          glowRadius={24}
          fillOpacity={0.2}
        >
          <div className="space-y-7 p-7 sm:p-10">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200/80">Coming Next</p>
              <h1 className="text-balance text-4xl font-semibold text-white sm:text-5xl">{title}</h1>
              {isProjectsHub ? (
                <p className="max-w-2xl text-base leading-8 text-slate-300">
                  Choose which project collection you want to view. These pages will later hold the full project cards, images, technologies, GitHub links, and demos.
                </p>
              ) : (
                <p className="max-w-2xl text-base leading-8 text-slate-300">
                  This page is reserved for the next build step. The route, navigation state, background system, and reusable card treatment are in place so the real content can be added cleanly later.
                </p>
              )}
            </div>

            {isProjectsHub && (
              <div className="grid gap-4 sm:grid-cols-2">
                {projectChoices.map(choice => (
                  <Link
                    key={choice.href}
                    to={choice.href}
                    className="group rounded-lg border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.07]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2">
                        <h2 className="text-xl font-semibold text-white">{choice.title}</h2>
                        <p className="text-sm leading-6 text-slate-300">{choice.description}</p>
                      </div>
                      <FaArrowRight
                        aria-hidden="true"
                        className="mt-1 shrink-0 text-sm text-cyan-200 transition group-hover:translate-x-1"
                      />
                    </div>
                  </Link>
                ))}
              </div>
            )}

            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-ink transition hover:-translate-y-0.5 hover:bg-cyan-100"
            >
              <FaArrowLeft aria-hidden="true" className="text-xs" />
              Back to homepage
            </Link>
          </div>
        </BorderGlow>
      </section>
    </main>
  );
}

export default PlaceholderPage;
