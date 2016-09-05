var moment= require('moment');

module.exports = {
  timeago: timeago,
  currentYear: currentYear
}

function timeago(timestamp) {
  return moment(timestamp).startOf('minute').fromNow();
}

function currentYear() {
  return new Date().getFullYear();
}
