import xs from 'xstream';
import switchPath from 'switch-path';

export default location => switchPath(location.pathname, {
  '/': xs.fromPromise(System.import('./home')),
  '/inquiry': {
    '/new': xs.fromPromise(System.import('./students/inquiryRegistration'))
  },
  '/student': {
    '/': xs.fromPromise(System.import('./students/searchStudent')),
  },
  '*': xs.fromPromise(System.import('./notFound'))
})
