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
const Input_1 = require("./Input");
const Loader_1 = require("./Loader");
class FormSend {
    constructor($form, opts) {
        this.$form = $form;
        this.opts = opts;
        this.data = {};
        this.inputInstance = [];
        this.init();
        this.loader = new Loader_1.Loader($form);
    }
    init() {
        if (!this.opts || !this.opts.URL) {
            throw new Error('URL is must be defined');
        }
        this.$form.addEventListener('submit', this.submit);
    }
    success() {
        this.reset();
        this.inputInstance.forEach(inst => inst.destroy());
        this.inputInstance = [];
        this.opts.onSuccess && this.opts.onSuccess();
    }
    error() {
        this.opts.onSuccess && this.opts.onError();
    }
    requestSend() {
        return __awaiter(this, void 0, void 0, function* () {
            const formData = new FormData();
            Object.keys(this.data).map(el => {
                return formData.append(el, this.data[el]);
            });
            this.loader.showLoader();
            try {
                const res = yield fetch(this.opts.URL, {
                    method: 'POST',
                    body: formData
                });
                if (res.status >= 200 && res.status < 400) {
                    this.success();
                    return;
                }
                else {
                    alert('Error');
                    this.error();
                }
            }
            catch (e) {
                console.log(e);
            }
            finally {
                this.loader.hideLoader();
            }
        });
    }
    submit(e) {
        e.preventDefault();
        const inputs = [...this.$form.elements];
        const isValid = inputs.map(input => {
            if ((input.nodeName === 'INPUT' || input.nodeName === 'TEXTAREA') &&
                input.type !== 'submit') {
                this.data[input.name] = input.value;
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
        const inputs = [...this.$form.elements];
        inputs.forEach(input => {
            if (input.nodeName === 'INPUT' && input.type !== 'submit') {
                input.value = '';
                input.blur();
                input.classList.remove('js-focus');
            }
        });
        document.body.classList.remove('e-fixed');
    }
}
__decorate([
    _Bind_1.default,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", void 0)
], FormSend.prototype, "submit", null);
exports.FormSend = FormSend;
//# sourceMappingURL=FormSend.js.map