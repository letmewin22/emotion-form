"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Form = void 0;
const formData_1 = require("./formData");
const FormSend_1 = require("./FormSend");
const Input_1 = require("./Input");
class Form {
    constructor(formSelector, opts) {
        this.formSelector = formSelector;
        this.opts = opts;
        this.inputsInstances = [];
        this.$form = document.querySelector(formSelector);
        if (!this.$form) {
            return;
        }
        this.$inputs = this.$form.querySelectorAll('[data-input]');
        this.init();
    }
    init() {
        this.$inputs.forEach($el => {
            formData_1.data[$el.name] = {
                value: '',
                validation: $el.dataset.validation ? false : true,
            };
            const inst = new Input_1.Input($el);
            inst.init();
            this.inputsInstances.push(inst);
        });
        this.formSend = new FormSend_1.FormSend(this.$form, this.opts);
    }
    addFocus(idx) {
        if (!this.$form) {
            return;
        }
        this.$inputs[idx].focus();
        this.$inputs[idx].classList.add('js-focus');
        document.body.classList.add('e-fixed');
    }
    destroy() {
        this.formSend.destroy();
        this.inputsInstances.forEach(inst => inst.destroy());
        document.body.classList.remove('e-fixed');
    }
}
exports.Form = Form;
//# sourceMappingURL=Form.js.map