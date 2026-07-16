import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowRight, FaDownload } from 'react-icons/fa6';
import Galaxy from '../../backgrounds/Galaxy.jsx';
import Folder from '../../components/ui/Folder.jsx';
import TiltedCard from '../../components/ui/TiltedCard.jsx';
import BorderGlow from '../../components/ui/BorderGlow.jsx';
import RocketFlight from '../../components/effects/RocketFlight.jsx';
import profilePhoto from '../../assets/images/youssef-adly-profile.jpeg';
import home from '../../data/home.json';
import profile from '../../data/profile.json';
import projects from '../../data/projects.json';
import internships from '../../data/internships.json';
import activities from '../../data/activities.json';

const projectCounts = projects.reduce(
  (counts, project) => {
    const key = project.category?.toLowerCase();
    if (key === 'personal') counts.personal += 1;
    if (key === 'university') counts.university += 1;
    return counts;
  },
  { personal: 0, university: 0 }
);

function FolderPapers({ labels }) {
  return labels.map(label => (
    <div key={label} className="flex h-full items-end justify-center p-2 text-[10px] font-bold uppercase text-slate-800">
      {label}
    </div>
  ));
}

function FadeSection({ children, className = '', delay = 0 }) {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.18, rootMargin: '0px 0px -80px 0px' }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`transition-all duration-700 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </section>
  );
}

function SectionIntro({ eyebrow, title, description, action }) {
  return (
    <div className="mx-auto mb-8 flex max-w-6xl flex-col justify-between gap-5 sm:flex-row sm:items-end">
      <div className="max-w-2xl space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200/75">{eyebrow}</p>
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">{title}</h2>
        <p className="text-base leading-8 text-slate-300">{description}</p>
      </div>
      {action}
    </div>
  );
}

function HomePage() {
  const navigate = useNavigate();
  const featuredProjects = projects.filter(project => project.featured).slice(0, 3);

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-ink text-white">
      <RocketFlight />
      <section
        className="relative isolate flex min-h-screen items-start px-5 pb-14 pt-32 sm:items-center sm:px-8 sm:pt-28 lg:px-12"
        aria-labelledby="home-title"
      >
        <div className="absolute inset-0 -z-20 bg-ink">
          <Galaxy
            mouseRepulsion
            mouseInteraction
            density={1}
            glowIntensity={0.3}
            saturation={0}
            hueShift={140}
            twinkleIntensity={0.3}
            rotationSpeed={0.1}
            repulsionStrength={2}
            autoCenterRepulsion={0}
            starSpeed={0.5}
            speed={1}
          />
        </div>
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_72%_42%,rgba(255,255,255,0.045),transparent_30%),linear-gradient(180deg,rgba(9,9,11,0.02),rgba(9,9,11,0.45)_64%,#09090b_100%)]" />

        <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-9 lg:grid-cols-[1.03fr_0.97fr]">
          <div className="max-w-2xl space-y-6 sm:space-y-7">
            <div className="space-y-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-200/80 sm:text-xs sm:tracking-[0.26em]">{home.hero.eyebrow}</p>
              <div className="space-y-3">
                <h1 id="home-title" className="text-balance text-[clamp(3rem,14vw,4rem)] font-semibold leading-[1.03] text-white sm:text-6xl lg:text-7xl">
                  {profile.name}
                </h1>
                <p className="text-xl font-medium leading-snug text-cyan-100 sm:text-2xl">{profile.title}</p>
                <p className="max-w-xl text-[15px] leading-7 text-slate-300 sm:text-base sm:leading-8">{profile.introduction}</p>
              </div>
            </div>

            <div className="grid gap-3 min-[430px]:flex min-[430px]:flex-wrap">
              <Link
                to={home.hero.primaryAction.href}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-ink transition hover:-translate-y-0.5 hover:bg-cyan-100"
              >
                {home.hero.primaryAction.label}
                <FaDownload aria-hidden="true" className="text-xs" />
              </Link>
              <Link
                to={home.hero.secondaryAction.href}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/8 px-5 py-3 text-sm font-bold text-white backdrop-blur transition hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/12"
              >
                {home.hero.secondaryAction.label}
                <FaArrowRight aria-hidden="true" className="text-xs" />
              </Link>
            </div>

            <dl className="grid max-w-2xl grid-cols-1 gap-4 text-sm text-slate-300 sm:grid-cols-3">
              <div className="border-l border-white/15 pl-4">
                <dt className="font-semibold text-white">{profile.degree}</dt>
                <dd>{profile.currentUniversity}</dd>
              </div>
              <div className="border-l border-white/15 pl-4">
                <dt className="font-semibold text-white">Focus</dt>
                <dd>{profile.subtitle}</dd>
              </div>
              <div className="border-l border-white/15 pl-4">
                <dt className="font-semibold text-white">Location</dt>
                <dd>{profile.location}</dd>
              </div>
            </dl>
          </div>

          <div className="mx-auto w-full max-w-[470px]">
            <div className="rounded-lg border border-white/10 bg-black/35 p-3 shadow-lift backdrop-blur-md">
              <div className="overflow-hidden rounded-lg bg-white/[0.03]">
                <TiltedCard
                  imageSrc={profilePhoto}
                  altText={`${profile.name} at a university event`}
                  captionText={profile.name}
                  containerHeight="320px"
                  containerWidth="100%"
                  imageHeight="320px"
                  imageWidth="100%"
                  rotateAmplitude={7}
                  scaleOnHover={1.025}
                  showMobileWarning={false}
                  showTooltip={false}
                  displayOverlayContent
                  overlayContent={
                    <div className="absolute inset-x-4 bottom-4 rounded-md border border-white/10 bg-black/55 px-4 py-3 text-left backdrop-blur-md">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-100/85">Computer Engineering</p>
                      <p className="mt-1 text-base font-semibold text-white">{profile.name}</p>
                    </div>
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="relative bg-ink px-5 py-20 sm:px-8 lg:px-12">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#09090b,rgba(9,9,11,0.96)_28%,#09090b)]" />

        <div className="relative z-10 mx-auto space-y-24">
          <FadeSection>
            <SectionIntro
              eyebrow="Selected Work"
              title="Projects"
              description="A project area split between independent builds and university coursework, ready for richer case studies as the real content is added."
              action={
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-cyan-100"
                >
                  Open projects
                  <FaArrowRight aria-hidden="true" className="text-xs" />
                </Link>
              }
            />

            <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {home.folderLinks.map(folder => (
                  <BorderGlow
                    key={folder.id}
                    className="overflow-hidden transition duration-200 hover:-translate-y-0.5"
                    borderRadius={8}
                    backgroundColor="rgba(13, 17, 29, 0.74)"
                    glowColor={folder.id === 'personal' ? '250 90 72' : '42 90 68'}
                    glowRadius={18}
                    fillOpacity={0.16}
                  >
                    <button
                      type="button"
                      onClick={() => navigate(folder.href)}
                      className="w-full p-5 text-left"
                    >
                      <div className="flex items-center gap-5">
                        <Folder
                          color={folder.color}
                          size={0.58}
                          items={FolderPapers({ labels: folder.paperLabels })}
                          ariaLabel={`Open ${folder.label}`}
                        />
                        <div className="space-y-1">
                          <h3 className="text-lg font-semibold text-white">{folder.label}</h3>
                          <p className="text-sm leading-6 text-slate-300">{folder.description}</p>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-200/75">
                            {projectCounts[folder.id]} entries
                          </p>
                        </div>
                      </div>
                    </button>
                  </BorderGlow>
                ))}
              </div>

              <div className="grid gap-4">
                {featuredProjects.map(project => (
                  <BorderGlow
                    key={project.id}
                    className="overflow-hidden"
                    borderRadius={8}
                    backgroundColor="rgba(13, 17, 29, 0.74)"
                    glowColor="195 90 70"
                    glowRadius={18}
                    fillOpacity={0.14}
                  >
                    <article className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                          <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-cyan-100">
                            {project.category}
                          </span>
                        </div>
                        <p className="max-w-2xl text-sm leading-7 text-slate-300">{project.description}</p>
                      </div>
                      <div className="flex shrink-0 flex-wrap gap-2">
                        {project.technologies.slice(0, 3).map(technology => (
                          <span key={technology} className="rounded-full bg-white px-3 py-1 text-xs font-bold text-ink">
                            {technology}
                          </span>
                        ))}
                      </div>
                    </article>
                  </BorderGlow>
                ))}
              </div>
            </div>
          </FadeSection>

          <FadeSection delay={80}>
            <SectionIntro
              eyebrow="Professional Practice"
              title="Internships"
              description="A focused snapshot of practical engineering experience, responsibilities, and the technologies used in professional settings."
              action={
                <Link
                  to="/internships"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-cyan-100"
                >
                  View internships
                  <FaArrowRight aria-hidden="true" className="text-xs" />
                </Link>
              }
            />

            <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-2">
              {internships.slice(0, 3).map(internship => (
                <BorderGlow
                  key={internship.id}
                  className="h-full overflow-hidden"
                  borderRadius={8}
                  backgroundColor="rgba(13, 17, 29, 0.78)"
                  glowColor="195 90 70"
                  glowRadius={18}
                  fillOpacity={0.18}
                >
                  <article className="space-y-5 p-6">
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-cyan-100">{internship.duration}</p>
                      <h3 className="text-2xl font-semibold text-white">{internship.position}</h3>
                      <p className="text-sm font-medium text-slate-400">{internship.company}</p>
                      <p className="text-sm leading-7 text-slate-300">{internship.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {internship.technologies.slice(0, 5).map(technology => (
                        <span key={technology} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-slate-200">
                          {technology}
                        </span>
                      ))}
                    </div>
                  </article>
                </BorderGlow>
              ))}
            </div>
          </FadeSection>

          <FadeSection delay={120}>
            <SectionIntro
              eyebrow="Beyond Coursework"
              title="Extracurricular Activities"
              description="Leadership, volunteering, and campus involvement that show communication, ownership, and team contribution beyond code."
              action={
                <Link
                  to="/extracurricular"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-cyan-100"
                >
                  View activities
                  <FaArrowRight aria-hidden="true" className="text-xs" />
                </Link>
              }
            />

            <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
              {activities.slice(0, 3).map(activity => (
                <BorderGlow
                  key={`${activity.organization}-${activity.position}`}
                  className="h-full overflow-hidden"
                  borderRadius={8}
                  backgroundColor="rgba(13, 17, 29, 0.74)"
                  glowColor="42 90 70"
                  glowRadius={18}
                  fillOpacity={0.16}
                >
                  <article className="flex h-full flex-col justify-between gap-6 p-6">
                    <div className="space-y-3">
                      <p className="text-sm font-semibold text-cyan-100">{activity.duration}</p>
                      <div>
                        <h3 className="text-xl font-semibold text-white">{activity.position}</h3>
                        <p className="text-sm font-medium text-slate-400">{activity.organization}</p>
                      </div>
                      <p className="text-sm leading-7 text-slate-300">{activity.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {activity.skills.map(skill => (
                        <span key={skill} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-slate-200">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </article>
                </BorderGlow>
              ))}
            </div>
          </FadeSection>

        </div>
      </div>
    </main>
  );
}

export default HomePage;
