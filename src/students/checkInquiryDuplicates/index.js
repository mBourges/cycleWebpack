import xs from 'xstream';
import fieldComponent from '../../ui/input/field';
import { buttonComponent, navButtonComponent } from '../../ui/button';
import intent from './intent';
import model from './model';
import view from './view';

function checkInquiryDuplicates(sources) {
  const firstnameInput = fieldComponent(
    sources,
    xs.of({
      name: 'Firstname',
      required: true,
      placeholder: '名（漢字）',
      checkError: value => value === '' || value === null
    }));

  const lastnameInput = fieldComponent(
    sources,
    xs.of({
      name: 'Lastname',
      required: true,
      placeholder: '姓（漢字）',
      checkError: value => value === '' || value === null
    })
  );

  const birthdateInput = fieldComponent(
    sources,
    xs.of({
      name: 'BirthDate',
      type: 'date',
      required: true,
      placeholder: '生年月日',
      checkError: value => value === '' || value === null
    })
  );

  const searchSubmitButton = buttonComponent({
    DOM: sources.DOM,
    props: xs.of({
      label: '確認',
      name: 'searchButton',
      type: 'submit',
      primary: true
    })
  });

  const cancelButton = navButtonComponent({
    DOM: sources.DOM,
    props: xs.of({
      label: 'キャンセル',
      name: 'cancelButton',
      type: 'button',
      value: '/student'
    })
  });

  const form$ = xs.combine(
    firstnameInput.DOM,
    lastnameInput.DOM,
    birthdateInput.DOM,
    searchSubmitButton.DOM,
    cancelButton.DOM
  );

  const change$ = intent(sources, {
    firstnameInput,
    lastnameInput,
    birthdateInput
  });
  const state$ = model(change$);
  let component$ = view({ form$, ...state$ });


  return {
    DOM: component$,
    HTTP: change$.request$,
    inquiry: change$.formInput$
  };
}

export default checkInquiryDuplicates;
