"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validation = void 0;
const libphonenumber_js_1 = require("libphonenumber-js");
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
            return this[method](this.$input.value, values && +values);
        });
        return !result.includes(false);
    }
    notEmpty(string) {
        if (string.trim().length > 0) {
            return true;
        }
        return false;
    }
    phone(string) {
        string = string.replace(/[A-z]|[А-я]|\s|[*!@#$%^&{}[\]~""/|=]/g, '');
        const phoneNumber = libphonenumber_js_1.parsePhoneNumberFromString(string);
        if (phoneNumber) {
            string = phoneNumber.formatInternational();
        }
        return true;
    }
    minlength(string, value) {
        if (string.trim().length < value) {
            return false;
        }
        return true;
    }
    email(string) {
        const regExp = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
        const isEmailValid = regExp.test(string.trim());
        if (!isEmailValid) {
            return false;
        }
        return true;
    }
    maxlength(string, value) {
        const inputLength = string.trim().length;
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