import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import SiteShell from './components/layout/SiteShell.jsx';
import navigation from './data/navigation.json';

const HomePage = lazy(() => import('./pages/Home/HomePage.jsx'));
const AboutPage = lazy(() => import('./pages/About/AboutPage.jsx'));
const ContactPage = lazy(() => import('./pages/Contact/ContactPage.jsx'));
const ExtracurricularPage = lazy(() => import('./pages/Extracurricular/ExtracurricularPage.jsx'));
const PlaceholderPage = lazy(() => import('./pages/PlaceholderPage.jsx'));

const pageRoutes = navigation.filter(item => !['/', '/about', '/contact', '/extracurricular'].includes(item.href));
const projectSubRoutes = [
  { label: 'Personal Projects', href: '/projects/personal' },
  { label: 'University Projects', href: '/projects/university' }
];

function App() {
  return (
    <Suspense
      fallback={
        <main className="grid min-h-screen place-items-center bg-ink px-6 text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
          Loading portfolio
        </main>
      }
    >
      <Routes>
        <Route element={<SiteShell />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="extracurricular" element={<ExtracurricularPage />} />
          {pageRoutes.map(item => (
            <Route
              key={item.href}
              path={item.href.replace(/^\//, '')}
              element={<PlaceholderPage title={item.label} href={item.href} />}
            />
          ))}
          {projectSubRoutes.map(item => (
            <Route
              key={item.href}
              path={item.href.replace(/^\//, '')}
              element={<PlaceholderPage title={item.label} href={item.href} />}
            />
          ))}
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;
