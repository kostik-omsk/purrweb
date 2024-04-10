export default function createElem(elem, className) {
  const newElem = document.createElement(elem);
  newElem.classList.add(className);
  return newElem;
}
