function getRandom (min, max) {
  if (max < 0 || min < 0) {
    return;
  }

  return (max > min) ? Math.round(min + (max - min) * Math.random())
    : Math.round(max + (min - max) * Math.random());
}

const checkLine = (line, maxLength) => (line.length <= maxLength);

getRandom(12, 12);
checkLine('Hello, world!', 100);
