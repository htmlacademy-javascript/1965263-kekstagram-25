function getRandom (min, max) {
  if (max < 0 || min < 0) {
    return;
  }

  if (max < min) {[min, max]=[max, min];}
  return Math.round(min + (max - min) * Math.random());
}

const checkLine = (line, maxLength) => line.length <= maxLength;

getRandom(112, 12);
checkLine('Hello, world!', 100);
