"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseCtr {
    constructor() { }
    sendResponse(r, b, d) {
        if (typeof d === "number")
            b.statusCode = d;
        if (typeof d === "string")
            b.message = d;
        if (typeof d === "object" && d)
            b.data = d;
        else
            b.data = {};
        r.status(b.httpCode).json(b);
    }
    errorResponse(r, err) {
        r.status(400).json({ message: err.message });
    }
}
exports.default = BaseCtr;
//# sourceMappingURL=base.ctr.js.map