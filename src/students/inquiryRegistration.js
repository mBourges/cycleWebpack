import xs from 'xstream';
import { h2 } from '@cycle/dom';

function inquiryRegistration(sources) {
  return {
    DOM: xs.of(h2('Inquiry Registration')),
  }
}

export default inquiryRegistration;