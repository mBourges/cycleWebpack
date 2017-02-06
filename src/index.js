import xs from 'xstream';
import { run } from '@cycle/xstream-run';
import { makeDOMDriver } from '@cycle/dom';
import { makeHTTPDriver } from '@cycle/http';
import { makeHistoryDriver } from '@cycle/history';
import { createHistory } from 'history';
import makeAuth0Driver from './drivers/auth0Driver';
import makePicklistValueDriver from './drivers/picklistValuesDriver';
import getComponentFromRoute from './routes';

import 'normalize.css/normalize.css';
import 'semantic-ui-css/semantic.min.css';
import './styles.css';

import appLayout from './ui/appLayout';

function app(sources) {
  return sources.router
    .map(getComponentFromRoute)
    .map(({ value }) => value)
    .flatten()
    .map(c => appLayout({
      DOM: sources.DOM,
      router: sources.router,
      HTTP: sources.HTTP,
      picklistValues: sources.picklistValues,
      props:{
        child: c.default(sources)
      }
    }));
}

function main(sources) {
  const logout$ = sources.DOM.select('.logout').events('click')
    .debug(event => event.preventDefault())
    .mapTo('logout');

  const displayLogin = sources.auth0.token$
    .filter(token => !token)
    .map(() => xs.never());

  const redirectAfterLogin = sources.auth0.on(['authenticated'])
    .map(({ state }) => JSON.parse(state))
    .map(({ pathname }) => xs.of(pathname));

  const sinks = sources.auth0.token$
    .filter(token => !!token)
    .map(() => app(sources))
    .flatten();

  const component$ = xs.merge(
    displayLogin,
    sinks.map(c => c.DOM)
  ).flatten();
  const router$ = xs.merge(
    redirectAfterLogin,
    sinks.map(c => c.router)
  ).flatten();

  const request$ = sinks.map(c => c.HTTP).flatten();

  return {
    DOM: component$,
    router: router$,
    HTTP: request$.debug(),
    auth0: logout$
  };
}

const dispose = run(main, {
  DOM: makeDOMDriver('#app'),
  HTTP: makeHTTPDriver(),
  picklistValues: makePicklistValueDriver([]),
  router: makeHistoryDriver(createHistory()),
  auth0: makeAuth0Driver(
    '6eRUnFnqvHLY878KJ1V8Rc02dXgTWGke',
    'quard.auth0.com',
    // '09ViMqXjKjrASjbnzRpICiTdCJ3sKr51',
    // 'appmonster.auth0.com',
    {
      storageKey: 'id_token',
      lockOptions: {
        container: 'app',
        allowSignUp: false,
        socialBigButtons: true,
        focusInput: true,
        auth: {
          redirectUrl: `${window.location.origin}/`,
          responseType: 'token',
          params: {
            scope: 'openid user_metadata',
            state: JSON.stringify({
              pathname: window.location.pathname,
              search: window.location.search
            })
          }
        }
      }
    }
  )
});

if (module.hot) {
  module.hot.accept();

  module.hot.dispose(() => {
    dispose();
  });
}
