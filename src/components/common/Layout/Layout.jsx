import { Nav } from '@components/layout';
import { selectCurrentUser } from '@store/auth/selectors.auth';
import { useSelector } from 'react-redux';
import Seo from '../Seo/Seo';

function Layout({
  children,
  title = false,
  description = false,
  path = false,
}) {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <>
      <Seo title={title} description={description} path={path} />
      <header>{currentUser && <Nav />}</header>
      <main>{children}</main>
    </>
  );
}

export default Layout;
