---
title: A Wedding Website
date: 2017-02-26
layout: Post
hero: ../../assets/images/posts/a_wedding_website/hero.jpg

---

My sister's getting married. During a discussion about how to handle RSVPs for the big day, I floated the option of doing it online. This was a welcome idea; however, it meant she needed a website. The question, then, was to buy or build.

While exploring available options, my suspicions were confirmed: wedding websites are a cottage industry. There's a hodgepodge of do-it-yourself platforms out there promising a "customized look and feel", but the enter fiancé name *here*, and upload photo of you and partner *there*, routine almost invariably results in a ready-made feel (to say nothing of typically poor user experience on smaller devices). Additionally, one-size-fits-all approaches to online RSVPs tend to entail configuration-heavy setups, busy admin interfaces and less-than-seamless form integration on the guest-facing page.

Ultimately, I opted for build. Below is an overview of what turned out to be a really fun project (see the finished product <a target="_blank" href="https://www.brynneanddon.com">here</a>); I've included links to a few resources that I found particularly helpful along the way.

---

## Technology

**tl;dr:** I used the <a target="_blank" href="https://medium.com/@jkchuynh829/the-nerp-stack-29402b6a4355">NERP stack</a> with a webpack build, including hot reloading in development, as well as Nodemailer and Bootsrap 4.

### Back End

Node with Express is my go-to server setup these days. I've used a couple different build tool combinations in other Node-based projects (Grunt, gulp and/or webpack), but this was the first time I let webpack handle everything—JS(X), (S)CSS, HTML, <a target="_blank" href="https://paradite.com/2016/10/25/font-awesome-angular-2-webpack/">icons</a>, <a target="_blank" href="https://shellmonger.com/2016/01/22/working-with-fonts-with-webpack/">fonts</a> and <a target="_blank" href="https://survivejs.com/webpack/loading-assets/loading-images/">images</a>. It can capably and quickly do it all, and with <a target="_blank" href="https://medium.com/@LopezTech/a-web-application-journey-part-3-webpack-dev-server-and-related-improvements-abd5060bd3fc">a little extra configuration</a> you get hot reloading for React components in development, which is *awesome*. I spun up a Postgres database on Heroku to store RSVPs, which is also where the server runs, and used [pg-promise](http://mherman.org/blog/2016/03/13/designing-a-restful-api-with-node-and-postgres/#.WLHfR1UrLIV) to execute CRUD actions. I also used <a target="_blank" href="http://javascript.tutorialhorizon.com/2015/07/02/send-email-node-js-express/">Nodemailer</a> to send guest confirmation and admin notification emails via Gmail, which required some extra configuration as it requires <a target="_blank" href="http://masashi-k.blogspot.com/2013/06/sending-mail-with-gmail-using-xoauth2.html">XOAuth2</a>. Lastly, the admin RSVP management page and its associated API routes are protected using Passport local authentication.

### Front End

In conjunction with React, I used an alpha release of <a target="_blank" href="https://www.artembutusov.com/webpack-customizable-bootstrap-4-x-scss/">Bootstrap 4</a> for the framework. I've been using version 3 for a few years now, and the short lifecycle of this project gave me an opportunity to test drive some of the [changes, additions and removals](https://v4-alpha.getbootstrap.com/migration/) coming in version 4. I also made use of Animate, Moment, Underscore, D3 and Crossfilter in different places.

---

## Guest Splash Page

**tl;dr:** The guest-facing splash page is comprised of 6 sections containing React components (including RSVP submission); how some components render depends on the current date.

### Intro

This component renders a responsive full screen background image with animated <a href="https://css-tricks.com/design-considerations-text-images/" target="_blank">overlay text</a>, a bouncing chevron icon that triggers some <a href="https://gist.github.com/joshcanhelp/a3a669df80898d4097a1e2c01dea52c1" target="_blank">jQuery-free scroll animation</a> and parallax scrolling on larger devices.

<div class="grid">
  <div class="col-2-12 hide-on-mobile"></div>
  <div class="col-8-12">
     <img class="img-rounded" src="../../assets/images/posts/a_wedding_website/index/sections/intro.jpg" alt="Intro component"/>
  </div>
  <div class="col-2-12 hide-on-mobile"></div>
