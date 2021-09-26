import Footer from '@components/layout/footers/Footer';
import { AnimatePresence } from 'framer-motion';
import Seo from './Seo';

function Layout({
  children,
  title = false,
  description = false,
  path = false,
  footer = true,
}) {
  return (
    <div className="overflow-hidden">
      <Seo title={title} description={description} path={path} />

      <AnimatePresence>
        <main className="min-h-screen">{children}</main>
      </AnimatePresence>

      {footer && <Footer />}
    </div>
  );
}

export default Layout;
