"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Bind(_, _2, descriptor) {
    const original = descriptor.value;
    return {
        configurable: true,
        enumerable: false,
        get() {
            return original.bind(this);
        }
    };
}
exports.default = Bind;
//# sourceMappingURL=@Bind.js.map