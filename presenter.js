(() => {
  'use strict';

  class Presenter {
    constructor({ element }) {
      this.element = element;
    }

    render(data) {
      this.element.innerHTML = '';
      if (!Object.keys(data).length) {
        const wrapper = document.createElement('div');
        const value = document.createElement('span');
        value.className = 'presenter__item_empty';
        value.innerHTML = 'It is empty!';
        wrapper.className = 'presenter__item';
        wrapper.appendChild(value);
        this.element.appendChild(wrapper);
        return;
      }

      for (const item of Object.keys(data)) {
        const wrapper = document.createElement('div');
        const title = document.createElement('span');
        const value = document.createElement('span');
        title.className = 'presenter__item_title';
        title.innerHTML = item;
        value.className = 'presenter__item_value';
        value.innerHTML = data[item];
        wrapper.className = 'presenter__item';
        wrapper.appendChild(title);
        wrapper.appendChild(value);
        this.element.appendChild(wrapper);
      }
    }
  }

  window.Presenter = Presenter;
})();
