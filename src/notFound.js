import xs from 'xstream';
import { div, h2, a } from '@cycle/dom';

export default function OtherComponent(sources) {
  const router = sources.DOM.select('a').events('click')
    .debug(ev => ev.preventDefault())
    .map(ev => ev.target.pathname);

  return {
    DOM: xs.of(div([
      h2('Page not found. return to homepage.'),
      a({ props: { href: '/' } }, 'Link to Home')
    ])),
    router
  };
}
