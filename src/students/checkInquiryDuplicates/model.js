export default function model({ submit$ }) {
  const isSearchSubmitted$ = submit$.mapTo(true).startWith(false);

  return {
    isSearchSubmitted$
  };
}
