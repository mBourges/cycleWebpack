import xs from 'xstream';
import checkInquiryDuplicates from './checkInquiryDuplicates';
import newInquiryForm from './newInquiryForm';
import duplicatesList from './duplicatesList';
import { h2, div } from '@cycle/dom';

function inquiryRegistration(sources) {
  const checkInquiryDuplicatesComponent = checkInquiryDuplicates(sources);
  const newInquiryFormComponent = newInquiryForm(sources, checkInquiryDuplicatesComponent.inquiry);
  const duplicatesListComponent = duplicatesList(sources);
  const searchInquiryDuplicate$ = sources.HTTP.select('inquiryDuplicates')
    .flatten();

  const isSearchDone$ = searchInquiryDuplicate$.mapTo(true)
    .startWith(false);

  const hasDuplicates$ = searchInquiryDuplicate$
    .map(response => response.body.hits && (response.body.hits.hits.length !== 0))
    .debug()
    .startWith(false);

  searchInquiryDuplicate$.addListener({
    next: i => console.log(i),
    error: err => console.error(err),
    complete: () => console.log('completed'),
  });

  const page$ = xs.combine(
    isSearchDone$,
    hasDuplicates$,
    checkInquiryDuplicatesComponent.DOM,
    newInquiryFormComponent.DOM,
    duplicatesListComponent.DOM
  ).map(([isSearchDone, hasDuplicates, checkInquiryDuplicatesComponentDOM, newInquiryFormComponentDOM, duplicatesListComponentDOM]) => {
    console.log('page$', isSearchDone$, hasDuplicates, isSearchDone$ && hasDuplicates)
    return div([
    h2('Inquiry Registration'),
    isSearchDone ? null : checkInquiryDuplicatesComponentDOM,
    isSearchDone && hasDuplicates ? duplicatesListComponentDOM : null,
    isSearchDone && !hasDuplicates ? newInquiryFormComponentDOM : null
  ])});

  return {
      DOM: page$,
      HTTP: checkInquiryDuplicatesComponent.HTTP
  };
}

export default inquiryRegistration;
