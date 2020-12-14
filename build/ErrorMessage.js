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
exports.ErrorMessage = void 0;
const _Bind_1 = __importDefault(require("./decorators/@Bind"));
class ErrorMessage {
    constructor($form) {
        this.$form = $form;
        this.$error = $form.querySelector('[data-error]');
        this.$error.addEventListener('click', this.hide);
    }
    get computeHeight() {
        return this.$error.scrollHeight.toString();
    }
    show() {
        this.$error.style.setProperty('--h', this.computeHeight + 'px');
        this.$form.classList.add('error');
    }
    hide() {
        this.$form.classList.remove('error');
        this.$error.style.setProperty('--h', '0');
    }
    destroy() {
        this.$error.removeEventListener('click', this.hide);
    }
}
__decorate([
    _Bind_1.default,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ErrorMessage.prototype, "hide", null);
exports.ErrorMessage = ErrorMessage;
//# sourceMappingURL=ErrorMessage.js.map