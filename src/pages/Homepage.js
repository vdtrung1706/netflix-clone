import requests from '../services/requests';
import Row from '../components/common/Row';

export default function Homepage() {
  return (
    <div className="flex flex-col gap-3">
      <Row title="Popular" fetchUrl={requests.popular} />
      <Row title="Trending" fetchUrl={requests.trending} />
      <Row title="Top Rated" fetchUrl={requests.topRated} />
    </div>
  );
}
