import PageTemplate from '@components/common/PageTemplate';
import { moviesRequests } from '@services/requests.service';
import { selectBillboardMovie } from '@store/billboard/billboard.selectors';
import { fetchBillboardMovie } from '@store/billboard/billboard.slice';
import { moviesActions } from '@store/movies/slice.movies';
import { PureComponent } from 'react';

class MoviesPage extends PureComponent {
  render() {
    return (
      <PageTemplate
        type="MOVIE_PAGE"
        title="Movies - Netflix"
        genresSelector={(state) => state.movies}
        billboardUrl={moviesRequests.horrorMovies.url}
        billboardSelector={selectBillboardMovie}
        fetchBillboard={fetchBillboardMovie}
        onFetchesSuccess={moviesActions.onFetchesSuccess}
      />
    );
  }
}

export default MoviesPage;
