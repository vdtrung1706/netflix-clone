import PageTemplate from '@components/common/PageTemplate';
import { moviesRequests } from '@services/requests.service';
import { selectBillboardMovie } from '@store/billboard/billboard.selectors';
import { fetchBillboardMovie } from '@store/billboard/billboard.slice';
import { moviesActions } from '@store/movies/slice.movies';
import { PureComponent } from 'react';

class Homepage extends PureComponent {
  render() {
    return (
      <PageTemplate
        type="MOVIES"
        title="Home - Netflix"
        genresSelector={(state) => state.movies}
        billboardSelector={selectBillboardMovie}
        billboardUrl={moviesRequests.adventureMovies.url}
        fetchBillboard={fetchBillboardMovie}
        onFetchesSuccess={moviesActions.onFetchesSuccess}
      />
    );
  }
}

export default Homepage;
