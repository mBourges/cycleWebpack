import isolate from '@cycle/isolate';
import button from './button';

export const buttonComponent = sources => isolate(button)(sources);
export const navButtonComponent = button;
