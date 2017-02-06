import xs from 'xstream';
import { div, button, a} from '@cycle/dom';
import desktopMenu from '../appBar/desktopMenu';
import mobileMenu from '../appBar/mobileMenu';
import mobileSidebar from '../appBar/mobileSidebar';
import './style.scss';

import dropdown from '../input/dropdown';
import autocomplete from '../input/autocomplete';

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
  name: 'Gender',
  value: 'male',
  sources: sources.picklistValues.select('Gender')
}));
const list2 = dropdown(sources, xs.of({
  default: 'other',
  sources: xs.of([{
    label: 'Male',
    value: 'male'
  }, {
    label: 'Female',
    value: 'female'
  }, {
    label: 'Other',
    value: 'other'
  }])
}));

const search = autocomplete(sources, xs.of({
  name: 'GenderSearch',
  // value: 'other',
  sources: sources.picklistValues.select('Gender')
}));


list.value$.addListener({
  next: i => console.log('selected Value: ', i),
  error: err => console.error(err),
  complete: () => console.log('completed'),
})

list2.value$.addListener({
  next: i => console.log('selected Value: ', i),
  error: err => console.error(err),
  complete: () => console.log('completed'),
})

search.value$.addListener({
  next: i => console.log('search Value: ', i),
  error: err => console.error(err),
  complete: () => console.log('completed'),
})

sources.picklistValues.select('Gender').addListener({
  next: i => console.log('APP SOURCES ', i),
  error: err => console.error(err),
  complete: () => console.log('completed'),
})

  const page$ = xs.combine(list.DOM, list2.DOM, search.DOM, AppBar.DOM, MobileAppBar.DOM, child.DOM, MobileSidebar.DOM, openMenu$)
    .map(([listDOM, list2DOM, searchDOM, AppBarDOM, MobileAppBarDOM, childDOM, MobileSidebarDOM, isOpen]) =>
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
                list2DOM,
                searchDOM
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
