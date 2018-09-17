import * as React from 'react';
import { withPhenomicApi, query } from '@phenomic/preset-react-app/lib/client';

import pkg from '../../package.json';

import Layout from './Layout';
import PageError from './PageError';
import ActivityIndicator from './ActivityIndicator';
import LatestPosts from './LatestPosts';

const PageBlog = ({ hasError, isLoading, posts }) =>
  hasError ? (
    <PageError error={posts.error} />
  ) : (
    <React.Fragment>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .PageBlog {
          position: relative;
        }

        .PageBlog-content {
          margin-bottom: 40px;
        }
        `
        }}
      />
      <Layout title={`Blog | ${pkg.title}`} image="/blog/images/index/hero.jpg">
        {isLoading && <ActivityIndicator />}
        {!isLoading && <LatestPosts node={posts.node} />}
      </Layout>
    </React.Fragment>
  );

export default withPhenomicApi(PageBlog, props => ({
  posts: query({
    path: 'content/posts',
    limit: 6,
    after: props.params.after
  })
}));
