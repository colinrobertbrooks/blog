import * as React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { useBasename } from 'history';
import { createApp, renderApp } from '@phenomic/preset-react-app/lib/client';

import './src/styles/highlights-theme.css';
import './src/styles/simple-grid.css';
import './src/styles/base.css';

import PageBlog from './src/components/PageBlog';
import PageBlogPost from './src/components/PageBlogPost';
import PageError from './src/components/PageError';

const routes = () => (
  <Router history={useBasename(() => browserHistory)({ basename: '/blog' })}>
    <Route path="/" component={PageBlog} />
    <Route path="after/:after" component={PageBlog} />
    <Route path="/posts/*" component={PageBlogPost} />
    <Route path="*" component={PageError} />
  </Router>
);

export default createApp(routes);

if (module.hot) {
  module.hot.accept(() => renderApp(routes));
}
