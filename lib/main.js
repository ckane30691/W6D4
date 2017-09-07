const DOMNodeCollection = require('./dom_node_collection.js');

window.$l = function(selector) {
  if (selector instanceof HTMLElement) {
    const selectArr = Array.from(selector);
    const selectDNC = new DOMNodeCollection(selectArr);
    return selectDNC;
  }
  else {
    const select = document.querySelectorAll(selector);
    const selectArr = Array.from(select);
    const selectDNC = new DOMNodeCollection(selectArr);
    return selectDNC;
  }
};
