import xs from 'xstream';
import switchPath from 'switch-path';

export default location => switchPath(location.pathname, {
  '/': xs.fromPromise(System.import('./home')),
  'other': xs.fromPromise(System.import('./notFound')),
  'inquiry': {
    '/': xs.fromPromise(System.import('./notFound')),
    '/new': xs.fromPromise(System.import('./students/inquiryRegistration'))
  },
  '*': xs.fromPromise(System.import('./notFound'))
})