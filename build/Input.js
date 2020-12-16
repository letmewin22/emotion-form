"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Input = void 0;
const Textarea_1 = require("./Textarea");
const Validation_1 = require("./Validation/Validation");
const formData_1 = require("./formData");
class Input {
    constructor($input) {
        this.$input = $input;
    }
    init() {
        this.bounds();
        this.$input.addEventListener('focus', this.focus);
        this.$input.addEventListener('blur', this.blur);
        this.$input.addEventListener('input', this.change);
        if (this.$input.tagName === 'TEXTAREA') {
            this.textarea = new Textarea_1.Textarea(this.$input);
        }
    }
    bounds() {
        const methods = ['change', 'focus', 'blur'];
        methods.forEach(fn => (this[fn] = this[fn].bind(this)));
    }
    change() {
        this.validate();
        formData_1.data[this.$input.name].value = this.$input.value;
    }
    focus() {
        this.$input.focus();
        this.$input.classList.add('js-focus');
        document.body.classList.add('e-fixed');
    }
    blur() {
        if (!this.$input.value.trim().length) {
            this.$input.blur();
            this.$input.classList.remove('js-focus');
        }
        this.$input.classList.remove('error');
        document.body.classList.remove('e-fixed');
    }
    validate() {
        const validation = this.$input.dataset.validation;
        if (validation) {
            const v = new Validation_1.Validation(this.$input, validation);
            if (!v.init()) {
                this.$input.classList.add('error');
                formData_1.data[this.$input.name].validation = false;
                return false;
            }
            this.$input.classList.remove('error');
            formData_1.data[this.$input.name].validation = true;
            return true;
        }
        return true;
    }
    destroy() {
        this.$input.removeEventListener('focus', this.focus);
        this.$input.removeEventListener('blur', this.blur);
        this.$input.removeEventListener('input', this.change);
        if (this.$input.tagName === 'TEXTAREA') {
            this.textarea && this.textarea.destroy();
        }
    }
}
exports.Input = Input;
//# sourceMappingURL=Input.js.map