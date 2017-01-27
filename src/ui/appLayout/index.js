import xs from 'xstream';
import { div, h2, a} from '@cycle/dom';
import appBar from '../appBar';
import './style.scss';

export default function AppLayout(sources) {
  const router = sources.DOM.select('a').events('click')
    .map(ev => {
      ev.preventDefault();

      return ev.target.pathname;
    });

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
