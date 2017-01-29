import xs from 'xstream';
import { div, label, input, span } from '@cycle/dom';
import isolate from '@cycle/isolate';
import './style.scss';

function inputComponent({ DOM, props }) {
  const initialFocus$ = props.map(props => props.autofocus).take(1);
  const isFocused$ = xs.merge(
    initialFocus$,
    DOM.select('.mdl-textfield__input').events('focus').mapTo(true),
    DOM.select('.mdl-textfield__input').events('blur').mapTo(false)
  );
  const initialIsDirty$ = props.map(props => props.value).take(1);
  const isDirty$ = xs.merge(
    initialIsDirty$,
    DOM.select('.mdl-textfield__input').events('input').map(ev => event.target.value !== '')
  )
    
  const component$ = xs.combine(props, isFocused$, isDirty$)
    .map(([props, isFocused, isDirty]) => div('.mdl-textfield .mdl-textfield--floating-label', {
      class: {
        'is-focused': isFocused,
        'is-dirty': isDirty
      }
    } , [
      input(`.mdl-textfield__input`, {
        props: {
          name: props.name,
          type: props.type || 'text',
          defaultValue: props.value || '',
          required: props.required,
          autofocus: !!props.autofocus
        }
      }),
      label('.mdl-textfield__label', props.labelFor || '')
    ]));

  const input$ = DOM.select('.mdl-textfield__input').events('input');

  return {
    DOM: component$,
    events: {
      input$
    }
  }
}

export default sources => isolate(inputComponent)(sources);
