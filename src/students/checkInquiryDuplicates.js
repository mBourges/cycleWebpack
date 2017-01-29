import xs from 'xstream';
import { form, div, h3 } from '@cycle/dom';
import inputComponent from '../ui/input';
import { buttonComponent, navButtonComponent } from '../ui/button';
import sampleCombine from 'xstream/extra/sampleCombine';
import './style.scss';

function checkInquiryDuplicates(sources) {
  const firstnameInput = inputComponent({
    DOM: sources.DOM,
    props: xs.of({
      name: 'Firstname',
      required: true,
      labelFor: '名（漢字）'
    })
  });

  const lastnameInput = inputComponent({
    DOM: sources.DOM,
    props: xs.of({
      name: 'lastname',
      required: true,
      labelFor: '姓（漢字）'
    })
  });

  const birthdateInput = inputComponent({
    DOM: sources.DOM,
    props: xs.of({
      name: 'birthdate',
      type: 'date',
      required: true,
      labelFor: '生年月日'
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



const submit$ = sources.DOM.select('.checkInquiryDuplicates')
  .events('submit')
  .debug(ev => ev.preventDefault());




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
  ]) => form('.checkInquiryDuplicates .row .center-xs', [
    div('.col-xs-6', [
      div('.mdl-card .mdl-shadow--2dp', [
        div('.mdl-card__title', [
          h3('.mdl-card__title-text', '複製確認')
        ]),
        div('.mdl-card__supporting-text', [
          'データ品質のため、問合せ登録前に複製を確認してください。'
        ]),
        div('.mdl-card__supporting-text', [
          lastnameInputDOM,
          firstnameInputDOM,
          birthdateInputDOM,

        ]),
        div('.mdl-card__actions .mdl-card--border', [
          searchSubmitButtonDOM,
          cancelButtonDOM
        ])
      ])
    ])
  ]))

  return {
    DOM: page$,
  }
}

export default checkInquiryDuplicates;
