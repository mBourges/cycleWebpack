import xs from 'xstream';
import { form, div, h4, label } from '@cycle/dom';
import fieldComponent from '../ui/input/field';
import { buttonComponent, navButtonComponent } from '../ui/button';
import sampleCombine from 'xstream/extra/sampleCombine';
import './style.scss';

import generateSearchInquiryDuplicatesQuery from '../queries/searchInquiryDuplicates';

function intent({ DOM }, {
  firstnameInput,
  lastnameInput,
  birthdateInput,
  searchSubmitButton,
  cancelButton
}) {
  const form$ = xs.combine(
    firstnameInput.DOM,
    lastnameInput.DOM,
    birthdateInput.DOM,
    searchSubmitButton.DOM,
    cancelButton.DOM
  );

  const formInput$ = xs.merge(
    firstnameInput.events.input$,
    lastnameInput.events.input$,
    birthdateInput.events.input$
  ).map(ev => ({
    path: ev.target.name,
    value: ev.target.value
  }))
  .fold((acc, item) => ({ ...acc, [item.path]: item.value }));

  const submit$ = DOM.select('.checkInquiryDuplicates').events('submit')
    .debug(event => event.preventDefault());

  const request$ = submit$.compose(sampleCombine(formInput$))
    .map(([ev, queryParams]) => queryParams)
    .map(({Firstname, Lastname, BirthDate}) => ({
      url: generateSearchInquiryDuplicatesQuery(Firstname, Lastname, BirthDate),
      lazy: true,
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('id_token')}`
      },
      category: 'inquiryDuplicates',
    }));

  return {
    form$,
    submit$,
    request$
  }
}

function model({ form$, submit$ }) {
  const isSearchSubmitted$ = submit$.mapTo(true).startWith(false);

  return {
    isSearchSubmitted$,
    form$
  };
}

function view({ form$, isSearchSubmitted$ }) {
  return xs.combine(
    isSearchSubmitted$,
    form$
  ).map(([ isSearchSubmitted, [
    firstnameInputDOM,
    lastnameInputDOM,
    birthdateInputDOM,
    searchSubmitButtonDOM,
    cancelButtonDOM
  ]]) => form('.ui.form.checkInquiryDuplicates', [
    div('.ui.inverted.dimmer', { class: { active: isSearchSubmitted} }, [
      div('.ui.text.loader', 'Loading')
    ]),
    h4('.ui.dividing.header', '複製確認'),
    div('.field', [
      label('Name'),
      div('.two.fields', [
        div('.field.required', [ lastnameInputDOM ]),
        div('.field.required', [ firstnameInputDOM ])
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

function checkInquiryDuplicates(sources) {
  const firstnameInput = fieldComponent({
    DOM: sources.DOM,
    props: xs.of({
      name: 'Firstname',
      required: true,
      placeholder: '名（漢字）'
    })
  });

  const lastnameInput = fieldComponent({
    DOM: sources.DOM,
    props: xs.of({
      name: 'Lastname',
      required: true,
      placeholder: '姓（漢字）'
    })
  });

  const birthdateInput = fieldComponent({
    DOM: sources.DOM,
    props: xs.of({
      name: 'BirthDate',
      type: 'date',
      required: true,
      placeholder: '生年月日'
    })
  });

  const searchSubmitButton = buttonComponent({
    DOM: sources.DOM,
    props: xs.of({
      label: '確認',
      name: 'searchButton',
      type: 'submit',
      primary: true
    })
  })

  const cancelButton = navButtonComponent({
    DOM: sources.DOM,
    props: xs.of({
      label: 'キャンセル',
      name: 'cancelButton',
      type: 'button',
      value: '/student'
    })
  })

  const change$ = intent(sources, {
    firstnameInput,
    lastnameInput,
    birthdateInput,
    searchSubmitButton,
    cancelButton
  });
  const state$ = model(change$/*, sources.props*/ );
  let component$ = view(state$/*, sources.props$*/);

  sources.HTTP.select('inquiryDuplicates').flatten().addListener({
  next: i => console.log(i),
  error: err => console.error(err),
  complete: () => console.log('completed'),
})

  return {
    DOM: component$,
    HTTP: change$.request$
  }
}

/*function checkInquiryDuplicates(sources) {
  const firstnameInput = fieldComponent({
    DOM: sources.DOM,
    props: xs.of({
      name: 'Firstname',
      required: true,
      placeholder: '名（漢字）'
    })
  });

  const lastnameInput = fieldComponent({
    DOM: sources.DOM,
    props: xs.of({
      name: 'Lastname',
      required: true,
      placeholder: '姓（漢字）'
    })
  });

  const birthdateInput = fieldComponent({
    DOM: sources.DOM,
    props: xs.of({
      name: 'BirthDate',
      type: 'date',
      required: true,
      placeholder: '生年月日'
    })
  });

  const searchSubmitButton = buttonComponent({
    DOM: sources.DOM,
    props: xs.of({
      label: '確認',
      name: 'searchButton',
      type: 'submit',
      primary: true
    })
  })

  const cancelButton = navButtonComponent({
    DOM: sources.DOM,
    props: xs.of({
      label: 'キャンセル',
      name: 'cancelButton',
      type: 'button',
      value: '/student'
    })
  })





  const formIput$ = xs.merge(
    firstnameInput.events.input$,
    lastnameInput.events.input$,
    birthdateInput.events.input$
  ).map(ev => ({
    path: ev.target.name,
    value: ev.target.value
  }))
  .fold((acc, item) => ({ ...acc, [item.path]: item.value }))



const submit$ = sources.DOM.select('.checkInquiryDuplicates').events('submit')
  .debug(event => event.preventDefault());

const request$ = submit$.compose(sampleCombine(formIput$))
  .map(([ev, queryParams]) => queryParams)
  .map(({Firstname, Lastname, BirthDate}) => ({
    url: generateSearchInquiryDuplicatesQuery(Firstname, Lastname, BirthDate),
    lazy: true,
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem('id_token')}`
    },
    category: 'inquiryDuplicates',
  }));

sources.HTTP.select('inquiryDuplicates').flatten().addListener({
  next: i => console.log(i),
  error: err => console.error(err),
  complete: () => console.log('completed'),
})


submit$.compose(sampleCombine(formIput$))
    .addListener({
      next: i => console.log('send', i),
      error: err => console.error(err),
      complete: () => console.log('completed'),
    })




  const page$ = xs.combine(
    firstnameInput.DOM,
    lastnameInput.DOM,
    birthdateInput.DOM,
    searchSubmitButton.DOM,
    cancelButton.DOM
  ).map(([
    firstnameInputDOM,
    lastnameInputDOM,
    birthdateInputDOM,
    searchSubmitButtonDOM,
    cancelButtonDOM
  ]) => form('.ui.form.checkInquiryDuplicates', [
    h4('.ui.dividing.header', '複製確認'),
    div('.field', [
      label('Name'),
      div('.two.fields', [
        div('.field.required', [ lastnameInputDOM ]),
        div('.field.required', [ firstnameInputDOM ])
      ])
    ]),
    div('.field.required', [
      label('生年月日'),
      birthdateInputDOM
    ]),
    searchSubmitButtonDOM,
    cancelButtonDOM
  ]))

  return {
    DOM: page$,
    HTTP: request$
  }
}*/

export default checkInquiryDuplicates;
