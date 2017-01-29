import { button } from '@cycle/dom';
// import './style.scss';

function buttonComponent({ DOM, props }) {
  const component$ = props
    .map(({ label, value, type, disabled, primary, raised, accent }) => button('.mdl-button', {
      class: {
        'mdl-button--primary': !!primary,
        'mdl-button--raised': !!raised,
        'mdl-button--accent': !!accent
      },
      props: {
        value,
        type,
        disabled
      }
    }, label));

  const click$ = DOM.select('.mdl-button').events('click').debug();

  return {
    DOM: component$,
    events: {
      click$
    }
  }
}
export default buttonComponent;
