import Seo from '../Seo/Seo';

function Layout({
  children,
  title = false,
  description = false,
  path = false,
}) {
  return (
    <>
      <Seo title={title} description={description} path={path} />

      <main>{children}</main>
    </>
  );
}

export default Layout;
