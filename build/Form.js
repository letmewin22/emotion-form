"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Form = void 0;
const FormSend_1 = require("./FormSend");
const Input_1 = require("./Input");
class Form {
    constructor(formSelector, opts) {
        this.formSelector = formSelector;
        this.opts = opts;
        this.$form = document.querySelector(formSelector);
        this.$inputs = this.$form.querySelectorAll('[data-input]');
        this.formSend = new FormSend_1.FormSend(this.$form, this.opts);
        this.init();
    }
    init() {
        this.$inputs.forEach($el => new Input_1.Input($el));
    }
    addFocus(idx) {
        this.$inputs[idx].focus();
        this.$inputs[idx].classList.add('js-focus');
        document.body.classList.add('e-fixed');
    }
}
exports.Form = Form;
//# sourceMappingURL=Form.js.map