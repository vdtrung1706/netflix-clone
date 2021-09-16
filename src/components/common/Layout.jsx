import Footer from '@components/layout/footers/Footer';
import Seo from './Seo';

function Layout({
  children,
  title = false,
  description = false,
  path = false,
}) {
  return (
    <div className="overflow-hidden">
      <Seo title={title} description={description} path={path} />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
