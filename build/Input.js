"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Input = void 0;
const _Bind_1 = __importDefault(require("./decorators/@Bind"));
const Textarea_1 = require("./Textarea");
const Validation_1 = require("./Validation/Validation");
const formData_1 = require("./formData");
class Input {
    constructor($input) {
        this.$input = $input;
        this.init();
    }
    init() {
        this.$input.addEventListener('focus', this.focus);
        this.$input.addEventListener('blur', this.blur);
        this.$input.addEventListener('input', this.change);
        if (this.$input.tagName === 'TEXTAREA') {
            new Textarea_1.Textarea(this.$input);
        }
    }
    change() {
        this.validate(this.$input);
        formData_1.data[this.$input.name] = this.$input.value;
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
    validate($el) {
        const validation = $el.dataset.validation;
        if (validation) {
            const v = new Validation_1.Validation($el, validation);
            if (!v.init()) {
                $el.classList.add('error');
                return false;
            }
            $el.classList.remove('error');
            return true;
        }
    }
    destroy() {
        this.$input.removeEventListener('focus', this.focus);
        this.$input.removeEventListener('blur', this.blur);
        this.$input.removeEventListener('input', this.change);
    }
}
__decorate([
    _Bind_1.default,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Input.prototype, "change", null);
__decorate([
    _Bind_1.default,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Input.prototype, "focus", null);
__decorate([
    _Bind_1.default,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Input.prototype, "blur", null);
exports.Input = Input;
//# sourceMappingURL=Input.js.map