"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendData = void 0;
const Loader_1 = require("./Loader");
class SendData {
    constructor(opts, $form) {
        this.opts = opts;
        this.$form = $form;
        this.loader = new Loader_1.Loader($form);
    }
    fetchData(url, formData) {
        return __awaiter(this, void 0, void 0, function* () {
            this.loader.showLoader();
            try {
                return yield fetch(url, {
                    method: 'POST',
                    body: formData
                });
            }
            catch (e) {
                console.log(e);
            }
            finally {
                this.loader.hideLoader();
            }
        });
    }
    stringUrl(url, formData) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.fetchData(url, formData);
            if (res.status >= 200 && res.status < 400) {
                this.opts.success();
                return;
            }
            else {
                this.opts.error();
            }
        });
    }
    arrayUrls(urls, formData) {
        return __awaiter(this, void 0, void 0, function* () {
            const p = urls.map(url => {
                return this.fetchData(url, formData);
            });
            const res = yield Promise.all(p);
            if (res.filter(r => r.status >= 200 && r.status < 400).length) {
                this.opts.success();
                return;
            }
            else {
                this.opts.error();
            }
        });
    }
}
exports.SendData = SendData;
//# sourceMappingURL=SendData.js.map