import xs from 'xstream';
import { div, textarea, label } from '@cycle/dom';
import isolate from '@cycle/isolate';
import './style.scss';

function checkInputErrors(checkError, value) {
  return checkError ? checkError(value || null) : false;
}

function checkErrorFromProps(props) {
  return checkInputErrors(props.checkError, props.value);
}

function textAreaComponent({ DOM }, props = xs.of({})) {
  const initialErrorCheck$ = props.map(checkErrorFromProps);
  const defaultValue$ = props.map(props => ({
    name: props.name,
    value: props.value
  }));

  const input$ = DOM.select('.inputField').events('input');
  const inputValue$ = input$.map(event => ({
    name: event.target.name,
    value: event.target.value
  }));
  const value$ = xs.merge(defaultValue$, inputValue$);

  const checkErrors$ = xs.combine(props, input$)
      .map(([props, event]) => checkInputErrors(props.checkError, event.target.value));
  const hasError$ = xs.merge(initialErrorCheck$, checkErrors$);

  const component$ = xs.combine(props, hasError$)
    .map(([props, errors]) => div('.field.', { class: {
      required: props.required,
      error: errors
    } }, [
      label(props.label),
      textarea('.inputField', {
        props: {
          rows: 10,
          name: props.name,
          type: props.type || 'text',
          defaultValue: props.value || '',
          required: props.required,
          autofocus: !!props.autofocus,
          placeholder: props.placeholder || ''
        }
      })
    ]));

  return {
    DOM: component$,
    value$,
    hasError$,
    /*events: {
      input$
    }*/
  };
}

export default (sources, props) => isolate(textAreaComponent)(sources, props);
