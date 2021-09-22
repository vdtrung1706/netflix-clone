import ScrollToTop from '@components/common/ScrollToTop';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import store from './store';
import WatchPage from './pages/WatchPage';

ReactDOM.render(
  <Provider store={store}>
    <WatchPage></WatchPage>
    {/* <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter> */}
  </Provider>,
  document.getElementById('root'),
);
