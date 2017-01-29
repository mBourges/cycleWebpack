import xs from 'xstream';
import { run } from '@cycle/xstream-run';
import { makeDOMDriver } from '@cycle/dom';
import { makeHistoryDriver } from '@cycle/history';
import { createHistory } from 'history';
import getComponentFromRoute from './routes';

import 'normalize.css/normalize.css';
import './styles.css';

import appLayout from './ui/appLayout';

function main(sources) {
  const sinks = sources.router
    .map(getComponentFromRoute)
    .map(({ value }) => value)
    .flatten()
    .map(c => appLayout({
      DOM: sources.DOM,
      router: sources.router,
      props:{
        child: c.default(sources)
      }
    }));

  const component$ = sinks.map(c => c.DOM).flatten();
  const router$ = sinks.map(c => c.router).flatten();

  return {
    DOM: component$,
    router: router$
  };
}

const dispose = run(main, {
  DOM: makeDOMDriver('#app'),
  router: makeHistoryDriver(createHistory())
});

if (module.hot) {
  module.hot.accept();

  module.hot.dispose(() => {
    dispose();
  });
}
