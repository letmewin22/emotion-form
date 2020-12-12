"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Loader = void 0;
class Loader {
    constructor($form) {
        this.$form = $form;
    }
    showLoader() {
        this.$form.classList.add('loading');
    }
    hideLoader() {
        this.$form.classList.remove('loading');
    }
}
exports.Loader = Loader;
//# sourceMappingURL=Loader.js.map