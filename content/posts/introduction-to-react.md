---
title: Introduction to React.js
date: 2017-05-18
layout: Post
hero: ../../assets/images/posts/introduction_to_react/hero.jpg

---

I've been using <a href="https://facebook.github.io/react/" target="_blank">React</a> for a few years now. If you read my <a href="/blog/posts/a-wedding-website/">previous post</a>, then you know that it's my go-to library for creating user interfaces (including <a href="https://github.com/colinrcummings/blog">this blog</a>). I was recently asked to give a presentation on React at one of the software development Meetups I attend. I opted to introduce the library, walk through a couple of core concepts (with examples), do a few ad hoc demos and then leave the audience with some additional concepts, resources and tools. Below is an overview of <a href="http://formidable.com/open-source/spectacle/" target="_blank">Spectacle</a>, the library I used to create the presentation.


<a role="button" class="btn btn-default" href="http://colinrcummings.github.io/meetup-react" target="_blank">View Presentation</a>

---

## Spectacle

Spectacle bills itself as "A React.js based library for creating sleek presentations". It's *awesome*. Being able to use components to compose a presentation about React felt right from the start. Out of the box, the library provides <a href="https://github.com/FormidableLabs/spectacle#tag-api" target="_blank">tags</a> for core slideshow objects you're probably already familiar with from another <a href="https://www.youtube.com/watch?v=uNjxe8ShM-8" target="_blank">presentation program</a> that shall not be named. Two things really set Spectacle apart from <a href="https://github.com/search?l=JavaScript&o=desc&q=presentation&s=stars&type=Repositories&utf8=%E2%9C%93" target="_blank">other web-based presentation tools</a>:

### Code Slides

Embedding code in a presentation isn't new, but with the <a href="https://github.com/thejameskyle/spectacle-code-slide" target="_blank">spectacle-code-slide</a> extension I was able to step through my example code with syntax highlighting and contextual notes.

<div class="grid">
  <div class="col-2-12 hide-on-mobile"></div>
  <div class="col-8-12">
    <div class="text-center" style="margin-top: 5px;">
      <div style="display: inline-block; max-width: 100%;">
        <img class="img-rounded" src="../../assets/images/posts/introduction_to_react/code_slide.gif" alt="Code slide"/>
      </div>
    </div>
  </div>
  <div class="col-2-12 hide-on-mobile"></div>
</div>

### Embedded Examples

Because the entire Spectacle presentation is a React component, I was able to embed my example components into my slides and interact with them live.

<div class="grid">
  <div class="col-2-12 hide-on-mobile"></div>
  <div class="col-8-12">
    <div class="text-center" style="margin-top: 5px;">
      <div style="display: inline-block; max-width: 100%;">
        <img class="img-rounded" src="../../assets/images/posts/introduction_to_react/interactive_example.gif" alt="Interactive example"/>
      </div>
    </div>
  </div>
  <div class="col-2-12 hide-on-mobile"></div>
</div>

---

## Feedback

Have questions, comments or suggestions? Reach out to me on Twitter (<a href="https://twitter.com/colinrcummings">@colinrcummings</a>).

— Colin
