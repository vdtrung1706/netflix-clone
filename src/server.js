import express from 'express';
import { matchRoutes } from 'react-router-config';
import Routes from './Routes';
import renderer from './utils/renderer';
import configureStore from './store';

const app = express();
app.use(express.static('dist'));

app.get('*', (req, res) => {
  const store = configureStore();
  const { dispatch } = store;

  const routes = matchRoutes(Routes, req.path);

  // const promises = routes.map(({ route }) =>
  //   route.loadData ? route.loadData(dispatch) : null,
  // );
  // Promise.all(promises).then(() => {

  // });
  console.log(store);
  const content = renderer(req, store);
  res.send(content);
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