</div>

### Actions / Thank You

One of the biggest benefits of building user interfaces with React is that it makes conditional rendering really easy. This section renders components differently based on the current date's relationship to the wedding and RSVP dates.

Before the wedding date, this section renders a component with two action buttons: a hook for RSVPs and a link to the Registry.

<div class="grid">
  <div class="col-2-12 hide-on-mobile"></div>
  <div class="col-8-12">
    <img class="img-rounded" src="../../assets/images/posts/a_wedding_website/index/sections/actions.jpg" alt="Actions component"/>
  </div>
   <div class="col-2-12 hide-on-mobile"></div>
</div>

As the RSVP date approaches/passes, the RSVP action button renders accordingly.

<div class="grid">
  <div class="col-4-12">
    <div class="text-center">
      <div style="display: inline-block;">
        <div class="text-left">
          <span class="small text-muted">
            <em>Open</em>
          </span>
        </div>
        <img class="img-rounded" src="../../assets/images/posts/a_wedding_website/index/rsvps/actions/rsvps_open.jpg" alt="RSVPs open"/>
      </div>
    </div>
  </div>
  <div class="col-4-12">
    <div class="text-center">
      <div style="display: inline-block;">
        <div class="text-left">
          <span class="small text-muted">
            <em>Closing Soon</em>
          </span>
        </div>
        <img class="img-rounded" src="../../assets/images/posts/a_wedding_website/index/rsvps/actions/rsvps_closing.jpg" alt="RSVPs closing soon"/>
      </div>
    </div>
  </div>
  <div class="col-4-12">
    <div class="text-center">
      <div style="display: inline-block;">
        <div class="text-left">
          <span class="small text-muted">
            <em>Closed</em>
          </span>
        </div>
        <img class="img-rounded" src="../../assets/images/posts/a_wedding_website/index/rsvps/actions/rsvps_closed.jpg" alt="RSVPs closed"/>
      </div>
    </div>
  </div>
</div>

RSVPs are submitted through a series of modal screens launched from the RSVP action button.

<div class="grid">
  <div class="col-2-12 hide-on-mobile"></div>
  <div class="col-8-12">
    <div class="text-center">
      <div style="display: inline-block;">
        <div class="text-left">
          <span class="small text-muted">
            <em>Search</em>
          </span>
        </div>
        <img class="img-rounded" src="../../assets/images/posts/a_wedding_website/index/rsvps/modal/search.jpg" alt="RSVP search"/>
      </div>
    </div>
  </div>
  <div class="col-2-12 hide-on-mobile"></div>
</div>

<div class="grid">
  <div class="col-2-12 hide-on-mobile"></div>
  <div class="col-8-12">
    <div class="text-center" style="margin-top: 5px;">
      <div style="display: inline-block;">
        <div class="text-left">
          <span class="small text-muted">
            <em>Form</em>
          </span>
        </div>
        <img class="img-rounded" src="../../assets/images/posts/a_wedding_website/index/rsvps/modal/form.jpg" alt="RSVP form"/>
      </div>
    </div>
  </div>
  <div class="col-2-12 hide-on-mobile"></div>
</div>

<div class="grid">
  <div class="col-2-12 hide-on-mobile"></div>
  <div class="col-8-12">
    <div class="text-center" style="margin-top: 5px;">
      <div style="display: inline-block;">
        <div class="text-left">
          <span class="small text-muted">
            <em>Result</em>
          </span>
        </div>
        <img class="img-rounded" src="../../assets/images/posts/a_wedding_website/index/rsvps/modal/result.jpg" alt="RSVP result"/>
      </div>
    </div>
  </div>
  <div class="col-2-12 hide-on-mobile"></div>
</div>

If the guest provides an email address in the RSVP form, then they receive a confirmation email.

<div class="grid">
  <div class="col-2-12 hide-on-mobile"></div>
  <div class="col-8-12">
    <img class="img-rounded" src="../../assets/images/posts/a_wedding_website/index/rsvps/emails/guest_confirmation.jpg" alt="RSVPs open"/>
  </div>
  <div class="col-2-12 hide-on-mobile"></div>
