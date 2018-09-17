---
title: Managing environment workflows with gulp.js
date: 2017-10-03
image: "/blog/images/posts/managing_environment_workflows_with_gulp/hero.jpg"
---

Over the years, I've used a few different combinations of frameworks, libraries and tools, some of which come with environment workflows out-of-the-box and others that do not. With the <a href="https://trends.google.com/trends/explore?date=all&q=%2Fm%2F0505cl,%2Fm%2F06y_qx,%2Fm%2F0bbxf89" target="_blank">rising popularity of Node.js</a>, the need to roll one's own environment workflows is also on the rise, as is the number of resources with which to do so. I recently give a presentation about this topic at one of the software development Meetups I attend; below is an overview of the presentation, the lion's share of which was a live demo.

<a role="button" class="btn btn-default" href="http://colinrcummings.github.io/meetup-gulp" target="_blank">View Presentation</a>

---

## Background

I like writing code; I don't like performing repetitive tasks like manipulating files, migrating folders, running scripts, <i>et cetera</i>. Accordingly, I make optimizing develop, build and deploy workflows across development, test and production environments a priority in every project. Inevitably, this is a tradeoff between <a href="https://twitter.com/phillip_webb/status/705909774001377280?lang=en" target="_blank"> magic and boilerplate</a>.

When I was getting started with development, I used <a href="http://rubyonrails.org/" target="_blank">Ruby On Rails</a>, which is preconfigured with pretty good, albeit magic-laden, develop and build workflows for development and production environments that are powered by its <a href="http://guides.rubyonrails.org/asset_pipeline.html" target="_blank">Asset Pipeline</a>. Additionally, <a href="https://www.heroku.com/" target="_blank">Heroku</a> offers a nice <a href="https://devcenter.heroku.com/articles/getting-started-with-rails4#deploy-your-application-to-heroku" target="_blank">Rails deploy workflow</a> for test and production environments. If you've worked with Rails like this before, then you know that it's great... until it isn't.

<div class="grid">
  <div class="col-4-12">
    <div class="text-center">
      <div>
        <div class="text-left">
          <span class="small text-muted">
            <em>The good</em>
          </span>
        </div>
        <img class="img-rounded" src="/blog/images/posts/managing_environment_workflows_with_gulp/asset_pipeline_good.jpg" alt="Welcome aboard. You're riding Ruby on Rails! (meme)"/>
      </div>
    </div>
  </div>
  <div class="col-4-12">
    <div class="text-center">
      <div>
        <div class="text-left">
          <span class="small text-muted">
            <em>The bad</em>
          </span>
        </div>
        <img class="img-rounded" src="/blog/images/posts/managing_environment_workflows_with_gulp/asset_pipeline_bad.jpg" alt="I don't always deploy Rails to Heroku, but when I do, I break the Asset Pipeline. (meme)"/>
      </div>
    </div>
  </div>
  <div class="col-4-12">
    <div class="text-center">
      <div>
        <div class="text-left">
          <span class="small text-muted">
            <em>The ugly</em>
          </span>
        </div>
        <img class="img-rounded" src="/blog/images/posts/managing_environment_workflows_with_gulp/asset_pipeline_ugly.jpg" alt="Asset Pipeline! (meme)"/>
      </div>
    </div>
  </div>
</div>

While I still use Rails in some existing projects (including <a href="https://www.peakbucket.com/" target="_blank">PeakBucket</a>), I've come to prefer <a href="https://nodejs.org/" target="_blank">Node.js</a> when starting new ones. Node leaves configuration almost entirely up to the developer, but with freedom comes responsibility—and often boilerplate. Some tools, like <a href="https://github.com/facebookincubator/create-react-app" target="_blank">Create React App</a>, provide preconfigured (<i>i.e.</i> boilerplate-free) develop and build workflows for development and production environments with the option to "eject" and customize the configuration at any time. For more complex applications, however, you often need more control; for me, this is where <a href="https://gulpjs.com/" target="_blank">gulp.js</a> comes into play.

With over 3 million downloads a month, gulp needs little introduction. While it's not the only tool of its kind, nor is it as widely used as <a href="https://webpack.github.io/" target="_blank">webpack</a> (with over 8 million downloads a month), its flexibility, strong ecosystem and interoperability with other tools (including webpack) make it my choice for managing environment workflows in more complex applications.


---

## Example

At work, I maintain a Node project that's an <a href="https://expressjs.com/" target="_blank">Express</a> application comprised of multiple single-page <a href="https://reactjs.org/" target="_blank">React</a>  applications. Configured like this, Express handles database connections, view/web service routes and user authentication server-side, while React handles user interactions client-side. Here are the workflows I've configured for this application:

### Develop

