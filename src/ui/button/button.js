import { button } from '@cycle/dom';
// import './style.scss';

function buttonComponent({ DOM, props }) {
  const component$ = props
    .map(({ label, value, type, disabled, primary, positive, negative, loading }) => button('.ui.button', {
      class: {
        'primary': !!primary,
        'positive': !!positive,
        'negative': !!negative,
        'loading': !!loading
      },
      props: {
        value,
        type,
        disabled
      }
    }, label));

  const click$ = DOM.select('.ui.button').events('click').debug();

  return {
    DOM: component$,
    events: {
      click$
    }
  }
}
export default buttonComponent;
