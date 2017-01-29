import xs from 'xstream';
import { h2 } from '@cycle/dom';

export default function HomeComponent(sources) {
  return {
    DOM: xs.of(h2('Welcome in Engine'))
  };
}
