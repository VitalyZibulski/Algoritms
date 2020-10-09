console.log("initial");

const messages = {
  year: {
    singular: "year",
    plural: "years",
    denominator: 365,
    inSeconds: 31536000,
  },
  day: {
    singular: "day",
    plural: "days",
    denominator: 24,
    inSeconds: 86400,
  },
  hour: {
    singular: "hour",
    plural: "hours",
    denominator: 60,
    inSeconds: 3600,
  },
  minute: {
    singular: "minute",
    plural: "minutes",
    denominator: 60,
    inSeconds: 60,
  },
  second: {
    singular: "second",
    plural: "seconds",
    denominator: 60,
    inSeconds: 1,
  },
};

function formatDuration(_seconds) {
  if (_seconds === 0) return "now";
  if (_seconds === 1) return `1 ${messages.second.singular}`;
  if (_seconds < 60) return `${_seconds} ${messages.second.plural}`;

  const result = [];

  let year = getTimeFromSeconds(_seconds, "year");
  let day = getTimeFromSeconds(year.remaining, "day");
  let hours = getTimeFromSeconds(day.remaining, "hour");
  let minutes = getTimeFromSeconds(hours.remaining, "minute");
  let seconds = minutes.remaining;

  if (year.quantity > 0) {
    result.push(format(year.quantity, "year"));
  }

  if (day.quantity > 0) {
    result.push(format(day.quantity, "day"));
  }

  if (hours.quantity > 0) {
    result.push(format(hours.quantity, "hour"));
  }

  if (minutes.quantity > 0) {
    result.push(format(minutes.quantity, "minute"));
  }

  if (seconds > 0) {
    result.push(format(seconds, "second"));
  }

  return result.length > 2
    ? result.slice(0, result.length - 1).join(", ") +
        " and " +
        result[result.length - 1]
    : result.join(" and ");
}

function getTimeFromSeconds(seconds, unit) {
  const quantity = seconds / messages[unit].inSeconds;
  const remaining = remainings(seconds, quantity, unit);
  return { quantity: parseInt(quantity), remaining };
}

function remainings(seconds, value, unit) {
  return isFloat(value)
    ? seconds - parseInt(value, 10) * messages[unit].inSeconds
    : 0;
}

function format(value, unit) {
  return `${parseInt(value, 10)} ${pluralize(parseInt(value, 10), unit)}`;
}

function pluralize(value, unit) {
  if (value === 1) return messages[unit].singular;
  return messages[unit].plural;
}

function isFloat(value) {
  return value % 1 !== 0;
}

console.log(formatDuration(100000));
