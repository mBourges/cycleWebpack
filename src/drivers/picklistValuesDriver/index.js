import xs from 'xstream';

function buildDriver(picklistTypes) {
  const values = {
    Gender: [
      { label: 'Male', value: 'male'},
      { label: 'Female', value: 'female'}
    ],
    SchoolYear: [
      { label: '中1', value: '中1'},
      { label: '中2', value: '中2'}
    ]
  };

  return function picklistValuesDriver(sink$, streamAdapter) {
    const select = (picklistType) => xs.of(values[picklistType])

    return {
      select
    }
  }
  /*

  const lock = new Auth0Lock(clientId, domain, options.lockOptions);
  const localStorage = window.localStorage;
  const location = window.location;
  const storageKey = options.storageKey || 'id_token';
  const on = generateSelector(lock);

  return function auth0Driver(sink$, streamAdapter) {
    const initialToken$ = location.hash.indexOf('id_token') !== -1
      ? xs.never()
      : xs.of(localStorage.getItem(storageKey));

    const authenticate$ = on(['authenticated']).map(authResult => {
      localStorage.setItem(storageKey, authResult.idToken);

      return authResult.idToken;
    });

    const autoLoggout = xs.merge(
      initialToken$,
      authenticate$
    ).filter(token => !!token)
    .map(token => {
      const timeleft = getTokenTimeleft(token);

      return xs.periodic(timeleft).take(1);
    }).flatten();

    const removeToken$ = xs.merge(
      sink$.filter(action => action === 'logout'),
      autoLoggout
    ).map(() => {
      localStorage.removeItem(storageKey);

      return null;
    });

    const token$ = xs.merge(
      initialToken$,
      authenticate$,
      removeToken$
    ).map(token => {
      if(token === null) {
        lock.show();
      }

      return token;
    }).remember();

    const profile$ = token$.filter(token => !!token)
      .map(token => xs.fromPromise(getProfile(lock, token)))
      .flatten()
      .startWith(null);

    return {
      on,
      token$,
      profile$
    };
  };*/
}

export default function makePicklistValueDriver(picklistTypes) {
  if (!picklistTypes) {
    throw new Error("[Auth0] You must provide a clientId and a domain");
  }

  return buildDriver(picklistTypes);
}