Optimized for developer experience, the develop workflow is tuned to minimize wait time and manual tasks in order to maximize code quality and output in the development environment. On startup, it copies static files, transpiles SASS files and compiles JS(X) files into the public directory. It uses <a href="https://github.com/remy/nodemon" target="_blank">nodemon</a> for a runtime, which automatically restarts the server when watched files change, and uses individual database connections per web service request to avoid acquiring additional connections with each restart (the application uses database pools in other environments). Because webpack bundles the view scripts, it also takes advantage of <a href=" https://webpack.github.io/docs/hot-module-replacement.html" target="_blank">Hot Module Replacement</a> (including <a href="https://gaearon.github.io/react-hot-loader/" target="_blank">React Hot Loader</a>) in addition to <a href="https://github.com/webpack-contrib/webpack-bundle-analyzer" target="_blank">Webpack Bundle Analyzer</a>.

<div class="grid">
  <div class="col-2-12 hide-on-mobile"></div>
  <div class="col-8-12">
    <div class="text-center margin-top-5">
      <div>
        <img class="img-rounded" src="/blog/images/posts/managing_environment_workflows_with_gulp/dev.jpg" alt="Develop workflow (console screenshot)"/>
      </div>
    </div>
  </div>
  <div class="col-2-12 hide-on-mobile"></div>
</div>

### Build

One of 12 items on <a href="https://www.joelonsoftware.com/2000/08/09/the-joel-test-12-steps-to-better-code/" target="_blank">The Joel Test</a>, making a build in one step, for use in either the test or production environment, is what this workflow is all about. Prior to making a build, it runs a unit test suite, which covers all aspects of the application (including database connections, web service calls, business logic and user authentication/interaction). In addition to copying/transpiling/compiling minified public assets, it also copies all of the other files required for running the application (models, views, controllers, routes, <i>et cetera</i>) into a build directory.

<div class="grid">
  <div class="col-2-12 hide-on-mobile"></div>
  <div class="col-8-12">
    <div class="text-center margin-top-5">
      <div>
        <img class="img-rounded" src="/blog/images/posts/managing_environment_workflows_with_gulp/build.jpg" alt="Build workflow (console screenshot)"/>
      </div>
    </div>
  </div>
  <div class="col-2-12 hide-on-mobile"></div>
</div>

### Deploy

One additional piece of complexity with this application is that it's deployed to a Windows Server hosted on a VPN. My goal in creating this workflow was to replicate the ease of `$ git push heroku master`, which I've enjoyed with other applications. It's split into two commands: one run locally and another run on the server, which leaves the flexibility to deploy to multiple environments server-side.

Locally, the deploy workflow runs the build workflow, zips the build directory and coppies the zipped build directory to the server.

<div class="grid">
  <div class="col-2-12 hide-on-mobile"></div>
  <div class="col-8-12">
    <div class="text-center margin-top-5">
      <div>
        <img class="img-rounded" src="/blog/images/posts/managing_environment_workflows_with_gulp/deploy-local.jpg" alt="Deploy workflow locally (console screenshot)"/>
      </div>
    </div>
  </div>
  <div class="col-2-12 hide-on-mobile"></div>
</div>

On the server, the build can be deployed to either the test or production environment:

In the test environment, the deploy workflow on the server unzips the zipped build directory, migrates build files and updates node modules. The test environment runtime is started manually as a process attached to the console (<i>i.e.</i> `$ npm start`).

<div class="grid">
  <div class="col-2-12 hide-on-mobile"></div>
  <div class="col-8-12">
    <div class="text-center margin-top-5">
      <div>
        <img class="img-rounded" src="/blog/images/posts/managing_environment_workflows_with_gulp/deploy-server-test.jpg" alt="Test deploy workflow on the server (console screenshot)"/>
      </div>
    </div>
  </div>
  <div class="col-2-12 hide-on-mobile"></div>
</div>

In the production environment, the deploy workflow on the server unzips the zipped build directory, performs a database backup, stops the runtime daemon process, migrates build files, updates node modules and starts the runtime daemon process. The production environment runtime is a native Windows service courtesy of the <a href="https://github.com/coreybutler/node-windows/" target="_blank">node-windows</a> module.

<div class="grid">
  <div class="col-2-12 hide-on-mobile"></div>
  <div class="col-8-12">
    <div class="text-center margin-top-5">
      <div>
        <img class="img-rounded" src="/blog/images/posts/managing_environment_workflows_with_gulp/deploy-server-prod.jpg" alt="Production deploy workflow on the server (console screenshot)"/>
      </div>
    </div>
  </div>
  <div class="col-2-12 hide-on-mobile"></div>
</div>

---

## Feedback

Have questions, comments or suggestions? Reach out to me on Twitter (<a href="https://twitter.com/colinrcummings">@colinrcummings</a>).

— Colin
