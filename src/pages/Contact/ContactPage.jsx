import { FaDownload, FaEnvelope, FaGithub, FaInstagram, FaLinkedin, FaLocationDot, FaPhone, FaWhatsapp } from 'react-icons/fa6';
import SideRays from '../../backgrounds/SideRays.jsx';
import BorderGlow from '../../components/ui/BorderGlow.jsx';
import contact from '../../data/contact.json';
import profile from '../../data/profile.json';
import resumePdf from '../../assets/resume/Youssef-Adly-CV.pdf';

const primaryActions = [
  {
    label: 'Email',
    value: contact.email,
    href: `mailto:${contact.email}`,
    icon: FaEnvelope
  },
  {
    label: 'Phone',
    value: contact.phone,
    href: `tel:${contact.phone}`,
    icon: FaPhone
  },
  {
    label: 'WhatsApp',
    value: 'Message on WhatsApp',
    href: contact.whatsapp,
    icon: FaWhatsapp
  }
];

const socialLinks = [
  {
    label: 'GitHub',
    value: 'YoussefAdly14',
    href: contact.github,
    icon: FaGithub
  },
  {
    label: 'LinkedIn',
    value: 'Youssef Adly',
    href: contact.linkedin,
    icon: FaLinkedin
  },
  {
    label: 'Instagram',
    value: contact.instagramHandle,
    href: contact.instagram,
    icon: FaInstagram
  }
];

function ContactLinkCard({ item, compact = false }) {
  const Icon = item.icon;

  return (
    <a
      href={item.href}
      target={item.href.startsWith('http') ? '_blank' : undefined}
      rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
      className={`group block min-w-0 rounded-lg border border-white/10 bg-white/[0.04] transition hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.07] ${
        compact ? 'p-4' : 'p-4 sm:p-5'
      }`}
    >
      <div className={`flex min-w-0 items-center ${compact ? 'gap-3' : 'gap-4'}`}>
        <span className={`${compact ? 'h-10 w-10' : 'h-11 w-11'} grid shrink-0 place-items-center rounded-full bg-white text-ink transition group-hover:bg-cyan-100`}>
          <Icon aria-hidden="true" />
        </span>
        <span className="min-w-0 flex-1 space-y-1">
          <span className={`${compact ? 'text-[11px]' : 'text-xs sm:text-sm'} block font-semibold uppercase tracking-[0.16em] text-cyan-100/80`}>
            {item.label}
          </span>
          <span className={`${compact ? 'text-sm' : 'text-base'} block max-w-full overflow-hidden text-ellipsis whitespace-nowrap font-semibold text-white`}>
            {item.value}
          </span>
        </span>
      </div>
    </a>
  );
}

function ContactPage() {
  return (
    <main className="relative isolate min-h-screen overflow-x-hidden bg-ink px-4 pb-16 pt-28 text-white sm:px-8 sm:pb-20 sm:pt-32 lg:px-10 xl:px-12">
      <div className="absolute inset-0 -z-20">
        <SideRays
          speed={1.45}
          rayColor1="#67E8F9"
          rayColor2="#F5B84B"
          intensity={1.25}
          spread={1.7}
          opacity={0.72}
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_74%_18%,rgba(103,232,249,0.08),transparent_28%),linear-gradient(180deg,rgba(9,9,11,0.18),#09090b_72%)]" />

      <section className="mx-auto grid min-h-[calc(100vh-8rem)] w-full max-w-7xl items-center gap-8 xl:grid-cols-[0.8fr_1.2fr]">
        <div className="max-w-2xl space-y-7 xl:max-w-none">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-cyan-200/80">Contact & CV</p>
            <div className="space-y-3">
              <h1 className="text-balance text-4xl font-semibold leading-[1.04] text-white sm:text-5xl lg:text-6xl">
                Let's connect.
              </h1>
              <p className="max-w-xl text-base leading-8 text-slate-300 xl:max-w-lg">
                Reach out for internships, software engineering opportunities, collaborations, or CV details. I am based in {contact.location}.
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:flex sm:flex-wrap">
            <a
              href={resumePdf}
              download
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-ink transition hover:-translate-y-0.5 hover:bg-cyan-100"
            >
              Download CV
              <FaDownload aria-hidden="true" className="text-xs" />
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/8 px-5 py-3 text-sm font-bold text-white backdrop-blur transition hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/12"
            >
              Send email
              <FaEnvelope aria-hidden="true" className="text-xs" />
            </a>
          </div>

          <div className="flex items-center gap-3 text-sm text-slate-300">
            <FaLocationDot aria-hidden="true" className="text-cyan-100" />
            <span>{contact.location}</span>
          </div>
        </div>

        <BorderGlow
          className="w-full min-w-0 overflow-hidden"
          borderRadius={8}
          backgroundColor="rgba(13, 17, 29, 0.82)"
          glowColor="195 90 70"
          glowRadius={24}
          fillOpacity={0.18}
        >
          <div className="min-w-0 space-y-7 p-4 sm:p-6 lg:p-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-white">{profile.name}</h2>
              <p className="text-sm leading-7 text-slate-300">{profile.title} | {profile.subtitle}</p>
            </div>

            <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-3">
              {primaryActions.map(item => (
                <ContactLinkCard key={item.label} item={item} />
              ))}
            </div>

            <div className="border-t border-white/10 pt-6">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/75">Profiles</p>
              <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-3">
                {socialLinks.map(item => (
                  <ContactLinkCard key={item.label} item={item} compact />
                ))}
              </div>
            </div>
          </div>
        </BorderGlow>
      </section>
    </main>
  );
}

export default ContactPage;
