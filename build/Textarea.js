"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Textarea = void 0;
class Textarea {
    constructor($textarea) {
        this.$textarea = $textarea;
        this.init();
    }
    observe(element, event, handler) {
        element.addEventListener(event, handler, false);
    }
    unsubscribe(element, event, handler) {
        element.removeEventListener(event, handler, false);
    }
    init() {
        this.resize = this.resize.bind(this);
        this.delayedResize = this.delayedResize.bind(this);
        this.observe(this.$textarea, 'change', this.resize);
        this.observe(this.$textarea, 'cut', this.delayedResize);
        this.observe(this.$textarea, 'paste', this.delayedResize);
        this.observe(this.$textarea, 'drop', this.delayedResize);
        this.observe(this.$textarea, 'keydown', this.delayedResize);
        this.resize();
    }
    resize() {
        this.$textarea.style.height = 'auto';
        this.$textarea.style.height = this.$textarea.scrollHeight + 'px';
    }
    delayedResize() {
        window.setTimeout(this.resize, 0);
    }
    destroy() {
        this.unsubscribe(this.$textarea, 'change', this.resize);
        this.unsubscribe(this.$textarea, 'cut', this.delayedResize);
        this.unsubscribe(this.$textarea, 'paste', this.delayedResize);
        this.unsubscribe(this.$textarea, 'drop', this.delayedResize);
        this.unsubscribe(this.$textarea, 'keydown', this.delayedResize);
    }
}
exports.Textarea = Textarea;
//# sourceMappingURL=Textarea.js.map