function createElement(type, props, ...children) {
    return {
      type,
      props: {
        ...props,
        children: children.map(child =>
          typeof child === 'object' ? child : createTextElement(child)
        ),
      },
    };
}
  
function createTextElement(text) {
    return {
      type: 'TEXT_ELEMENT',
      props: {
        nodeValue: text,
        children: [],
      },
    };
}

// ReactDOM
function render(element, container) {
    const dom =
      element.type === 'TEXT_ELEMENT'
        ? document.createTextNode('')
        : document.createElement(element.type);
  
    const isProperty = key => key !== 'children';
    Object.keys(element.props)
      .filter(isProperty)
      .forEach(name => {
        dom[name] = element.props[name];
      });
  
    element.props.children.forEach(child => render(child, dom));
  
    container.appendChild(dom);
}
  
// React.CreateElement
const element = createElement(
    'div',
    { id: 'main-container' },
    createElement('h1', null, 'Hello, ReactDOM from scratch!'),
    createElement('p', null, 'This is a React-like implementation.')
);
  
const container = document.getElementById('root');
render(element, container);