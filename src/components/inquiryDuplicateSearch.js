import xs from 'xstream';
import { h2 } from '@cycle/dom';

function inquirySearchDuplicate(sources) {
  return {
    DOM: xs.of(h2('Inquiry Search Duplicates'))
  }
}

export default inquirySearchDuplicate;