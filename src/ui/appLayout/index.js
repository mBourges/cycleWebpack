import xs from 'xstream';
import { div, button, a} from '@cycle/dom';
import desktopMenu from '../appBar/desktopMenu';
import mobileMenu from '../appBar/mobileMenu';
import mobileSidebar from '../appBar/mobileSidebar';
import './style.scss';

import dropdown from '../input/dropdown';

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


const list = dropdown(sources, xs.of({
  default: 'other',
  sources: [{
    label: 'Male',
    value: 'male'
  }, {
    label: 'Female',
    value: 'female'
  }, {
    label: 'Other',
    value: 'other'
  }]
}));
// const list2 = dropdown(sources);

list.selectedValue$.addListener({
  next: i => console.log('selected Value: ', i),
  error: err => console.error(err),
  complete: () => console.log('completed'),
})

  const page$ = xs.combine(list.DOM, /*list2.DOM,*/ AppBar.DOM, MobileAppBar.DOM, child.DOM, MobileSidebar.DOM, openMenu$)
    .map(([listDOM, /*list2DOM,*/ AppBarDOM, MobileAppBarDOM, childDOM, MobileSidebarDOM, isOpen]) =>
      div('.pushable', [
        MobileAppBarDOM,
        MobileSidebarDOM,
        div('.pusher', {class: { dimmed: isOpen}}, [
          div('.full.height', [
            AppBarDOM,
            div('.article', [
              div('.article__inner', [
                childDOM,
                listDOM,
                /*list2DOM*/
              ])
            ])
          ])
        ])
      ]))

  return {
    DOM: page$,
    router,
    HTTP: child.HTTP || xs.never()
  };
}
