import { Footer } from '@components/layout';
import Seo from '../Seo/Seo';

function Layout({
  children,
  title = false,
  description = false,
  path = false,
}) {
  return (
    <div className="overflow-hidden">
      <Seo title={title} description={description} path={path} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
