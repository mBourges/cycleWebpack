import xs from 'xstream';
import { div, button, a} from '@cycle/dom';
import desktopMenu from '../appBar/desktopMenu';
import mobileMenu from '../appBar/mobileMenu';
import mobileSidebar from '../appBar/mobileSidebar';
import './style.scss';

export default function AppLayout(sources) {
   const navLinkClick$ = sources.DOM.select('.navLink').events('click')
    .map(ev => {
      ev.preventDefault();

      return ev.target.pathname;
    });

    const navButtonClick$ = sources.DOM.select('.ui.button').events('click')
     .map(ev => {
       ev.preventDefault();

       return ev.target.value;
     });

  const router = xs.merge(navLinkClick$, navButtonClick$)

  const AppBar = desktopMenu({
    DOM: sources.DOM,
    props: xs.of({ title: 'Engine'})
  })

  const MobileAppBar = mobileMenu({
    DOM: sources.DOM,
    props: xs.of({ title: 'Engine'})
  })

  const openMenu$ = xs.merge(
    MobileAppBar.openMenu$,
    sources.DOM.select('.pusher.dimmed').events('click').mapTo(false)
  ).startWith(false);

  const MobileSidebar = mobileSidebar({
    DOM: sources.DOM,
    props: xs.of({ isOpen$: openMenu$ })
  })

  const child = sources.props.child

  const page$ = xs.combine(AppBar.DOM, MobileAppBar.DOM, child.DOM, MobileSidebar.DOM, openMenu$)
    .map(([AppBarDOM, MobileAppBarDOM, childDOM, MobileSidebarDOM, isOpen]) =>
      div('.pushable', [
        MobileAppBarDOM,
        MobileSidebarDOM,
        div('.pusher', {class: { dimmed: isOpen}}, [
          div('.full.height', [
            AppBarDOM,
            div('.article', [
              div('.article__inner', [
                childDOM,
                button('.logout', 'logout')
              ])
            ])
          ])
        ])
      ]))

  return {
    DOM: page$,
    router
  };
}
