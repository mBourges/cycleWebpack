import xs from 'xstream';
import { div, label, input, span, i } from '@cycle/dom';
import isolate from '@cycle/isolate';
import './style.scss';
import delay from 'xstream/extra/delay';

function formatOptions(item) {
  return div('.item', {
    attrs: {
      'data-value': item.value,
      'data-label': item.label
    }
  }, item.label);
}

function dropdownComponent({ DOM }, props = xs.of({})) {
  const dropdownClick$ = DOM.select('.dropdown').events('click')
    .mapTo(true)
    .startWith(false);

  const selectedValueClick$ = DOM.select('.item').events('click')
    .debug(event => {
      event.stopPropagation();
      event.preventDefault();
    });

  const bodyStopCondition$ = xs.merge(
    DOM.select('.item').events('click'),
    DOM.select('body').events('click').drop(1).compose(delay(100))
  );

  const bodyClick$ = DOM.select('body').events('click').drop(1)
    .mapTo(false)
    .endWhen(bodyStopCondition$)

  const closeDropDown$ = DOM.select('.dropdown').events('click')
    .mapTo(bodyClick$)
    .flatten();

  const dropdownStatus$ = xs.merge(
    dropdownClick$,
    selectedValueClick$.mapTo(false),
    closeDropDown$
  );

  const animating$ = dropdownStatus$.compose(delay(200)).startWith(false)

  const selectedValue$ = xs.merge(
    props.map(props => props.defaultValue || {}),
    selectedValueClick$.map(event=> event.target.dataset)
  ).startWith({})

  const sources$ = props
    .map(props => props.sources.map(formatOptions))
    .startWith([]);


  const component$ = xs.combine(dropdownStatus$, animating$, selectedValue$, sources$)
    .map(([isOpen, isAnimating, selected, sources]) => {
      return div('.ui.selection.dropdown', {
      class: {
        active: isOpen,
        visible: isOpen
      }
    }, [
      i('.dropdown.icon'),
      div('.text', {
        class: { default: !selected.label }
      }, selected.label || 'Gender'),
      div('.menu.transition.animating.slide.down',
        { class: {
          hidden: !isAnimating,
          visible: isOpen || isAnimating,
          in: isOpen,
          out: !isOpen
        } },
        sources
      )
    ])
  })

    return {
      DOM: component$,
      selectedValue$
    }
}

export default (sources, props) => isolate(dropdownComponent)(sources, props);
