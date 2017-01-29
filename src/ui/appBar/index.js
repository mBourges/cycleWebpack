import xs from 'xstream';
import { div, a, nav, ul, li } from '@cycle/dom';
import './style.scss';

import icon from '../icon';

function appBar({ DOM, props }) {
  const menuIcon$ = icon({
    DOM: DOM,
    props: xs.of({icon: 'menu'})
  });
  const appTitle = props.map(props => props.title);

  const component$ = xs.combine(
    appTitle,
    menuIcon$.DOM
  ).map(([title, menuDOM]) => div('.appbar', [
    div('.appbar__menu', [menuDOM]),
    div('.appbar__title', title),
    nav('.appbar__nav', [
      ul([
        li([
          a('.navLink', { props: { href: '/' } }, 'HOME')
        ]),
        li([
          a('.navLink', { props: { href: '/student' } }, 'STUDENTS')
        ])
      ])
    ])
  ]));

  menuIcon$.events.click$.addListener({
    next: i => console.log(i),
    error: err => console.error(err),
    complete: () => console.log('completed'),
  });

  return {
    DOM: component$
  };
}

export default appBar;



/*  import React from 'react';
import classNames from 'classnames';
import Icon from '../icon';
import './style.scss';

class Appbar extends React.Component {
  state = { menuIsOpen: false };

  openMenu = () => this.setState({ menuIsOpened: true });
  closeMenu = () => this.setState({ menuIsOpened: false });

  render() {
    const { title, links, icons } = this.props;

    const menuLink = links
      ? links.map((link, index) => (<li key={ index } onClick={ console.log.bind(this) }>{ link.value }</li>))
      : null;

    const iconActions = icons
      ? icons.map((icon, index) =>(<Icon
        key={ index }
        value={ icon.value }
        onClick={ icon.onClick }
      />))
      : null;

    const appbarNav = classNames('appbar__nav', {
      'is-open': this.state.menuIsOpened
    });

    return (<div className="appbar">
      <div className="appbar__menu">
        <Icon
          value="menu"
          onClick={ this.openMenu }
        />
      </div>
      <div className="appbar__title">{title}</div>
      { links && <nav className={ appbarNav }>
        <div className="nav__overlay" onClick={ this.closeMenu }></div>
        <ul>
          { menuLink }
        </ul>
      </nav> }
      { icons && <nav className="appbar__icons">
        { iconActions }
      </nav> }
    </div>);
  }
}

export default Appbar;*/
