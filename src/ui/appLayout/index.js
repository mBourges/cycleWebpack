import xs from 'xstream';
import { div, h2, a} from '@cycle/dom';
import appBar from '../appBar';
import './style.scss';

export default function AppLayout(sources) {
   const navLinkClick$ = sources.DOM.select('a').events('click')
    .map(ev => {
      ev.preventDefault();

      return ev.target.pathname;
    });

    const navButtonClick$ = sources.DOM.select('.mdl-button').events('click')
     .map(ev => {
       ev.preventDefault();

       return ev.target.value;
     });

  const router = xs.merge(navLinkClick$, navButtonClick$)

  const AppBar = appBar({
    DOM: sources.DOM,
    props: xs.of({ title: 'Engine'})
  })

  const child = sources.props.child

  const page$ = xs.combine(AppBar.DOM, child.DOM)
    .map(([AppBarDOM, childDOM]) => div([
      AppBarDOM,
      div('.container', [
        childDOM
      ])
    ]))

  return {
    DOM: page$,
    router
  };
}
