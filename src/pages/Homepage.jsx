import PageTemplate from '@components/common/PageTemplate';
import { moviesRequests } from '@services/requests.service';
import { selectBillboardMovie } from '@store/billboard/billboard.selectors';
import { fetchBillboardMovie } from '@store/billboard/billboard.slice';
import { homepageActions } from '@store/homepage/slice.homepage';
import { PureComponent } from 'react';

class Homepage extends PureComponent {
  render() {
    return (
      <PageTemplate
        type="HOMEPAGE"
        title="Home - Netflix"
        genresSelector={(state) => state.homepage}
        billboardSelector={selectBillboardMovie}
        billboardUrl={moviesRequests.adventureMovies.url}
        fetchBillboard={fetchBillboardMovie}
        onFetchesSuccess={homepageActions.onFetchesSuccess}
      />
    );
  }
}

export default Homepage;
