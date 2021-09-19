import PageTemplate from '@components/common/PageTemplate';
import { tvshowsRequests } from '@services/requests.service';
import { selectBillboardTVShow } from '@store/billboard/billboard.selectors';
import { fetchBillboardTVShow } from '@store/billboard/billboard.slice';
import { tvshowsActions } from '@store/tvshows/slice.tvshows';
import { PureComponent } from 'react';

class TVShowsPage extends PureComponent {
  render() {
    return (
      <PageTemplate
        type="TVSHOWS"
        title="TV Shows - Netflix"
        genresSelector={(state) => state.tvshows}
        billboardSelector={selectBillboardTVShow}
        billboardUrl={tvshowsRequests.crimeSeries.url}
        fetchBillboard={fetchBillboardTVShow}
        onFetchesSuccess={tvshowsActions.onFetchesSuccess}
      />
    );
  }
}
export default TVShowsPage;
