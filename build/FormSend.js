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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormSend = void 0;
const _Bind_1 = __importDefault(require("./decorators/@Bind"));
const ErrorMessage_1 = require("./ErrorMessage");
const formData_1 = require("./formData");
const Input_1 = require("./Input");
const SendData_1 = require("./SendData");
class FormSend {
    constructor($form, opts) {
        this.$form = $form;
        this.opts = opts;
        this.inputInstance = [];
        this.init();
    }
    init() {
        if (!this.opts || !this.opts.URL) {
            throw new Error('URL is must be defined');
        }
        this.em = new ErrorMessage_1.ErrorMessage(this.$form);
        this.sd = new SendData_1.SendData({
            error: this.error,
            success: this.success
        }, this.$form);
        this.$form.addEventListener('submit', this.submit);
    }
    success() {
        this.reset();
        this.inputInstance.forEach(inst => inst.destroy());
        this.inputInstance = [];
        this.opts.onSuccess && this.opts.onSuccess();
    }
    error() {
        this.em.show();
        this.opts.onSuccess && this.opts.onError();
    }
    requestSend() {
        return __awaiter(this, void 0, void 0, function* () {
            const formData = new FormData();
            Object.keys(formData_1.data).map(el => {
                return formData.append(el, formData_1.data[el]);
            });
            if (typeof this.opts.URL === 'string') {
                yield this.sd.stringUrl(this.opts.URL, formData);
            }
            if (Array.isArray(this.opts.URL)) {
                yield this.sd.arrayUrls(this.opts.URL, formData);
            }
        });
    }
    isInput(input) {
        return input.dataset.input !== undefined;
    }
    submit(e) {
        e.preventDefault();
        const inputs = [...this.$form.elements];
        const isValid = inputs.map(input => {
            if (this.isInput(input)) {
                const inputClass = new Input_1.Input(input);
                this.inputInstance.push(inputClass);
                return inputClass.validate(input);
            }
        });
        if (!isValid.includes(false)) {
            this.requestSend();
        }
        else {
            this.focusFirstFailedInput(isValid);
        }
    }
    focusFirstFailedInput(arr) {
        for (let i = 0; i < arr.length; i++) {
            const el = arr[i];
            if (el === false) {
                this.inputInstance[i].focus();
                break;
            }
        }
    }
    reset() {
        Object.keys(formData_1.data).forEach(el => {
            this.$form[el].value = '';
            this.$form[el].blur();
            this.$form[el].classList.remove('js-focus');
            delete formData_1.data[el];
        });
        document.body.classList.remove('e-fixed');
    }
}
__decorate([
    _Bind_1.default,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FormSend.prototype, "success", null);
__decorate([
    _Bind_1.default,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FormSend.prototype, "error", null);
__decorate([
    _Bind_1.default,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", void 0)
], FormSend.prototype, "submit", null);
exports.FormSend = FormSend;
//# sourceMappingURL=FormSend.js.map