import { div, i } from '@cycle/dom';
import isolate from '@cycle/isolate';
import './style.scss';

function iconComponent({ DOM, props }) {
  const component$ = props
    .map(({ icon }) => div('.icon',[
      i('.material-icons', icon)
    ]));

  const click$ = DOM.select('.icon').events('click');
  const mouseenter$ = DOM.select('.icon').events('mouseenter');

  return {
    DOM: component$,
    events: {
      click$,
      mouseenter$
    }
  }
}

export default function icon(sources) {
  return isolate(iconComponent)(sources);
}