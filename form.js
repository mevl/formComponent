(() => {
  'use strict';

  class Form {
    constructor({ element }) {
      this.formElement = element;
      this.initEvents();
    }

    initEvents() {
      this.formElement.addEventListener('submit', this.onSubmit.bind(this));
      this.formElement.addEventListener('click', this.onClick.bind(this));
      this.formElement.addEventListener('keyup', this.onKeyUp.bind(this));
    }

    onKeyUp(event) {
      const element = event.target;
      if (element.classList.contains('form__input')) {
        this.setStatus(element, this.checkInputValue(element.value));
      }
    }

    onClick(event) {
      const element = event.target;
      if (element.classList.contains('js-reset')) {
        this.resetForm();
      } else if (element.classList.contains('js-show-password')) {
        const passElement = this.getElement('password');
        if (passElement.type === 'password') {
          passElement.type = 'text';
          element.dataset.showText = element.value;
          element.value = element.dataset.hideText;
        } else {
          passElement.type = 'password';
          element.value = element.dataset.showText;
        }
      }
    }

    onSubmit(event) {
      event.preventDefault();
      const data = this.collectData();

      if (!this.validate(data)) {
        return;
      }

      if (this.onSubmitHandler && this.onSubmitHandler instanceof Function) {
        this.onSubmitHandler(data);
      }
    }

    onSubmitHandler() {
    }

    setOnSubmitHandler(handler) {
      if (typeof handler !== 'function') {
          throw new Error('The function is requred');
      }
      this.onSubmitHandler = handler;
    }

    validate(data) {
      let isValid = true;
      for (const name of Object.keys(data)) {
        if (!this.checkInputValue(data[name])) {
          isValid = false;
          this.setStatus(this.getElement(name), false);
        }
      }
      return isValid;
    }

    checkInputValue(value) {
      return value && String(value).length >= 2;
    }

    setStatus(element, status) {
      if (status) {
        element.classList.remove('invalid');
      } else {
        element.classList.add('invalid');
      }
    }

    resetForm() {
      this.formElement.reset();
    }

    getElement(name) {
      return this.formElement.querySelector(`[name="${name}"]`);
    }

    collectData() {
      const inputs = this.formElement.querySelectorAll('input.form__input');
      const result = {};

      Array.prototype.forEach.call(inputs, (input) => {
        result[input.name] = input.value;
      });

      return result;
    }
  }

  window.Form = Form;
})();
