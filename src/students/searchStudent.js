import xs from 'xstream';
import { div, h2, a } from '@cycle/dom';

import { navButtonComponent } from '../ui/button';

function searchStudent(sources) {
  const newInquiryButton = navButtonComponent({
    DOM: sources.DOM,
    props: xs.of({
      label: 'NEW',
      primary: true,
      raised: true,
      value: '/inquiry/new'
    })
  });

  const component$ = xs.combine(
    newInquiryButton.DOM
  ).map(([newInquiryButtonDOM]) => div('.row', [
    div('.col-xs-12', [
      h2('Students'),
      newInquiryButtonDOM
    ])
  ]))

  return {
    DOM: component$
  }
}

export default searchStudent;
