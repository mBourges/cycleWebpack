import xs from 'xstream';
import { form, div, h4, label } from '@cycle/dom';
import '../style.scss';

export default function view({ form$, isSearchSubmitted$ }) {
  return xs.combine(
    isSearchSubmitted$,
    form$
  ).map(([
    isSearchSubmitted,
    [
      firstnameInputDOM,
      lastnameInputDOM,
      birthdateInputDOM,
      searchSubmitButtonDOM,
      cancelButtonDOM
    ]
  ]) => form('.ui.form.checkInquiryDuplicates', [
    div('.ui.inverted.dimmer', { class: { active: isSearchSubmitted} }, [
      div('.ui.text.loader', 'Loading')
    ]),
    h4('.ui.dividing.header', '複製確認'),
    div('.field.required', [
      label('Name'),
      div('.two.fields', [
        lastnameInputDOM,
        firstnameInputDOM
      ])
    ]),
    div('.field.required', [
      label('生年月日'),
      birthdateInputDOM
    ]),
    searchSubmitButtonDOM,
    cancelButtonDOM
  ]));
}