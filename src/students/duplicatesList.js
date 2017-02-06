import { h4, div } from '@cycle/dom';
import { fromJS, Map } from 'immutable';
import { formatDate } from '../helpers/dateHelpers';
import './style.scss';

function generateCard(inquiry) {
  return div('.card', [
    div('.content', [
      div('.header', `${inquiry.getIn(['_source', 'LastnameKanji'])} ${inquiry.getIn(['_source', 'FirstnameKanji'])}`),
      div('.meta', `${inquiry.getIn(['_source', 'LastnameFurigana'])} ${inquiry.getIn(['_source', 'FirstnameFurigana'])}`),
      div('.description', [
        div(`生年月日： ${formatDate(inquiry.getIn(['_source', 'BirthDate']))}`),
        div(`${inquiry.getIn(['_source', 'School'])} (${inquiry.getIn(['_source', 'SchoolYear'])})`)
      ]),
      div('.description.extaDescription', [
        h4('保護者'),
        div(`${inquiry.getIn(['_source', 'Protector', 'LastnameKanji'])} ${inquiry.getIn(['_source', 'Protector', 'FirstnameKanji'])}`),
        div(inquiry.getIn(['_source', 'Protector', 'Phone']))
      ])
    ])
  ]);
}



   /*
<CardText>


   <CardText>
      <h5 className="inquiry__card-text-title">保護者</h5>
      <div>{ inquiry.Protector && `${inquiry.Protector.LastnameKanji} ${inquiry.Protector.FirstnameKanji}` }</div>
      <div>{ inquiry.Protector && inquiry.Protector.Phone }</div>
    </CardText>*/

function intent({ HTTP }) {
  return HTTP.select('inquiryDuplicates').flatten()
    .map(response => fromJS(response.body))
    .startWith(Map());
}

function model(changes$) {
  return changes$.map(response => response.getIn(['hits', 'hits']));

}

function view(state$) {
  return state$.map(hits =>
    hits ? hits.map(generateCard /*hit => div('.card', hit.getIn(['_source', 'FirstnameKanji']))*/).toJS() : null
  ).map(duplicates => div([
    h4('Dups'),
    div({ class: { 'ui': true, 'three': true, 'stackable': true, 'cards': true } }, duplicates)
  ]));
}

function duplicatesList(sources) {
  const changes$ = intent(sources).debug();
  const state$ = model(changes$).debug();
  const component$ = view(state$).debug();

  return {
    DOM: component$
  };
}

export default duplicatesList;
