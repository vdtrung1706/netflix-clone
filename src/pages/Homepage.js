import requests from '../services/requests';
import Row from '../components/common/Row';
import Banner from '../components/common/Banner';

export default function Homepage() {
  return (
    <div className="flex flex-col">
      <Banner />
      <Row title="Popular" fetchUrl={requests.popular} />
      <Row title="Trending" fetchUrl={requests.trending} />
      <Row title="Top Rated" fetchUrl={requests.topRated} />
      <Row title="Netflix Originals" fetchUrl={requests.netflixOrignals} />
      <Row title="Adventure" fetchUrl={requests.adventureMovies} />
      <Row title="Horror Movies" fetchUrl={requests.horrorMovies} />
      <Row title="Anime" fetchUrl={requests.animeMovies} />
      <Row title="Action" fetchUrl={requests.actionMovies} />
      <Row title="Romance" fetchUrl={requests.romanceMovies} />
    </div>
  );
}
