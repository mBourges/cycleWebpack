/* global Intl */

const dateOptions = {
  year: "numeric",
  month: "short",
  day: "numeric"
};

export function formatDate(date) {
  return new Intl.DateTimeFormat("ja-JP", dateOptions).format(new Date(date));
}
