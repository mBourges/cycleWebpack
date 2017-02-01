import xs from 'xstream';
import { div, a, nav, ul, li, i } from '@cycle/dom';

import './style.scss';

function mobileSidebar({ DOM, props }) {
  const isOpen$ =  props.map(props => props.isOpen$)
    .flatten().startWith(false)

  const component$ = isOpen$
    .map(isOpen => div('.ui.vertical.inverted.sidebar.menu.left.animating.overlay', {
      class: {
        visible: isOpen,
        hidden: !isOpen
      }
    },[
      div('.item', [
        div('.menu', [
          a('.item .navLink', { props: { href: '/' } }, 'Home'),
        ])
      ])
    ]));

  return {
    DOM: component$
  };
}

export default mobileSidebar;








/*




<div class="item">
  <a class="ui logo icon image" href="/">
    <img src="/images/logo.png">
  </a>
  <a href="/"><b>UI Docs</b></a>
</div>
<a class="item" href="/introduction/getting-started.html">
  <b>Getting Started</b>
</a>
<a class="item" href="/introduction/new.html">
  <b>New in 2.2</b>
</a>
<div class="item">
  <div class="header">Introduction</div>
  <div class="menu">

      <a class="item" href="/introduction/integrations.html">
        Integrations
      </a>

      <a class="item" href="/introduction/build-tools.html">
        Build Tools
      </a>

      <a class="item" href="/introduction/advanced-usage.html">
        Recipes
      </a>

      <a class="item" href="/introduction/glossary.html">
        Glossary
      </a>

  </div>
</div>
<div class="item">
  <div class="header">Usage</div>
  <div class="menu">

      <a class="item" href="/usage/theming.html">
        Theming
      </a>

      <a class="item" href="/usage/layout.html">
        Layouts
      </a>

  </div>
</div>
<div class="item">
  <div class=" header">Globals</div>
  <div class="menu">

      <a class="item" href="/globals/reset.html">
        Reset

      </a>

      <a class="item" href="/globals/site.html">
        Site

      </a>

  </div>
</div>
<div class="item">
  <div class="active  header">Elements</div>
  <div class="menu">

      <a class="item" href="/elements/button.html">
        Button

      </a>

      <a class="item" href="/elements/container.html">
        Container

      </a>

      <a class="item" href="/elements/divider.html">
        Divider

      </a>

      <a class="item" href="/elements/flag.html">
        Flag

      </a>

      <a class="item" href="/elements/header.html">
        Header

      </a>

      <a class="item" href="/elements/icon.html">
        Icon

      </a>

      <a class="item" href="/elements/image.html">
        Image

      </a>

      <a class="item" href="/elements/input.html">
        Input

      </a>

      <a class="item" href="/elements/label.html">
        Label

      </a>

      <a class="item" href="/elements/list.html">
        List

      </a>

      <a class="item" href="/elements/loader.html">
        Loader

      </a>

      <a class="item" href="/elements/rail.html">
        Rail

      </a>

      <a class="item" href="/elements/reveal.html">
        Reveal

      </a>

      <a class="item" href="/elements/segment.html">
        Segment

      </a>

      <a class="item" href="/elements/step.html">
        Step

      </a>

  </div>
</div>
<div class="item">
  <div class=" header">Collections</div>
  <div class="menu">

      <a class="item" href="/collections/breadcrumb.html">
        Breadcrumb

      </a>

      <a class="item" href="/collections/form.html">
        Form

      </a>

      <a class="item" href="/collections/grid.html">
        Grid

      </a>

      <a class="item" href="/collections/menu.html">
        Menu

      </a>

      <a class="item" href="/collections/message.html">
        Message

      </a>

      <a class="item" href="/collections/table.html">
        Table

      </a>

  </div>
</div>
<div class="item">
  <div class=" header">Views</div>
  <div class="menu">

      <a class="item" href="/views/advertisement.html">
        Advertisement

      </a>

      <a class="item" href="/views/card.html">
        Card

      </a>

      <a class="item" href="/views/comment.html">
        Comment

      </a>

      <a class="item" href="/views/feed.html">
        Feed

      </a>

      <a class="item" href="/views/item.html">
        Item

      </a>

      <a class="item" href="/views/statistic.html">
        Statistic

      </a>

  </div>
</div>
<div class="item">
  <div class=" header">Modules</div>
  <div class="menu">

      <a class="item" href="/modules/accordion.html">
        Accordion

      </a>

      <a class="item" href="/modules/checkbox.html">
        Checkbox

      </a>

      <a class="item" href="/modules/dimmer.html">
        Dimmer

      </a>

      <a class="item" href="/modules/dropdown.html">
        Dropdown

      </a>

      <a class="item" href="/modules/embed.html">
        Embed

      </a>

      <a class="item" href="/modules/modal.html">
        Modal

      </a>

      <a class="item" href="/modules/nag.html">
        Nag

      </a>

      <a class="item" href="/modules/popup.html">
        Popup

      </a>

      <a class="item" href="/modules/progress.html">
        Progress

      </a>

      <a class="item" href="/modules/rating.html">
        Rating

      </a>

      <a class="item" href="/modules/search.html">
        Search

      </a>

      <a class="item" href="/modules/shape.html">
        Shape

      </a>

      <a class="active item" href="/modules/sidebar.html">
        Sidebar

      </a>

      <a class="item" href="/modules/sticky.html">
        Sticky

      </a>

      <a class="item" href="/modules/tab.html">
        Tab

      </a>

      <a class="item" href="/modules/transition.html">
        Transition

      </a>

  </div>
</div>
<div class="item">
  <div class=" header">Behaviors</div>
  <div class="menu">

      <a class="item" href="/behaviors/api.html">
        API

      </a>

      <a class="item" href="/behaviors/form.html">
        Form Validation

      </a>

      <a class="item" href="/behaviors/visibility.html">
        Visibility

      </a>

  </div>
</div>

</div>*/