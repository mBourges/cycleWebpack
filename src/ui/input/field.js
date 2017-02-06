import xs from 'xstream';
import { div, label, input, span } from '@cycle/dom';
import isolate from '@cycle/isolate';
import './style.scss';

function inputComponent({ DOM }, props = xs.of({})) {
  const component$ = props
    .map(props => input('.inputField', {
        props: {
          name: props.name,
          type: props.type || 'text',
          defaultValue: props.value || '',
          required: props.required,
          autofocus: !!props.autofocus,
          placeholder: props.placeholder || ''
        }
      }));

  const input$ = DOM.select('.inputField').events('input');

  return {
    DOM: component$,
    events: {
      input$
    }
  }
}

export default (sources, props) => isolate(inputComponent)(sources, props);
