import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa6';
import SideRays from '../../backgrounds/SideRays.jsx';
import BorderGlow from '../../components/ui/BorderGlow.jsx';
import profile from '../../data/profile.json';

const storyParagraphs = [
  "Hey there! I'm Youssef Adly, a Computer Engineering student at the German University in Cairo. However, I'd like to introduce you to who Youssef really is, with no AI generated paragraph, just pure heartfelt stories.",
  "I went to Green Heights International School for most of my life, enrolled in the American system until grade 10, where I switched to the IGCSE system. I graduated a year early through the IGCSE system, choosing between Aeronautical Engineering at Cairo University or Computer Engineering at GUC.",
  "As you might have read, I picked GUC because I dreamt of one day working on full-on services and systems for airplanes and rockets. This is what piques my interest the most: learning new things and trying to apply them to my lifelong dreams.",
  "Ever since I enrolled at GUC, I have joined over 10 club and ushering experiences to interact with and meet new people. In addition, in only around three years I have completed five internships, each in a different field, to enhance my all-round skills and figure out what I like most.",
  "So far, I have completed internships in IT, Backend Software Engineering, Frontend Software Engineering, Software Delivery, and Machine Learning.",
  "In university, I have taken courses regarding embedded systems, AI and machine learning, network and security, and computer architecture. Lots of software and hardware courses. My next goal is to test out cybersecurity or embedded systems, as one of my dreams was always to work in the embedded systems of mobility, whether it be planes, airplanes, rockets, or cars.",
  "Other than that, I'm trying to enjoy my journey through university as much as I can, creating core memories through every experience and interaction, while learning as much as I can so I can achieve all my dreams.",
  "Make sure to check out the rest of the website. You can contact me through the Contact & CV page."
];

const highlights = [
  { value: '10+', label: 'club and ushering experiences' },
  { value: '5', label: 'internships across different fields' },
  { value: '2028', label: 'expected graduation year' }
];

function AboutPage() {
  return (
    <main className="relative isolate min-h-screen overflow-x-hidden bg-ink px-5 pb-20 pt-28 text-white sm:px-8 sm:pt-32 lg:px-12">
      <div className="absolute inset-0 -z-20">
        <SideRays
          speed={1.25}
          rayColor1="#67E8F9"
          rayColor2="#F5B84B"
          intensity={1.2}
          spread={1.65}
          opacity={0.7}
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_72%_18%,rgba(103,232,249,0.08),transparent_30%),linear-gradient(180deg,rgba(9,9,11,0.16),#09090b_74%)]" />

      <section className="mx-0 grid min-h-[calc(100vh-8rem)] w-full max-w-[21.5rem] min-w-0 items-center gap-8 sm:mx-auto sm:max-w-6xl xl:grid-cols-[0.82fr_1.18fr]">
        <div className="min-w-0 max-w-[21.5rem] space-y-7 sm:max-w-none">
          <div className="space-y-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-200/80 sm:text-xs sm:tracking-[0.26em]">About Me</p>
            <div className="space-y-3">
              <h1 className="text-balance text-[2.35rem] font-semibold leading-[1.05] text-white sm:text-5xl md:text-6xl">
                The story behind {profile.name}.
              </h1>
              <p className="max-w-full break-words text-[15px] leading-7 text-slate-300 [overflow-wrap:anywhere] sm:max-w-xl sm:text-base sm:leading-8 sm:[overflow-wrap:normal]">
                A more personal introduction to the person behind the projects, internships, and technical interests.
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
            {highlights.map(item => (
              <div key={item.label} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                <p className="text-3xl font-semibold text-white">{item.value}</p>
                <p className="mt-1 text-sm leading-6 text-slate-300">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <BorderGlow
          className="overflow-hidden"
          borderRadius={8}
          backgroundColor="rgba(13, 17, 29, 0.82)"
          glowColor="195 90 70"
          glowRadius={24}
          fillOpacity={0.16}
        >
          <article className="space-y-6 p-4 sm:p-6 lg:p-8">
            <div className="space-y-5">
              {storyParagraphs.map(paragraph => (
                <p key={paragraph} className="break-words text-[15px] leading-7 text-slate-300 sm:text-base sm:leading-8">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="border-t border-white/10 pt-6">
              <Link
                to="/contact"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-ink transition hover:-translate-y-0.5 hover:bg-cyan-100 sm:w-auto"
              >
                Go to Contact & CV
                <FaArrowRight aria-hidden="true" className="text-xs" />
              </Link>
            </div>
          </article>
        </BorderGlow>
      </section>
    </main>
  );
}

export default AboutPage;
