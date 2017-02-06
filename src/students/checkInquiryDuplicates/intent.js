import xs from 'xstream';
import sampleCombine from 'xstream/extra/sampleCombine';
import generateSearchInquiryDuplicatesQuery from '../../queries/searchInquiryDuplicates';
import { setState } from '../../helpers/stateHelpers';
import { wrapApiAuth } from '../../helpers/httpHelpers';

export default function intent({ DOM }, {
  firstnameInput,
  lastnameInput,
  birthdateInput
}) {
  const formInput$ = xs.combine(
    firstnameInput.value$,
    lastnameInput.value$,
    birthdateInput.value$
  ).map(setState).remember();

  const submit$ = DOM.select('.checkInquiryDuplicates').events('submit')
    .debug(event => event.preventDefault());

  const request$ = submit$.compose(sampleCombine(formInput$))
    .map(([ev, queryParams]) => queryParams)
    .map(({Firstname, Lastname, BirthDate}) => wrapApiAuth({
      url: generateSearchInquiryDuplicatesQuery(Firstname, Lastname, BirthDate),
      category: 'inquiryDuplicates',
    }));

  return {
    formInput$,
    submit$,
    request$
  };
}