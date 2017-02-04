import xs from 'xstream';
import { label } from '@cycle/dom';

function newInquiryForm(sources) {
  return {
    DOM: xs.of(label('New Inquiry Form'))
  };
}

export default newInquiryForm;
