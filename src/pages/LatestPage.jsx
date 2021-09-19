import PageTemplate from '@components/common/PageTemplate';
import { latestRequests } from '@services/requests.service';
import { selectBillboardLatest } from '@store/billboard/billboard.selectors';
import { fetchBillboardLatest } from '@store/billboard/billboard.slice';
import { latestActions } from '@store/latest/slice.latest';
import { PureComponent } from 'react';

class LatestPage extends PureComponent {
  render() {
    return (
      <PageTemplate
        type="LATEST"
        title="Latest - Netflix"
        genresSelector={(state) => state.latest}
        billboardSelector={selectBillboardLatest}
        billboardUrl={latestRequests.newRelease.url}
        fetchBillboard={fetchBillboardLatest}
        onFetchesSuccess={latestActions.onFetchesSuccess}
      />
    );
  }
}

export default LatestPage;
