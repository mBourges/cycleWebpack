import xs from 'xstream';
import { div, a, nav, ul, li } from '@cycle/dom';

import './style.scss';

function destopMenu({ DOM, props }) {
  /*const menuIcon$ = icon({
    DOM: DOM,
    props: xs.of({icon: 'menu'})
  });
  const appTitle = props.map(props => props.title);

  const component$ = xs.combine(
    appTitle,
    menuIcon$.DOM
  ).map(([title, menuDOM]) => div('.appbar', [
    div('.appbar__menu', [menuDOM]),
    div('.appbar__title', title),
    nav('.appbar__nav', [
      ul([
        li([
          a('.navLink', { props: { href: '/' } }, 'HOME')
        ]),
        li([
          a('.navLink', { props: { href: '/student' } }, 'STUDENTS')
        ])
      ])
    ])
  ]));

  menuIcon$.events.click$.addListener({
    next: i => console.log(i),
    error: err => console.error(err),
    complete: () => console.log('completed'),
  });*/

  return {
    DOM: xs.of(div('.toc', [
  div('.ui .vertical .inverted .sticky .menu', [
    div('.item', [
      div('.menu', [
        a('.item .navLink', { props: { href: '/' } }, 'Home'),
      ])
    ]),
    div('.item', [
      div('.header', 'Students'),
      div('.menu', [
        a('.item .navLink', { props: { href: '/student' } }, 'search'),
        a('.item .navLink', { props: { href: '/inquiry/new' } }, 'New Toiawase'),
        a('.item .logout', { props: { href: '/' } }, 'logout'),
      ])
    ])
  ])
]))
  };
}

export default destopMenu;
