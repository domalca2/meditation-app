export function createLocalTimeString(millis) {
  const min = Math.floor(Math.floor(millis / 1000) / 60) || 0;
  const sec = Math.floor(millis / 1000) % 60 || 0;

  const minString = min.toLocaleString("en-US", { minimumIntegerDigits: 2 });
  const secString = sec.toLocaleString("en-US", { minimumIntegerDigits: 2 });

  return `${minString}:${secString}`;
}

export function createRoundedLocalTimeString(millis) {
  const min = Math.round(Math.floor(millis / 1000) / 60) || 0;

  return `${min}`;
}
