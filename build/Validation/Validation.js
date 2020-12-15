"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validation = void 0;
const formatPhoneNumber_1 = require("./formatPhoneNumber");
class Validation {
    constructor($input, options) {
        this.$input = $input;
        this.options = options;
    }
    init() {
        const optionsValues = this.options.split(' ');
        const result = optionsValues.map(option => {
            const method = option.replace(/[\d()]/gm, '');
            const values = option.replace(/\D/gm, '');
            return this[method](values && +values);
        });
        return !result.includes(false);
    }
    notEmpty() {
        if (this.$input.value.trim().length > 0) {
            return true;
        }
        return false;
    }
    phone() {
        this.$input.value = this.$input.value.replace(/[A-z]|[А-я]|\s|[*!@#$%^&{}[\]~""/|=]/g, '');
        this.$input.value = formatPhoneNumber_1.formatPhoneNumber(this.$input.value);
        return true;
    }
    minlength(value) {
        if (this.$input.value.trim().length < value) {
            return false;
        }
        return true;
    }
    email() {
        const regExp = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
        const isEmailValid = regExp.test(this.$input.value.trim());
        if (!isEmailValid) {
            return false;
        }
        return true;
    }
    maxlength(value) {
        const inputLength = this.$input.value.trim().length;
        if (this.$input && this.$input.parentNode) {
            const lc = this.$input.parentNode.querySelector('[data-length]');
            const diff = value - inputLength;
            lc && (lc.innerHTML = diff.toString());
        }
        if (inputLength > value) {
            return false;
        }
        return true;
    }
}
exports.Validation = Validation;
//# sourceMappingURL=Validation.js.map