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
exports.Textarea = void 0;
const _Bind_1 = __importDefault(require("./decorators/@Bind"));
class Textarea {
    constructor($textarea) {
        this.$textarea = $textarea;
        this.init();
    }
    observe(element, event, handler) {
        element.addEventListener(event, handler, false);
    }
    init() {
        const delayedResize = () => {
            window.setTimeout(this.resize, 0);
        };
        this.observe(this.$textarea, 'change', this.resize);
        this.observe(this.$textarea, 'cut', delayedResize);
        this.observe(this.$textarea, 'paste', delayedResize);
        this.observe(this.$textarea, 'drop', delayedResize);
        this.observe(this.$textarea, 'keydown', delayedResize);
        this.$textarea.focus();
        this.resize();
    }
    resize() {
        this.$textarea.style.height = 'auto';
        this.$textarea.style.height = this.$textarea.scrollHeight + 'px';
    }
}
__decorate([
    _Bind_1.default,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Textarea.prototype, "resize", null);
exports.Textarea = Textarea;
//# sourceMappingURL=Textarea.js.map