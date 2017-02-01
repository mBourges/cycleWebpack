import xs from 'xstream';
import checkInquiryDuplicates from './checkInquiryDuplicates';
import { h2, div } from '@cycle/dom';
// import inputComponent from '../ui/input';
// import { buttonComponent } from '../ui/button';
// import sampleCombine from 'xstream/extra/sampleCombine'

function inquiryRegistration(sources) {
  const checkInquiryDuplicatesComponent = checkInquiryDuplicates(sources);

  const page$ = xs.combine(
    checkInquiryDuplicatesComponent.DOM
  ).map(([checkInquiryDuplicatesComponentDOM]) => div([
    h2('Inquiry Registration'),
    checkInquiryDuplicatesComponentDOM
  ]))

  return {
      DOM: page$,
      HTTP: checkInquiryDuplicatesComponent.HTTP
  };
//   const firstnameInput = inputComponent({
//     DOM: sources.DOM,
//     props: xs.of({
//       name: 'Firstname'
//     })
//   });
//
//   const lastnameInput = inputComponent({
//     DOM: sources.DOM,
//     props: xs.of({
//       name: 'lastname'
//     })
//   });
//
//   const searchSubmitButton = buttonComponent({
//     DOM: sources.DOM,
//     props: xs.of({
//       label: 'Search',
//       name: 'searchButton'
//     })
//   })
//
//   const formIput$ = xs.merge(
//     firstnameInput.events.input$,
//     lastnameInput.events.input$
//   ).map(ev => ({
//     path: ev.target.name,
//     value: ev.target.value
//   }))
//   .fold((acc, item) => ({ ...acc, [item.path]: item.value }))
//
//
//
// const submit$ = searchSubmitButton.events.click$;
//
//
//
//
// submit$.compose(sampleCombine(formIput$))
//     .addListener({
//       next: i => console.log('send', i),
//       error: err => console.error(err),
//       complete: () => console.log('completed'),
//     })
//
//
//
//
//   const page$ = xs.combine(
//     firstnameInput.DOM,
//     lastnameInput.DOM,
//     searchSubmitButton.DOM
//   )
//     .map(([firstnameInputDom, lastnameInputDOM, searchSubmitButtonDOM, searchSubmitButton2DOM]) => div([
//       h2('Inquiry Registration'),
//       firstnameInputDom,
//       lastnameInputDOM,
//       searchSubmitButtonDOM
//     ]))
//
//   return {
//     DOM: page$,
//   }
}

export default inquiryRegistration;