</div>

The admin receives a notification email each time an RSVP is submitted.

<div class="grid">
  <div class="col-2-12 hide-on-mobile"></div>
  <div class="col-8-12">
    <img class="img-rounded" src="../../assets/images/posts/a_wedding_website/index/rsvps/emails/admin_notification.jpg" alt="RSVPs closing soon"/>
  </div>
  <div class="col-2-12 hide-on-mobile"></div>
</div>

After the wedding date, this section renders a component with a thank you note so the splash page isn't anachronistic.

<div class="grid">
  <div class="col-2-12 hide-on-mobile"></div>
  <div class="col-8-12">
    <img class="img-rounded" src="../../assets/images/posts/a_wedding_website/index/sections/thank_you.jpg" alt="Thank You component"/>
  </div>
  <div class="col-2-12 hide-on-mobile"></div>
</div>

### Bios

This component renders bride and groom bios using Bootstrap 4's new <a href="https://v4-alpha.getbootstrap.com/components/card/" target="_blank">Card component</a>.

<div class="grid">
  <div class="col-2-12 hide-on-mobile"></div>
  <div class="col-8-12">
     <img class="img-rounded" src="../../assets/images/posts/a_wedding_website/index/sections/bios.jpg" alt="Bios component"/>
  </div>
  <div class="col-2-12 hide-on-mobile"></div>
</div>

### Events

This component is based on a <a href="https://codyhouse.co/gem/vertical-timeline/" target="_blank">responsive vertical timeline template</a>. I added rotating <a href="http://www.flaticon.com/packs/wedding-and-love" target="_blank">icons</a>, a happening now indicator and directions (in a modal) using the <a href="https://developers.google.com/maps/documentation/embed/guide" target="_blank">Google Maps Embedded API</a> (with <a href="https://developers.google.com/maps/documentation/javascript/geolocation" target="_blank">geolocation</a>).

<div class="grid">
  <div class="col-6-12">
    <div class="text-center">
      <div style="display: inline-block;">
        <div class="text-left">
          <span class="small text-muted">
            <em>Timeline</em>
          </span>
        </div>
        <img class="img-rounded" src="../../assets/images/posts/a_wedding_website/index/sections/events.jpg" alt="Events component"/>
      </div>
    </div>
  </div>
  <div class="col-6-12">
    <div class="text-center">
      <div style="display: inline-block;">
        <div class="text-left">
          <span class="small text-muted">
            <em>Directions</em>
          </span>
        </div>
        <img class="img-rounded" src="../../assets/images/posts/a_wedding_website/index/directions.jpg" alt="Directions modal"/>
      </div>
    </div>
  </div>
</div>

### Photos

This component renders a Bootstrap 4 <a href="https://v4-alpha.getbootstrap.com/components/carousel/" target="_blank">Carousel component</a>.

<div class="grid">
  <div class="col-2-12 hide-on-mobile"></div>
  <div class="col-8-12">
     <img class="img-rounded" src="../../assets/images/posts/a_wedding_website/index/sections/photos.jpg" alt="Photos component"/>
  </div>
  <div class="col-2-12 hide-on-mobile"></div>
</div>

### Outro

Before the wedding date, this component renders a count down over a responsive full screen background image with parallax scrolling on larger devices. After the wedding date, the count down becomes a count up.

<div class="grid">
  <div class="col-6-12">
    <div class="text-center" style="margin-top: 5px;">
      <div style="display: inline-block;">
        <div class="text-left">
          <span class="small text-muted">
            <em>Count Down</em>
          </span>
        </div>
        <img class="img-rounded" src="../../assets/images/posts/a_wedding_website/index/sections/outro_count_down.jpg" alt="Outro count down"/>
      </div>
    </div>
  </div>
  <div class="col-6-12">
    <div class="text-center" style="margin-top: 5px;">
      <div style="display: inline-block;">
        <div class="text-left">
          <span class="small text-muted">
            <em>Count Up</em>
          </span>
        </div>
        <img class="img-rounded" src="../../assets/images/posts/a_wedding_website/index/sections/outro_count_up.jpg" alt="Outro count up"/>
      </div>
    </div>
  </div>
