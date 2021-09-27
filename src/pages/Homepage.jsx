import PageTemplate from '@components/common/PageTemplate';
import { moviesRequests } from '@services/requests.service';
import { selectBillboardHomepage } from '@store/billboard/billboard.selectors';
import { fetchBillboardHomepage } from '@store/billboard/billboard.slice';
import { homepageActions } from '@store/homepage/slice.homepage';
import { PureComponent } from 'react';

class Homepage extends PureComponent {
  render() {
    return (
      <PageTemplate
        type="HOMEPAGE"
        title="Home - Netflix"
        genresSelector={(state) => state.homepage}
        billboardSelector={selectBillboardHomepage}
        billboardUrl={moviesRequests.trending.url}
        fetchBillboard={fetchBillboardHomepage}
        onFetchesSuccess={homepageActions.onFetchesSuccess}
      />
    );
  }
}

export default Homepage;
