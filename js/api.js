function getData (fn) {
  fetch('https://25.javascript.pages.academy/kekstagram/data')
    .then((res) => res.json())
    .then((data) => fn(data));
}

export {getData};