</div>

---

## Admin RSVP Management Page

**tl;dr:** The admin-facing RSVP management page has a header with add, search and filter icons, in addition to two tabs: one to review RSVPs at a high level and another to review, edit and delete individual RSVPs.

### Header

The header has icons for adding a new RSVP (in a modal), searching RSVPs by name (using <a href="https://github.com/ericgio/react-bootstrap-typeahead" target="_blank">react-bootstrap-typeahead</a>) and filtering RSVPs by status.

<div class="grid">
  <div class="col-4-12">
    <div class="text-center" style="margin-top: 5px;">
      <div style="display: inline-block;">
        <div class="text-left">
          <span class="small text-muted">
            <em>Add</em>
          </span>
        </div>
        <img class="img-rounded" src="../../assets/images/posts/a_wedding_website/rsvps/actions/add.jpg" alt="Add RSVP"/>
      </div>
    </div>
  </div>
  <div class="col-4-12">
    <div class="text-center" style="margin-top: 5px;">
      <div style="display: inline-block;">
        <div class="text-left">
          <span class="small text-muted">
            <em>Search</em>
          </span>
        </div>
        <img class="img-rounded" src="../../assets/images/posts/a_wedding_website/rsvps/actions/search.jpg" alt="Search RSVPs"/>
      </div>
    </div>
  </div>
  <div class="col-4-12">
    <div class="text-center" style="margin-top: 5px;">
      <div style="display: inline-block;">
        <div class="text-left">
          <span class="small text-muted">
            <em>Filter</em>
          </span>
        </div>
        <img class="img-rounded" src="../../assets/images/posts/a_wedding_website/rsvps/actions/filter.jpg" alt="Filter RSVPs"/>
      </div>
    </div>
  </div>
</div>

### Summary Tab

The summary tab renders two donut charts: one summarizing RSVPs and another summarizing attendance.

<div class="grid">
  <div class="col-2-12 hide-on-mobile"></div>
  <div class="col-8-12">
     <img class="img-rounded" src="../../assets/images/posts/a_wedding_website/rsvps/tabs/summary.jpg" alt="RSVP summary"/>
  </div>
  <div class="col-2-12 hide-on-mobile"></div>
</div>

### Details Tab

The details tab renders a sortable table with a sticky header and export to Excel functionality. Each RSVP row has an edit and delete icon.

<div class="grid">
  <div class="col-2-12 hide-on-mobile"></div>
  <div class="col-8-12">
     <img class="img-rounded" src="../../assets/images/posts/a_wedding_website/rsvps/tabs/details.jpg" alt="RSVP details"/>
  </div>
  <div class="col-2-12 hide-on-mobile"></div>
</div>

RSVPs are edited inline with validations for each attribute.

<div class="grid">
  <div class="col-2-12 hide-on-mobile"></div>
  <div class="col-8-12">
     <img class="img-rounded" src="../../assets/images/posts/a_wedding_website/rsvps/actions/edit.jpg" alt="RSVP edit"/>
  </div>
  <div class="col-2-12 hide-on-mobile"></div>
</div>

RSVPs are deleted by way of modal confirmation.

<div class="grid">
  <div class="col-2-12 hide-on-mobile"></div>
  <div class="col-8-12">
     <img class="img-rounded" src="../../assets/images/posts/a_wedding_website/rsvps/actions/delete.jpg" alt="RSVP delete"/>
  </div>
  <div class="col-2-12 hide-on-mobile"></div>
</div>

---

## Performance

From Google's <a href="https://testmysite.thinkwithgoogle.com/" target="_blank">PageSpeed Insights</a>:

<div class="grid">
  <div class="col-2-12 hide-on-mobile"></div>
  <div class="col-8-12">
     <img class="img-rounded" src="../../assets/images/posts/a_wedding_website/page_speed.jpg" alt="PageSpeed Insights"/>
  </div>
  <div class="col-2-12 hide-on-mobile"></div>
</div>
