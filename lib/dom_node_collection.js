class DOMNodeCollection {
  constructor(arr) {
    this.arr = arr;
  }

  html(str) {
    if (str !== undefined) {
      this.arr.forEach( (el) => {
        el.innerHTML = str;
      });
      return str;
    } else {
      return this.arr[0].innerHTML;
    }
  }

  empty() {
    this.html("");
  }

  append(el) {
    if (el instanceof Array) {
      const $elDOM = new DOMNodeCollection(el);
      $elDOM.arr.forEach( (innerNode) => {
        this.arr.forEach( (outerNode) => {
          outerNode.innerHTML += innerNode;
        });
      });
    }
    else {
      this.arr[0].innerHTML += el;
    }
  }

  attr() {
    return this.arr[0].attributes;
  }

  addClass(str) {
    this.arr[0].className = str;
  }

  removeClass() {
    this.arr[0].removeAttribute('class');
  }

  children() {
    const children = [];

    this.arr.forEach( (node) => {
      for (let i = 0; i < node.children.length; i++) {
        children.push(node.children.item(i));
      }
    });
    const result = new DOMNodeCollection(children);
    return result;
  }

  parent() {
    const parents = [];

    this.arr.forEach( node => {
      if (!parents.includes(node.parentElement)) {
        parents.push(node.parentElement);
      }
    });

    const result = new DOMNodeCollection(parents);
    return result;
  }

  find(selector) {
    const matches = [];

    this.arr.forEach( node => {
      let query = node.querySelectorAll(selector);
      if (!matches.includes(query))
      matches.push(query);
    });

    const result = new DOMNodeCollection(matches);
    return result;
  }

  remove() {
    this.empty();
    this.arr = [];
  }
}

module.exports = DOMNodeCollection;

// animals = ["<li>horses</li>", "<li>donkeys</li>"]
